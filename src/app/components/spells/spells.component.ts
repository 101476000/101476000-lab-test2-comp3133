import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Spell } from '../../models/harry-potter.models';
import { SpellTypePipe } from '../../pipes/house-color.pipe';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpellTypePipe],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.css'
})
export class SpellsComponent implements OnInit {
  searchForm: FormGroup;

  allSpells = signal<Spell[]>([]);
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = 15;

  filteredSpells = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.allSpells();
    return this.allSpells().filter(s => 
      s.name.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query)
    );
  });

  paginatedSpells = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredSpells().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredSpells().length / this.pageSize));
  totalCount = computed(() => this.filteredSpells().length);

  stats = computed(() => {
    const spells = this.allSpells();
    return {
      total: spells.length,
      curses: spells.filter(s => s.name.toLowerCase().includes('curse')).length,
      charms: spells.filter(s => s.name.toLowerCase().includes('charm')).length,
    };
  });

  constructor(
    private harryPotterService: HarryPotterService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({ searchInput: [''] });
  }

  ngOnInit(): void {
    this.loadSpells();
    this.searchForm.get('searchInput')?.valueChanges.subscribe(value => {
      this.searchQuery.set(value || '');
      this.currentPage.set(1);
    });
  }

  loadSpells(): void {
    this.harryPotterService.getSpells().subscribe(spells => {
      this.allSpells.set(spells);
    });
  }

  clearSearch(): void {
    this.searchForm.reset({ searchInput: '' });
    this.searchQuery.set('');
    this.currentPage.set(1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  get pages(): number[] {
    return Array.from({length: Math.min(this.totalPages(), 10)}, (_, i) => i + 1);
  }

  get loading() { return this.harryPotterService.loading; }
  get error() { return this.harryPotterService.error; }
}
