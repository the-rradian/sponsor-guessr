# Sponsor guesser

A simple quiz web app I'm working on where one has to guess the correct motorsport team affiliated with the sponsor shown on screen. (I am not affiliated with any of the companies shown). 

## How it works 
A logo of a company is displayed on screen. The user then has to guess on which team's car that logo is found. 

# Functionality 

## Answers
The game is made in a single-page Vue application. The application requests a JSON from a Firebase database which contains all (well, most of) the teams and sponsors for a given motorsport and season (ex. Formula 1 2023). This JSON serves as the answer list. The app picks a random entry from that list for each guessing round

Sponsors can change from season to season, so the aim is to have multiple seasons of multiple motorsports eventually. Currently, only F1 2023 is available. 

## Logos
Along with the teams and their sponsors, the JSON also contains the names of the logo images corresponding to each sponsor. This name is used to request the appropriate image from Firebase storage for that sponsor. 

