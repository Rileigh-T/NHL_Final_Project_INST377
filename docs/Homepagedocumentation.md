NHL Stats Website Documentation (Homepage)

Overview
The NHL Stats Website provides users with an opportunity to search and view statistics for NHL players and teams. It's built with HTML, CSS, and JavaScript, and uses the NHL API to fetch real-time data.

File Structure: 
The website consists of two main files:

homepage.html: The main HTML structure
homepage.js: JavaScript functionality

Core Features

Player Statistics Search: Users can search for NHL players by name and view their key statistics
Team Statistics Search: Users can search for NHL team data and view team performance metrics
Team Image Slideshow: Displays rotating images for selected teams
Data Visualization: Shows team shots per game across the league using Chart.js


Key HTML Elements:

Header: Contains the NHL logo and navigation menu
Search Sections: Divided into three columns (images, player search, team search)
Canvas: For rendering the shots chart visualization

CSS Styling
The website uses custom CSS styling defined in the <style> section:

JavaScript Functionality

Key Functions:

fetchAllPlayers(): Gets player data from NHL API
fetchAllTeams(): Gets team data from NHL API
fetchStandings(): Gets standings data from NHL API


Search Functions:

searchPlayer(name): Searches and displays player statistics
searchTeam(name): Searches and displays team statistics

API Integration
The website integrates with the NHL API to fetch:

Player Data: https://api.nhle.com/stats/rest/en/skater/summary?limit=-1&cayenneExp=seasonId=20232024
Team Data: https://api.nhle.com/stats/rest/en/team/summary?limit=-1&cayenneExp=seasonId=20232024
Standings Data: https://api-web.nhle.com/v1/standings-season
Shots Data: https://api.nhle.com/stats/rest/en/team/summary?sort=shotsForPerGame&cayenneExp=seasonId=20232024%20and%20gameTypeId=2
