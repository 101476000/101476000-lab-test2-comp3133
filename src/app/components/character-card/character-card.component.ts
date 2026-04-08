import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/harry-potter.models';
import { HouseBadgePipe, UnknownValuePipe } from '../../pipes/house-color.pipe';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, HouseBadgePipe, UnknownValuePipe],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() isSelected: boolean = false;
  @Output() clicked = new EventEmitter<Character>();

  onCardClick(): void {
    this.clicked.emit(this.character);
  }
}
