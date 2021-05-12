# Project Submission - Meme Gallery

Meme Gallery is an application that users can upload pictures (memes) and then view randomly selected memes that others have uploaded. The back-end is done with NodeJS and Express, while the front-end is handled with React. Front-end communicates with the back-end via REST api. All data is saved in a MongoDB Atlas cluster and uploaded image files are stored locally. In short, the front-end application makes bunch of requests to the REST server which either lets the user to register or login, or to view memes and upload them; Nothing too complicated.

The main objective of this project was to create a functional back-end and therefore the front-end is not fully finalized and even has some (critical) bugs. Due to time limitations I am not able to fix these problems, but the back-end should be working properly. There are a few main features I wan't to point out: The connection between the client and server is made secure by token authentication. Whenever a user logins on the page, he or she is given token that matches the entry inside the database. Most of the actions the server handles require the user to provide a token that is checked from the database. Each token is valid for 1 hour. Another security feature is that  passwords with are encrypted and salted, and nothing is never saved in a plain text.

## How to run

This video shows how to run the project and the main functionalities **https://youtu.be/INNc2jNpRrI**

There is some testing data included in the repository and MongoDB Atlas -database.

When running the project first time **both back-end and front-end** modules need to get node packages installed. This can be done by executing the following command in the respective directories.
```
npm install
```

After the required packages are installed the server and client can be started separately **inside the main folder**.

### Start the server
```
npm run server
```

### Start the client

```
npm run client
```
