### Dependencies

Simply run the following commands inside the root of this project. This downloads all dependencies into the `node_modules` folder.

- `npm install`

### MongoDB

to connect to mongoDB database you need to edit connection string in `.env` file.

- create `.env` file
- copy the contents from `.env.templet` to your `.env`
- add `PORT` number eg. `PORT = 5000`
- add `NODE_ENV` add `developer` if you want to use dev version
- add string to `JWT_SECRET` section the longer the string the better
- add mongoDB database connection string to `MONGO_DB`

### To start

- use `npm run server` to run backend
- use `npm run client` to run frontend

### To add a admin account

- you can add it trough mongodb
or
- login to your admin account and add it through the account manager table
