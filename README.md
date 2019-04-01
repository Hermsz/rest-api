# My First API
### REST API built with Express and Sequelize.

### List of user routes:
| Route              | HTTP   | Description                                            |
| ------------------:|-------:|-------------------------------------------------------:|
| /api/users         | GET    | Get all the users info                                 |
| /api/users/:id     | GET    | Get a single user info                                 |
| /api/users         | POST   | Create a user                                          |
| /api/users/:id     | DELETE | Delete a user                                          | 
| /api/users/:id     | PUT    | Update a user with new info                            |
| /api/signup        | POST   | Sign up with new user info                             | 
| /api/signin        | POST   | Sign in and get an access token based on credentials   |

## Usage
Make sure you have Node.js and npm installed <br>
in your computer, and then run these commands:

``` 
$ npm install
$ npm start
$ npm run dev
```

Access the API via http://localhost:3000/api
Access through Heroku : 
https://apple-pie-48354.herokuapp.com/api/users
