# Project Submission - Meme Gallery

Meme Gallery is an application that users can upload pictures (memes) and then view randomly selected memes that others have uploaded. The back-end is done with NodeJS and Express, while the front-end is handled with React. Front-end communicates with the back-end via REST api. All data is saved in a MongoDB Atlas cluster and uploaded image files are stored locally.

The main objective of this project was to create a functional back-end and therefore the front-end is not fully finalized and even has some (critical) bugs. Due to time limitations I am not able to fix these problems, but otherwise I would.

## How to run

When running the project first time both back-end and front-end need to get node packages installed. This can be done by executing the following command in the respective directories.
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
