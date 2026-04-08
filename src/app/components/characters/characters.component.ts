import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HarryPotterService } from '../../services/harry-potter.service';
import { Character } from '../../models/harry-potter.models';
import { HouseBadgePipe, UnknownValuePipe } from '../../pipes/house-color.pipe';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HouseBadgePipe, UnknownValuePipe, CharacterCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {
  searchForm: FormGroup;
  
  // Signals
  allCharacters = signal<Character[]>([]);
  selectedCharacter = signal<Character | null>(null);
  filterType = signal<string>('all');
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = signal<number>(12);

  // Computed signals
  filteredCharacters = computed(() => {
    let chars = this.allCharacters();
    const query = this.searchQuery().toLowerCase();
    const filter = this.filterType();

    if (query) {
      chars = chars.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.house.toLowerCase().includes(query) ||
        c.actor.toLowerCase().includes(query)
      );
    }

    switch (filter) {
      case 'student':
        chars = chars.filter(c => c.hogwartsStudent);
        break;
      case 'staff':
        chars = chars.filter(c => c.hogwartsStaff);
        break;
      case 'wizard':
        chars = chars.filter(c => c.wizard);
        break;
      case 'alive':
        chars = chars.filter(c => c.alive);
        break;
      case 'gryffindor':
        chars = chars.filter(c => c.house === 'Gryffindor');
        break;
      case 'slytherin':
        chars = chars.filter(c => c.house === 'Slytherin');
        break;
      case 'hufflepuff':
        chars = chars.filter(c => c.house === 'Hufflepuff');
        break;
      case 'ravenclaw':
        chars = chars.filter(c => c.house === 'Ravenclaw');
        break;
    }

    return chars;
  });

  paginatedCharacters = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredCharacters().slice(start, start + this.pageSize());
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredCharacters().length / this.pageSize());
  });

  totalCount = computed(() => this.filteredCharacters().length);

  constructor(
    private harryPotterService: HarryPotterService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchInput: [''],
      filterSelect: ['all']
    });
  }

  ngOnInit(): void {
    this.loadCharacters();

    this.searchForm.get('searchInput')?.valueChanges.subscribe(value => {
      this.searchQuery.set(value || '');
      this.currentPage.set(1);
    });

    this.searchForm.get('filterSelect')?.valueChanges.subscribe(value => {
      this.filterType.set(value || 'all');
      this.currentPage.set(1);
    });
  }

  loadCharacters(): void {
    this.harryPotterService.getCharacters().subscribe(chars => {
      this.allCharacters.set(chars);
    });
  }

  selectCharacter(character: Character): void {
    this.selectedCharacter.set(
      this.selectedCharacter()?.id === character.id ? null : character
    );
  }

  clearSearch(): void {
    this.searchForm.reset({ searchInput: '', filterSelect: 'all' });
    this.searchQuery.set('');
    this.filterType.set('all');
    this.currentPage.set(1);
  }

  changePage(page: number): void {
    this.currentPage.set(page);
    this.selectedCharacter.set(null);
  }

  get pages(): number[] {
    return Array.from({length: this.totalPages()}, (_, i) => i + 1);
  }

  get loading() { return this.harryPotterService.loading; }
  get error() { return this.harryPotterService.error; }
        }
