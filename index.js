// require in node is the same as
// import in react
const express = require("express");

// express expects to invoke the express function
// to "initialize" our application
const app = express();
// we can write our functions inline or
// put them in their own separate file
const controller = require("./controller");

// we use app.get to tell express how to handle GET requests
// if the URL matches, then the callback function is run
app.get("/api/users", controller.getUsers);

// the :userId creates a property on req.params called userId
// in the browser's URL bar, you DON'T type :userId,
// replace that with the actual value you want
// ex. localhost:5050/api/users/10
app.get("/api/users/:userId", controller.getOneUser);

// app.listen tells express to handle any HTTP requests that come to port 5050
app.listen(5050, () => {
  console.log("Listening on port 5050");
});
