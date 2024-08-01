# Smart Dustbin System

Welcome to the Smart Dustbin System project! This project aims to create a smart waste management system using embedded C for the Arduino, a UI built with Next.js, and a map integration to visualize the dustbin locations.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Usage](#setup-and-usage)
  - [UI](#ui)
  - [Embedded C Code](#embedded-c-code)
  - [Map](#map)
- [Prototype Video](#prototype-video)
- [Contributors](#contributors)
- [License](#license)

## Overview

The Smart Dustbin System is designed to automate waste collection using smart sensors and connectivity. The system consists of:
- An embedded system using Arduino to manage the hardware components.
- A user interface built with Next.js to manage and monitor the system.
- A map integration to display dustbin locations and their status.

## Features

- Automatic detection of waste levels using sensors.
- Real-time updates of dustbin status.
- User-friendly UI for monitoring and management.
- Map integration to visualize dustbin locations.

## Project Structure

The project is organized into the following folders:

- `UI/`: Contains the Next.js code for the user interface.
- `Embedded C code/`: Contains the Arduino code for the smart dustbin.
- `Map/`: Contains the code for the map integration.

## Setup and Usage

### UI

To set up and run the Next.js UI:

1. Navigate to the `UI` folder:
   
   cd UI
   

2. Install the dependencies:
   
   npm install
   

3. Run the development server:
   
   npm run dev
   

4. Open your browser and navigate to `http://localhost:3000`.

### Embedded C Code

To upload the Arduino code:

1. Open the Arduino IDE.
2. Navigate to the `Embedded C code` folder and open the `dustbin.ino` file.
3. Connect your Arduino board to your computer.
4. Select the appropriate board and port from the `Tools` menu.
5. Upload the code to the Arduino board.

### Map

To set up and run the map integration:

1. Navigate to the `Map` folder:
   
   cd Map
   

2. Follow the instructions in the `README.md` file inside the `Map` folder for setup and usage.

## Prototype Video

Check out the prototype video of the Smart Dustbin System [here](#).

## Contributors

- **Contributor 1**: Aayisha Noora J(#)
- **Contributor 2**: Bhuvaneshwari.M (#)
- **Contributor 3**: B.E.Shrinithy (#)
-
We welcome contributions from everyone. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


## How to Add and Commit Files to the Repository

### Adding Files

1. Navigate to your project directory:
   
   cd path/to/your/project
   

2. Create the necessary folders:
   
   mkdir -p UI "Embedded C code" Map


3. Move your files into the appropriate folders:
   
   mv /path/to/your/ui/files/* UI/
   mv /path/to/your/embedded-c-code/files/* "Embedded C code"/
   mv /path/to/your/map/files/* Map/
   

### Committing and Pushing Changes

1. Add the changes to git:
   
   git add .
   

2. Commit the changes:
   
   git commit -m "Organize project into UI, Embedded C code, and Map folders"
   

3. Push the changes to the repository:
   
   git push origin main
   

By following these steps, you'll have a well-organized repository with all parts of your Smart Dustbin System project neatly separated into their respective folders.


### Committing and Pushing the `README.md` File


git add README.md
git commit -m "Add README file with project details"
git push origin main


The prototype video link :https://www.youtube.com/watch?v=VIE4CCsltro


