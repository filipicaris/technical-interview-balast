# Technical Interview Exercise: Mining and Structuring Drug Indications from Labels

## Run application

First build the docker image for the project with `docker compose build` and than run the environment with `docker compose up`.

The environment consists in the application and a containerized postgresql database.

After running a swagger will be available on `http://localhost:3000/swagger`

## Decisions

- The application uses a Basic Authentication system.
- The password is not saved as plain text on the DB. It uses a hash created when you create a user.
- The only endpoint available without authentication needed is the one to create the user.
- The application loads a dataset of ICD-10 and uses fuse to match the codes with the data provided by DailyMed.

## Structure

- Tests are within each folder, next to the file that will be tested.
- The file structure is modularized, therefore, it is easy to find which domain needs any update.
- Each module have their assets, as controllers, services or other structures.
