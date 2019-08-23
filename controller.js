// require is like import in react.
const users = require("./users");

// request, response, and next are ALWAYS
// available to the callback function.
// The names don't matter, but usually they are
// req, res, and next. We don't use next very often
// so most people leave it off.
const getUsers = (request, response, next) => {
  console.log(request.query);
  // queries are anything after the `?` in a url
  // ex. localhost:5050/api/users?first_name=Jonathan
  // they are NOT separate routes, so we handle them
  // with if statements.
  if (request.query.first_name) {
    // find only users with that first_name
    const filteredUsers = users.filter(
      user =>
        user.first_name.toLowerCase() === request.query.first_name.toLowerCase()
    );
    // response.json sends data back to whoever requested it
    // always in the form of JSON.
    // response.send is similar, but not guaranteed to
    // be interpreted as JSON
    response.json(filteredUsers);
  } else if (request.query.last_name) {
    // we can use status codes to help the front
    // end know how to handle our response
    // http.cat has a full list of options
    response.status(500).json("We can't search by last name");
  } else {
    // the default status code is 200
    response.json(users);
  }
};

const getOneUser = (req, res, next) => {
  // these functions are just javascript!
  // you can do any javascript you would normally do
  // res.json(users.filter(el => el.id === 10))
  // res.json(users[9])
  //   console.log(req.params);
  const user = users.find(user => user.id === +req.params.userId);
  // if .find doesn't find a user,
  // the result is undefined
  // which is falsey
  if (!user) {
    // we can send the front end an error
    res.status(404).json("No user found");
  } else {
    res.json(user);
  }
};

// module.exports is like export default in react
// people always forget the s on exports.
module.exports = {
  //this is object shorthand.
  // we're creating a property called getOneUser
  // and its value is the function with the same name
  // so we can combine it into one
  getOneUser,
  // this is the alternative to the shorthand notation
  getUsers: getUsers
};
