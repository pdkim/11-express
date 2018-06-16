##Travis: 
[![Build Status](https://travis-ci.com/pdkim/11-express.svg?branch=pk11)](https://travis-ci.com/pdkim/11-express)


##Heroku: 
https://pk-11-express.herokuapp.com/


##Github:
https://github.com/pdkim/11-express

##Feature:
An application that can POST a new object with a unique ID and and store it to a storage device.  If data is stored, user is able to make a GET request to get the specific ID.  If user is not satisfied with user ID, they are able to DELETE the ID from existance.

###Intructions:
1. Go to the github link and clone the repository. You may want to fork prior to cloning the repository.
2. 'npm install' before running anything.
3. 'nodemon index.js' to start server.
4. In postman, have a tab for POST, GET, and DELETE at the following url: http://localhost:3000/api/v1/worker
5. Once all tabs are setup, attempt to POST.
  a. You should get a 400 Bad Request error.
6. Go to the GET tab and and press GET.
  a. You should get a 400 Bad request error.
7. Add the following to your route in GET: /1111.  Press GET.
  a. You should get a 404 error.
8. Go back to POST tab and select Body > Raw. Copy the following information (you can change values on the right as you like):
{"firstName" : "Phil",
	"lastName" : "Kim",
	"hourlyWage" : "100"
}
9. Press POST.  You should now recieve a valid object.
10. Copy the id generated in the POST and switch to the GET tab.
11. Replace the 1111 in step 7 with the new id and press GET.
  a. You should now see the same object created in POST.
12. Go to the DELETE tab and paste the id in the url.  Be sure to include /before pasting the id.
13.  Press DELETE.  You should get a 204 status code. 