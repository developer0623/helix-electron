# HelixAI - A Voice First Platform for Scientific Research and Discovery
HelixAI is a platform for creating hands-free voice enabled virtual assistants for the use in scientific laboratories and within scientific organizations.  Primarily accessed through smart speaker devices (Amazon Alexa, Google Home, etc) our virtual assistances increase convenience, productivity and optimize workflows within lab spaces as well as to improve safety and to reduce risks of human error and erroneous results.

## Quick Start
* npm install
* npm run start
* open http://localhost:3000
* open http://localhost:3000/admin/login

## Stack
* NodeJS
* React
* Redux
* Mongo/Mongoose

## Hosting
HelixAI is hosted on Heroku and MLab.

## Style Guides
Please use the following for guidance

* https://github.com/airbnb/javascript
* https://github.com/airbnb/javascript/tree/master/react

## Worker Processor
Asynchronous background jobs (sending emails, looking up data, parsing, etc) are queued and processed on Worker dynos.  To run the worker process locally use:

* babel-node lib/worker/index.js

## Clock/Scheduler
Recurring/scheduled jobs (sending notifications, reminders, emails, etc) are processed thru a scheduler.  To run the scheduler process locally use:

* babel-node lib/clock/index.js
