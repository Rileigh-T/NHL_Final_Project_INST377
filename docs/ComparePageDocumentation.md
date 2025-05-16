NHL Player Comparison Documentation (Compare Page)

Overview
The NHL Player Milestone Checker is a feature within my NHL Stats Website that allows users to compare two NHL players based on their career milestones and statistics. Additionally, users can add new players to the database for future comparisons.

File Structure
The player comparison feature consists of two main files:

compare_page.html: The HTML structure for the comparison page
compare.js: JavaScript functionality for player comparisons

Core Features:
Player Milestone Comparison: Compare two NHL players' career milestones
Player Statistics Display: View key statistics for compared players
Player Database Addition: Add new players to the database with their statistics
Animated UI Elements: Animations for the boxes

Key HTML Elements:

Player Comparison Form: Inputs for two players and a compare button
Add New Player Form: Form to add players to the database
Result Containers: Areas to display comparison results
Animation Script: AOS library for scroll animations

CSS Styling
The page uses custom CSS styling defined in the <style> section:
Such as 
- Color Scheme: Uses NHL-appropriate colors
- Animated Button: Uses the button-85 class with a glowing animation effect
- Player Boxes: Styled boxes for displaying player information

JavaScript Functionality:

Key Functions:
- Helper Functions:
    - capitalize(name): Properly capitalizes player names


API Interaction:
- fetchMilestonePlayers: Fetches players from the NHL API for specific milestones


API Integration
The player comparison feature integrates with the NHL API to fetch milestone data.

API endpoints used:
/milestone-1000-point-career
/milestone-500-goal-career
/milestone-100-point-season
/milestone-50-goal-season
/milestone-5-goal-game

Database Integration
The feature integrates with a local Supabase that I created to:

- Retrieve Player Statistics: For displaying alongside milestone data
- Add New Players: For adding custom players to the database

Milestone Tracking:
The app tracks several key milestones for NHL players

- 1000 Point Career: Players who have scored 1000+ career points
- 500 Goal Career: Players who have scored 500+ career goals
- 100 Point Season: Players who have had a 100+ point season
- 50 Goal Season: Players who have had a 50+ goal season
- 5 Goal Game: Players who have scored 5+ goals in a single game
