# Dragonball2026Angular

https://web.dragonball-api.com/documentation?ref=freepublicapis.com
https://dragonball-api.com/api-docs

ng new dragonball_2026_angular
ng g component components/characters-kanban
ng g component components/characters-kanban-item
ng g component components/characters-search-form
ng g service services/characters
ng g interface interfaces/character


**app.config**

    provideRouter(routes,  withHashLocation(),  withComponentInputBinding()),
    provideHttpClient(),
