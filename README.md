# Student Data App #

This was a node/bootstrap/js assignment that I had during my Web 2 class. I decided I should get on and store it here.

Currently I have the node backend using MySQL, so you may have to work on getting that set up. Maybe I'll stub in some code that'll help to keep it working even if it doesn't have MySQL to connect to.


## Requirements
+ [nodejs](https://nodejs.org)
+ [mysql](https://www.mysql.com/) with a "students" database setup



## Setup
You'll want to run:
```sh
npm install
```
```sh
npm start
```

To get the app running.


You'll want to add a json file in the same folder as `index.js` that is called `s_config.json`. This file will be used to configure the connections to the app including passwords for databases (mysql in this case), IP, and PORT for the app to run on. Here is an example:

```json
{
    "mysql": {
      "user": "master",
      "password": "password"
    },
    "PORT":1234,
    "IP":"127.0.0.1"
}
```

This file should remain unversioned so it never gets pushed to Github or anything. I have it so I can keep credentials up to date without worrying about committing them.
