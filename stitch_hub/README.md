# StitchHub

(Soon to be) A social network application for users to share knitting, crochetting, and cross-stitching patterns. 

## How to run

1. Start a MongoDB server via the default port (`mongod --dbpath=[existing_directory]`)
2. Install the necessary node packages (`npm install`)
3. Make sure that no process is using port 3000 or kill it if one exists (this app will listen to port 3000)
4. Run the application (`npm start`)
5. Go to `http://localhost:3000/` to visit our app

## MVP Implementation

For the sake of convenience, the latest commit on branch `mvp` will represent our MVP implementation (but the latest commit on master before the due date should work as well).

The MVP focused on the creative aspects of the application instead of social. We allow thse who visit the site to create and remix charts. However, there are no user accounts and hence there is also no notion of liking, saving, commenting, or following.