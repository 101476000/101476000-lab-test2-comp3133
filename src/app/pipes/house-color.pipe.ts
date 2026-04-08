import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseColor',
  standalone: true
})
export class HouseColorPipe implements PipeTransform {
  transform(house: string): string {
    const colors: { [key: string]: string } = {
      'Gryffindor': '#740001',
      'Slytherin': '#1A472A',
      'Hufflepuff': '#F0C75E',
      'Ravenclaw': '#0C1A40'
    };
    return colors[house] || '#555555';
  }
}

@Pipe({
  name: 'houseBadgeClass',
  standalone: true
})
export class HouseBadgePipe implements PipeTransform {
  transform(house: string): string {
    if (!house) return 'badge badge-staff';
    return `badge badge-${house.toLowerCase()}`;
  }
}

@Pipe({
  name: 'unknownValue',
  standalone: true
})
export class UnknownValuePipe implements PipeTransform {
  transform(value: string | undefined | null, fallback: string = 'Unknown'): string {
    return value && value.trim() ? value : fallback;
  }
}

@Pipe({
  name: 'spellTypeClass',
  standalone: true
})
export class SpellTypePipe implements PipeTransform {
  transform(spellName: string): string {
    const name = spellName.toLowerCase();
    if (name.includes('curse') || name.includes('cruci') || name.includes('avada') || name.includes('mortem')) {
      return 'spell-curse';
    }
    if (name.includes('jinx') || name.includes('rictus') || name.includes('locomotor')) {
      return 'spell-jinx';
    }
    if (name.includes('hex') || name.includes('bat') || name.includes('slug')) {
      return 'spell-hex';
    }
    if (name.includes('charm') || name.includes('expecto') || name.includes('lumos') || name.includes('wingard')) {
      return 'spell-charm';
    }
    if (name.includes('transfig') || name.includes('transform') || name.includes('alohom')) {
      return 'spell-transfiguration';
    }
    return 'spell-other';
  }
  }
