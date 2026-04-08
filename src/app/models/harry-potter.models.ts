export interface Character {
  id: string;
  name: string;
  alternateNames: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alive: boolean;
  image: string;
}

export interface Wand {
  wood: string;
  core: string;
  length: number;
}

export interface Spell {
  id: string;
  name: string;
  description: string;
}

export interface House {
  id: string;
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
  heads: HouseHead[];
  traits: HouseTrait[];
}

export interface HouseHead {
  id: string;
  firstName: string;
  lastName: string;
}

export interface HouseTrait {
  id: string;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
