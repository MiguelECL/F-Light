# F-Light

## Overview

F-Light is a multi-container application that tracks useful flight information, leveraging the [Amadeus](https://developers.amadeus.com/) API, with this application you can track flight information such as flight offers, their pricing (including a detailed price breakdown), and some other useful data.

## Running the Application

### Prerequisites

- In order to be able to run the program, you must first install [Docker Desktop](https://www.docker.com/), software that allows the building and deployment of containerized applications.

### Cloning Repository

To run the application, you must first clone the repository to your local machine in order to run the commands in the next section.

### Modifying Root .env File

In order to get the app to make API calls, you must provide it with 

### Commands

#### Change Directory

After you have installed Docker, in your terminal, change directory to the F-Light Root folder.

`cd F-Light`

#### Run Docker Compose

The project makes use of Docker Compose to build and run both the backend and the frontend of the application, which are run in separate containers as a single multi-container application. To do so, run the following command.

`docker compose up`

This process will take some minutes as Docker has to first build the appropriate images for each service from the Dockerfiles inside each respective service.

#### Open up the browser

Open up your browser of choice and go to `localhost:8000` to start using the application.
