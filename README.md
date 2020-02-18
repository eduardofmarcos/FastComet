# FastComet

### Overview:
A NodeJS API for a shipping company. 

### Features:

CRUD operations on:

* Register Admin Users
* Register Recipients
* Register Deliverymen
* Register Orders
* Log in sessions using token JWT
* Uploading files using Multer and FileSystem
* Sendind Cancellation and New Orders e-mails to deliveryman using NodeMailer

### Built with:

* Docker
* Postgres

##### Depedencies:

    "bcryptjs": "^2.4.3",
    "bee-queue": "^1.2.3",
    "date-fns": "^2.9.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-async-errors": "^3.1.1",
    "express-handlebars": "^3.1.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.8.11",
    "multer": "^1.4.2",
    "nodemailer": "^6.4.2",
    "nodemailer-express-handlebars": "^3.1.0",
    "pg": "^7.18.1",
    "pg-hstore": "^2.3.3",
    "sequelize": "^5.21.3",
    "youch": "^2.0.10",
    "yup": "^0.28.1"

### How to run:

"dev": "nodemon src/server.js"
