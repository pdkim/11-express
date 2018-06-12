Travis: [![Build Status](https://travis-ci.com/pdkim/09-rest-persistence.svg?branch=pk09)](https://travis-ci.com/pdkim/09-rest-persistence)

Heroku: https://pk-09-persistence.herokuapp.com/

Github: https://github.com/pdkim/09-rest-persistence 

Feature:
An application that can POST a new object with a unique ID and and store it to a storage device.  If data is stored, user is able to make a GET request to get the specific ID.  If user is not satisfied with user ID, they are able to DELETE the ID from existance.

Intructions:
1. Go to the github link and clone the repository. You may want to fork prior to cloning the repository.
2. 'npm install' before running anything.
3. 'nodemon index.js' to start server.
4. In httpie or postman, run each method.