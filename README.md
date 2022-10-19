# Better Equipment and Entity Tracking Software (BEETS)

## Getting Started

### 1. Clone the Repository
To get started working on BEETS, clone this repository using your favorite git tool (GitHub Desktop, Git CLI, etc)

>Repository Link: https://github.com/bee-cs458/bee-tracking-software.git

### 2. Install Prerequisites
Navigate to the [Node.js website](https://nodejs.org/en/download/) and download the Long Term Support (LTS) version (16.18.0)

### 3. Install Dependencies
Open the root folder of your git project. This should include a "client" folder, a "controllers" folder, a "utilities" folder, a "routes" folder, a package.json file, and potentially a few other miscellaneous files. 

In this folder, open a command prompt or terminal window. Then, run the following command: `npm i`.

### 4. Setup Environment Variables
Download the .env file from the Microsoft Teams "Useful Links" channel. Place this in the root folder.

### 5. Start the App
Now, it is time to run the application. To do this, in the same terminal/command prompt window as before, run the following command: `npm run dev`

If it worked, you should see a message in terminal which says "Webpack compiled successfully".

### 6. Open in VS Code
VS Code is the recommended code editor for this project, but you are free to use whatever you are comfortable with. Now that the project is downloaded and setup, you can open VS Code and click File > Open Folder. Navigate to the projects root folder (remember, the one that contains server, client and package.json)

### 7. Create a New Branch
In order to make sure that all code is reviewed before being adding to our main branch, everyone will work in branches and then submit a pull request once done. To create a new branch, you can do so in GitHub by clicking "branches">"New branch" or by clicking on the branch name in the bottom left corner of VS Code. If you just downloaded the project, it should be called "main". For now, your source branch should always be "main". 

You should call your branch something like "beets-##-description-of-your-work". Replace the ## with the number from your Jira ticket. 

You are now ready to start development! 

### Troubleshooting
Remember, if you run into any issues along the way, please post it in the "Technical Help" channel of the MS Teams.

## App Overview
BEETS is divided into three main parts: Frontend (React), Backend/API (Express), and the Database (MySQL).

### Frontend
- api -> contains "Service" files that have methods to interact with the backend
- assets -> images and stuff
- components -> contains react components. Each component should have its own folder, with a Component.js and a Component.css
- constants -> contains files for any constants we need
- routes -> contains special react components. These define our pages or "views"
- tests -> a place for unit tests

### Backend
- controllers -> contains "Controller" files that have methods to interact with the database
- routes -> determines which methods from the Controller gets called based on the URL
- utilities -> contains files with miscellaneous methods that help accomplish a task
    - DatabaseUtilities -> contains methods that help setup the database connection. Use the "query" method to run SQL scripts

## Team
- Gentz, Cody (Technical Lead)
- Hess, Damian
- Husein, Rahmi
- Leverty, Keenan (Scrum Master)
- Prew, Ella
- Thatcher, Khameron
- Tiefenthaler, Colby (Product Owner)
- Wehrman, Joshua

