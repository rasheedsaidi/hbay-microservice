# hackerbay-microservice
Stateless microservice in Nodejs, with three major functionalities -

- Authentication
- JSON patching
- Image Thumbnail Generation

# Installation
Clone this repo as follows
Clone or Fork-Clone this repo

Then install dependencies by running 'npm install' inside the app root directory: <br><br>
**npm install**

<br><br>
Start the app by running: <br><br>
**npm start**

# Examples
## Creating a user
Send a post request to the endpoint: /api/v1/users/create:<br>
```
POST to '/api/v1/users/create'
Sample request body = {username: 'admin', password: 'secret'};
Sample response: {error: false, reply: "User was saved successfully!", user: admin}
```

## Logging In a user
Send a post request to the endpoint: /api/v1/users/login:<br>
```
POST to '/api/v1/users/login'
Sample request body = {username: 'admin', password: 'secret'};
Sample response: {error: false, reply: "Login successful", token: token}
```

## Creating a JSON PATCH
Send a post request to the endpoint: /api/v1/patch/create:<br>
```
POST to '/api/v1/patch/create'
let obj = {
    "baz": "qux",
    "foo": "bar"
};
let patch = [
    { "op": "replace", "path": "/baz", "value": "boo" }
];
Sample request body = {json_object: obj, json_patch: patch}
With required headers {'x-access-token': token_from_login}
Sample response: {error: false, reply: "JSON Object was patched successfully!", patch: {"baz": "boo", "foo": "bar"}
```
## Generating 50 x 50 px thumbnails
Send a post request to the endpoint: /api/v1/thumbnail/create:<br>
```
POST to '/api/v1/thumbnail/create'
let url = PUBLIC_IMAGE_URL;
Sample request body = {image_url: url}
With required headers {'x-access-token': token_from_login}
Sample response: {error: false, reply: "Image converted successfully", thumbnail: destination_url}
```
# Unit Testing
In order to run the unit tests, execute the command below:<br><br>
**npm test**
