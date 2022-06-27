### Dependencies

Simply run the following commands inside the root of this project. This downloads BackEnd dependencies into the `node_modules` folder.

- `npm install`

and for FrontEnd you'll need to run the following commands inside the root of this project.

- `cd ./frontend`
- `npm install`


### Set up .env file

To do this step all you need is to follow all the steps listed below

- create `.env` file
- copy the contents from `.env.templet` to your `.env` file

A port can be any number you so choice (it can be 5000, 8080 and etc.)

- Add `PORT` number

- add `NODE_ENV` (eg. 'developer')

- Add a string of later or number to `JWT_SECRET` section (the longer the string the better)

- ### Create a database

Next you'll need connection string from https://cloud.mongodb.com/. To do this first you need to create a new database, you can do so by following the steps below.

- ### Create a database

    - First go to your orginazations project tab
    - Click create new project and name it
    - Click build Database and choise shared
    - Choise the closest region
    - Name cluster (not required)
    - Create a usename and a password
    - Add your current ip address
    - And finish creating
    - Click connect then choise to connect your application 
    - There you will find the connection string

- Add connection string to `MONGO_DB` section
- And add your password to the connection string (`<` and `>` must be deleted)


- add mongoDB database connection string to `MONGO_DB`

### To start

To start the application you must be in the root folder

- Use `npm run server` to run backend
- Open anouther terminal
-  And use `npm run client` to run frontend

### To add a admin account

- you can add it trough mongodb (must follow the user userSchema structure) but if you use this method the password won't be hashed
or
- login to your admin account and edit existing accounts role to admin
or
Using `Postman`
