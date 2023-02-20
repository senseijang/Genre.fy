# Genre.fy

## Goal

The website's goal is to recommend to users some artists based on the top artists listened to. To do this, we must establish authentication with the Spotify API and then use the API to get information back and display it to the user. Theoretically, this web app should be infinite and the user should be able to keep clicking on recommended artists and their songs until they feel like they want to stop.

## Page Info

The prototypes for the pages can be found at: https://xd.adobe.com/view/741014f2-d084-4c06-8965-7e99a44fb2fa-2143/
This section will go into further detail about the purpose of each page.

### Page 1: Login

This is the landing page for the website and the one that all users will be brought to as soon as they try to access the web application. From here there are 2 different routes that the user should be able to click.
The button “start here” will send the user to the official Spotify login page for us to request access to their information.
[MAYBE] The text “need help?” will send the user to a help page that we will design to explain what the website does and how to navigate through the website.
[EXTRA] Adding links in the footer of the website will allow us to add sections such as source code and about us.

### Page 2: Initial Recommendation

This page is the result of a successful login to Spotify. The artist in the middle of the recommendation is the one that the user has listened to the most. From here, some branches connect the artists to smaller sub-portraits that allow the user to click on them to change the artist in the middle to the one clicked.

For the artist in the middle, they are to have their:
Name
Top 5 songs

Sub-portraits do not need the top 5 songs, just their name.

### Page 3: Recommendation after a click

This page is the result of the user clicking on another artist. The artist that has been clicked will take the focus in the middle and their top 5 songs will be displayed. New recommendations will be generated.

### Page ?: Error page for login

The page is the result of an unsuccessful login into Spotify. In this case, we should just let the user know of the error and offer a button to send them back.

## Config

There are some dependencies to start working on this project.
Install the latest, stable version of Node.js
Install TypeScript by running this command in the console (PowerShell, Git Bash, etc.) “npm install -g typescript”
TypeScript files are denoted by a .ts extension, to make a JavaScript or .js file out of the TypeScript file run the command “tsc filename.ts”
Run “npm install” to install the dependencies for the program.
To run the program locally, use the command, “node run test-server”

Note: you can both compile and run a program by using the command:
“tsc filename && node filename”

## GitHub Policy

Do not commit directly to the main branch, this will cause a lot of problems down the road.
Every change that you make will have to be on your own branch.
Once you believe that the branch is ready for merging, start a pull request.
After the pull request is approved, then the branch will automatically be merged and deleted.

## Notice

Sadly, as we ran on a limited amount of time, there is no way to publish this website for the public at the moment to get out of Spotify’s “development mode” we must submit a quote extension request which would take at the minimum 6 weeks. Instead, for this project, we are running in development mode and only authorized users will be able to run the project.

If you would like to try and run the app, please contact boooiil#1931 on Discord.
For now, as we are using a public token, the repo is private, if you would like access, contact Andy (andyjang@iu.edu)
