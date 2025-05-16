# NHL_Final_Project_INST377

Title: NHL Stats and Comparison Tool

Description: My project is made for NHL anlaysts/fans that want to get a closer and quick look at some of the NHL's most notable players and teams. Through my website, users will be able to view quick stats of the most recent season for all NHL players. They will also be able to see the stats for their favorite NHL team and the most recent season. If users navigate to the "Compare" tab in the navigation, they will be able to enter two players to compare milestones and career stats (as long as the players are in the top 50 in the history of the NHL). Users can also enter new player data so that the career stats database can be expanded upon. 

Target Browsers:
- Desktop Chrome
- Firefox
- IOS Safari
- Android Chrome

Developer Manual Link: https://github.com/Rileigh-T/NHL_Final_Project_INST377/blob/main/docs/Final_Project_Markdown.md



-----------------------------------Developer Manual-------------------------------------------------------

How to install application and Dependencies:

This project uses local connection and several API's, follow the steps below:
- Step 1: Clone the Repository
    - git clone https://github.com/Rileigh-T/NHL_Final_Project_INST377.git
    - cd NHL_Final_Project_INST377

- Step 2: Install Dependencies
    - This project uses Node.js, nvm, and other libraries. 
    - You will need to install the following
        - Node
        - Chart.js
        - AOS.js
        - Supabase (Directions can be accesed on the supabase website (https://supabase.com/docs/reference/javascript/installing))
        - express
        - nodemon
        - body-parser
        - dotenv
        - cors
- Step 3: Create Enviornment Variables
    - Create a .env file to hide your supabase api and url. 

--------------------------------------- Running the Server -----------------------------------------------

- Step 1: Start the backend server
    - run "npm start" in the console. You should get a "api is alive" response in the console if it is properly working.

- Step 2: Access and Understand the frontend 
    - All of the HTML pages is what is used to design the website. If you want to change the look of the website, you can change it there. 

----------------------------------------- Testing --------------------------------------------------------

There are no formal tests that are implemented within this code itself, but I did perform several tests outside of this code to ensure everything is working. I suggest doing this as well, to see how to fix any possible errors that may arise. 

- Download the Insomnia App and enter the local host  3000 server link which should be ending in /players. This should bring back a result of what is inside the supabase table that I have created. 

- You can also use Insomnia to test out the other two API calls that I do to test the server link to make sure it is still working!

----------------------------------------- API's ----------------------------------------------------------

**Index.JS API Usage:**

- GET --> Endpoint: /api/compare/:player1/:player2  --> Description: Fetch comparison data between two players. Returns JSON with relevant stats.

- GET --> Endpoint:	/api/player/:playerName  --> Description: Returns player-specific performance data.

- GET --> Endpoint:	/api/team/:teamName --> Description: Returns team-related stats or context.

- POST --> Endpoint: /api/feedback  --> Description: Accepts user feedback. Payload: { name, email, message }

- GET --> Endpoint:	/api/status	 --> Description: Returns server status and version metadata.

**Compare.JS API Usage:**

- GET --> /players --> Description: Retrieves all stored player statistics from the backend (e.g., Goals, Assists, Points)

- POST --> /player --> Description: Adds a new player and their stats (Goals, Assists, Points) to the backend database.

- Milestones API endpoints 
    - /milestone-1000-point-career
    - /milestone-500-goal-career
    - /milestone-100-point-season
    - /milestone-50-goal-season
    - /milestone-5-goal-game

Base API Link: https://records.nhl.com/site/api

**Homepage.JS API**

- GET --> /api/players --> Description: Returns a list of all players

- GET --> /api/teams --> Description: Returns a list of all teams

- GET --> /api/standings --> Description: Returns current standings data

- GET --> /api/player/:playerId --> Description: Returns detailed info for a specific player

- GET --> /api/team/:teamName/images --> Description: Returns image URLs for a specific team (like your teamImages object)

- GET --> /api/player/:playerId/stats --> Description: Returns historical stats for charting

------------------------------------- Bugs/Roadmap -------------------------------------------------------

Bugs:

- There is limited error handling for API issues. This means there could be a failure for some sections that do not display a notification.

- I'm not 100% sure about this one, but there could be mobile layout inconsistencies. In more detail, I expect that there could be issues with the image slider in particular in terms of it behaving oddly on a smaller screen. 

- No other known bugs, but if there are more it can be documented here!

Future Development:

- Short Term
    - Improve the error Handling 
    - Refine the CSS to make sure layout details work good on IOS devices. 

- Long Term
    - Load team images from an API 
    - Add more player comparison charts and advanced stats filtering
    - Allow users to favorite players and teams to easily revist and personalize their website
    - Integrate with live game data, especially for player stats