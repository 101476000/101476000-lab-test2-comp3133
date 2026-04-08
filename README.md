# Harry Potter Encyclopedia - Angular HTTP Client Application

## COMP3133 Lab Test 2 | Student ID: 101476000

## App Description

A Harry Potter-themed Angular 18 application that consumes the public HP API (hp-api.onrender.com) using Angular HttpClient. The app allows users to browse characters and spells from the Harry Potter universe with search, filter, and pagination features.

## Features Implemented

- HttpClientModule for API data fetching from https://hp-api.onrender.com/api
- ReactiveFormsModule with FormBuilder for search and filter forms
- Two main components: Characters and Character Card components, plus a Spells component
- Search feature using reactive form with real-time filtering
- Filter feature with house-based and role-based filtering (students, staff, wizards)
- TypeScript interfaces and models in src/app/models/harry-potter.models.ts
- Service class (HarryPotterService) with full API integration and error handling
- Custom pipes: HouseColorPipe, HouseBadgePipe, UnknownValuePipe, SpellTypePipe
- Angular Signals for state management (signal, computed)
- Angular 18 template control flow: @for, @if, @switch, @empty
- Lazy-loaded routes using loadComponent
- Pagination for both characters and spells
- Harry Potter themed dark CSS styling
- Responsive design

## Screenshots

Screenshots of the running application are included in the /screenshots folder.

### Characters Page
Displays all Harry Potter characters with images, house badges, and status indicators. Users can search by name, house, or actor, and filter by house or role (student/staff). Clicking a character shows their detailed information.

### Spells Page
Displays all Harry Potter spells with descriptions. Includes search functionality and color-coded spell types. Shows statistics (total spells, curses, charms count).

## Instructions to Run the Project

1. Clone the repository:
   git clone https://github.com/101476000/101476000-lab-test2-comp3133.git
   cd 101476000-lab-test2-comp3133

2. Install dependencies:
   npm install

3. Run the development server:
   ng serve

4. Open browser at:
   http://localhost:4200

5. Build for production:
   ng build

## Live Demo

Deployed on Vercel: https://101476000-lab-test2-comp3133.vercel.app

## API Used

Primary API: https://hp-api.onrender.com/api
- /characters - All characters
- /characters/students - Hogwarts students only
- /characters/staff - Hogwarts staff only
- /characters/house/{house} - Characters by house
- /spells - All spells

## Technologies

- Angular 18 (standalone components)
- TypeScript 5.4
- RxJS 7.8
- Angular HttpClient
- Angular ReactiveFormsModule
- Angular Router with lazy loading
- CSS custom properties for theming

