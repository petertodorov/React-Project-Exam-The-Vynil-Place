# ReactProjectExam - the Vinyl Place
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Open your terminal and run npm install in both 'resources/clinent/vinylapp' and 'resources/server' to get the needed packages

To run the server go to resources/server open new terminal  and run:
'node index' or 'nodemon index'

To run the app go to resources/clinent/vinylapp  open terminal and run:
 `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

I have used react-router-dom for handling the dynamic routing of the app and react-toastify for showing the differnet messages/errors based on the interaction with the server 

the Client folder contains the app and all related components and views as well as auth/vinyl and stats services for communication and data exchange with the server 

The server folder - contains the back-end and the logic related to it Server is implemented with Express with passport authentication and mongoDB)

The app is called 'The Vinyl Place'

It is A place to check a vinyl collection and vote (like dislike) vinyls.

Admin functionalities: The admin is seeded authomatically when running the app. Once the admin is logged he/she can Create/edit/delete vinyls  the admin cannot  cannot vote for any vinyl).

Regular user - to become one you have to register. Once you do it you are automatically logged in and you can vote and see the vinyls' details. You can like or dislike a vinyl only once. You can either like a vinyl or dislike it, you cannot do both for the same vinyl. Your loggin session expaires afer 1 hour. In order to end up your session you have to logg ouy

Anonimous users - can only see the list of vinyls and the stats. Cannot vote and cannot see details of a vinyl

author:Peter Todorov


