# F-Light

F-Light is a multi-container application that tracks useful flight information, leveraging the [Amadeus](https://developers.amadeus.com/) API, with this application you can track flight information such as flight offers, their pricing (including a detailed price breakdown), and some other useful data.

## Running the Application

### Prerequisites

- In order to be able to run the program, you must first install [Docker Desktop](https://www.docker.com/), software that allows the building and deployment of containerized applications.

However, if you decide you want to run each of the programs without the use of containers, you will need the following:

- Java 17 or higher `java --version`
- Gradle 8.10.2 or higher `gradle -v`

### Cloning Repository

To run the application, you must first clone the repository to your local machine in order to run the commands in the next section.

## Running With Docker

### Modify Root .env File

In order to get the app to make API calls, you must provide it with the appropriate environment variables, which is where you come in... 
Open the `.env` file that is located in the root directory. And Replace the `${YOUR_API_KEY}`and `${YOUR_API_SECRET}`

### Change Directory

After you have installed Docker, in your terminal, change directory to the F-Light Root folder.

`cd F-Light`

### Run Docker Compose

The project makes use of Docker Compose to build and run both the backend and the frontend of the application, which are run in separate containers as a single multi-container application. To do so, run the following command.
`docker compose build`
`docker compose config` This will make sure that docker reads in the .env file that you provided.
`docker compose --env-file .env up` To provide docker compose with the .env file.

This process will take some minutes as Docker has to first build the appropriate images for each service from the Dockerfiles inside each respective service.

### Open up the browser

Open up your browser of choice and go to `localhost:8000` to start using the application.

## Building & Running Without Docker

If you wish to run each of the services separately without the use of containerization software like Docker, follow the following steps:

### Backend

#### Export Variables in /backend/.env

Go to the backend directory and change the `${AMADEUS_API_KEY}` and `${AMADEUS_API_SECRET}` with your credentials, then export each of the variables, alternatively, using an IDE like intelliJ IDEA, you can pass in your variables for the bootrun configuration.

#### Build 

run `gradle build`

#### Running

run `gradle bootRun`

### Frontend

To run the frontend cd into the frontend directory

`cd frontend`

Then run `npm install` to install all needed modules

`npm run dev` to run the dev environment.

