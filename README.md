# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Run the Application : 
   Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How does it work : 
## Home : 
    The User will comme on this page when the application starts (this is the route by default).
    This page :
        (1) Will present the context of the application.
        (2) Will contain a graph (“bar” or “pie” type).

    This graph will allow the visualization of the number of medals for each country, all
    years combined. To be able to present this graph, displaying the home page
    should automatically trigger the recovery of the necessary data.

    By clicking on one of the countries, the user will be redirected to a “detail” page about
    this country.


## Details : 
    When displayed, this page should automatically retrieve its own data
    to the country selected by the user.

    This page should then display the data relating to this country:
        - number of participations in the Olympic Games;
        - total number of medals obtained;
        - total number of athletes presented at the Olympic Games.

    Finally, a new graph (of “line” or “bar” type) should allow the user to
    to view on this page the number of medals obtained by the country during
    each edition of the Olympic Games.

    A “return” button will return to the home page from this page.