# employee-tracker

## Description 

This [repository](mattdack.github.io/employee-tracker) contains an application that allows the user to utilize command line prompts to track an organization of employees. Users can add departments, roles, and employees to a database as well as view all of the created departments, roles, and employees. The application uses the inquirer node package in order to make command line prompts and take in user information. The mysql2 package is utilized to create and access a database. The console.table package is used to neatly present users with data in the terminal. This application was created to employ newly learned topics regarding asynchronous functions, databases, and command line prompts.

## Video of Application Usage
<a href = 'https://drive.google.com/file/d/1mLO11gXWk8eCx0FRpjpJK3FKh2raeP4e/view'> Link to Video</a>

## Installation

After cloning this repository, users should open the index.js file in an integrated terminal. Initialize the node package manager with the command 'npm init -y'. Install the necessary node packages(inquirer@8, mysql2, and console.table) and their dependencies with the commands 'npm install nameOfPackage'. The repository git ignore prevents the upload of these packages and dependencies due to size. Prior to initializing the application, users must enter the mysql shell which is commonaly called with the command "mysql -uroot -ppasswor" where "root" and "password" are the users own mysql account information. While in the shell, utilize command "SOURCE db/schema.sql". Users can optionally seed the database tables with placeholder information with command "SOURCE db/seeds/sql". After use command "exit" to leave the mysql shell and return to the integrated terminal.  After initializing the database, the application is accessible with the command 'node index.js' which will start the prompts in the integrated terminal.

## Usage 

Please follow the installation directions above before attempting to use the application. The command line prompts indicate when to use arrow keys to make a list from a selection. Otherwise, information can be enterred via keystrokes. As long as the mysql shell is maintained the user entered data will persist.

## Credits

 Matthew Dacanay created this application in its entirety. Technical concepts and public resources were referred to as needed. You can find other projects by Matthew at his [github page](github.com/mattdack).
