## Booking App

This is a final project implemented for Full Stack Open Course at Helsinki University.

This application is a booking platform designed for conservatory students and teachers, allowing to book different study facilities, such as practice rooms, classrooms etc.

This repo contains frontend part of the application, developed with Expo and React Native.

Application main features:

1) JSON Web token Authentication
2) CRUD operations (create, update, cancel and view bookings)

This app uses three CI/CD pipelines, one implemented as a GitHub actions workflow, and 2 others as EAS workflow.

Pipelines are made to lint, test and the deploy the application to the web and create development builds for Android and IOS accordingly.

Additional features:
1) Localization using typesafe-i18n
2) Dark/light mode using react navigation native theming
3) App works both on web and native platforms
4) Maestro and Jest tests
5) App uses two backends, staging for testing and development builds, and production for web production version
6) Custom TimePicker component
7) Automatic username generation and email based registration for test mode (in actual app users will be added by admin)

Steps to open the project:

### Using Expo go

1) Clone this repo
2) Navigate to the project directory
3) Run npm install
4) Npm start 

### Using IOS development build and X Code
// Steps

### Using android build on your device or Androud Studio
// Steps


### Deployed web application lives here
// Link to the web version
You can login using username jd10000 and password password, or if you'd like to test the user activation flow, go to this link, enter your email address and system will generate a username for you and you will be able to set your password



