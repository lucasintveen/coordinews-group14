 // The example below shows you how a cloud code function looks like.

/* Parse Server 3.x
* Parse.Cloud.define("hello", (request) => {
* 	return("Hello world!");
* });
*/

/* Parse Server 2.x
* Parse.Cloud.define("hello", function(request, response){
* 	response.success("Hello world!");
* });
*/

// To see it working, you only need to call it through SDK or REST API.
// Here is how you have to call it via REST API:

/*
* curl -X POST /
* -H "X-Parse-Application-Id: c9ANHYXt3VufbV5pzk3KAQpjdQNtvXPYpXJMH51m" /
* -H "X-Parse-REST-API-Key: 4FqdZEAFjSzDuTo3lxXLTqFCBFk7N6ReKhI3KuOv" /
* -H "Content-Type: application/json" /
* -d "{}" /
* http://parseapi-dev.back4app.com/functions/hello
*/

// If you have set a function in another cloud code file, called "test.js" (for example)
// you need to refer it in your main.js, as you can see below:

/* require("./test.js"); */