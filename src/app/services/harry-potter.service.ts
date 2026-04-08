import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Character, Spell, House } from '../models/harry-potter.models';

@Injectable({
  providedIn: 'root'
})
export class HarryPotterService {
  private readonly baseUrl = 'https://hp-api.onrender.com/api';
  private readonly potterDbUrl = 'https://api.potterdb.com/v1';

  // Signals for reactive state management
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  characters = signal<Character[]>([]);
  spells = signal<Spell[]>([]);

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<Character[]>(`${this.baseUrl}/characters`).pipe(
      tap(data => {
        this.characters.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to load characters. Please try again.');
        this.loading.set(false);
        return of([]);
      })
    );
  }

  getCharactersByHouse(house: string): Observable<Character[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<Character[]>(`${this.baseUrl}/characters/house/${house}`).pipe(
      tap(data => {
        this.characters.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to load characters for this house.');
        this.loading.set(false);
        return of([]);
      })
    );
  }

  getStudents(): Observable<Character[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<Character[]>(`${this.baseUrl}/characters/students`).pipe(
      tap(data => {
        this.characters.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to load students.');
        this.loading.set(false);
        return of([]);
      })
    );
  }

  getStaff(): Observable<Character[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<Character[]>(`${this.baseUrl}/characters/staff`).pipe(
      tap(data => {
        this.characters.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to load staff.');
        this.loading.set(false);
        return of([]);
      })
    );
  }

  getSpells(): Observable<Spell[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<Spell[]>(`${this.baseUrl}/spells`).pipe(
      tap(data => {
        this.spells.set(data);
        this.loading.set(false);
      }),
      catchError(err => {
        this.error.set('Failed to load spells.');
        this.loading.set(false);
        return of([]);
      })
    );
  }
}
