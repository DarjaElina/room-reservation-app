## 🎻 Room Reservation App 

This is a final project implemented for the [Full Stack Open course](https://fullstackopen.com/en/) at the [University of Helsinki](https://www.helsinki.fi/en) (aiming for 10 credits).

This project is a full-stack application designed for music school students and teachers. It allows users to book different study facilities such as practice rooms, classrooms, and more.

This repository contains the frontend part of the application. Built with TypeScript, React Native, and Expo, it supports both native mobile and web platforms.

#### 🔗 Links to other parts of the project:

- Backend repo: https://github.com/DarjaElina/room-reservation-app-backend
- Account activation page repo: https://github.com/DarjaElina/account-activation-page

### ✨ Features

- JSON Web Token authentication (login, registration, refresh)
- Full room booking CRUD: create, view, update, cancel
- Filter rooms by time, type, building, and available tools
- Paginated room list with infinite scroll
- Localization with typesafe-i18n
- Dark/light mode with React Navigation native theming
- Cross-platform support: Web, Android, iOS
- Testing with Jest and Maestro
- CI/CD with GitHub Actions: linting, tests, web deploy, and Expo development builds
- Uses two backend environments: staging (for testing and dev builds) and production (for deployed web)
- Automatic username generation and email-based registration for testing
- Custom-built TimePicker for selecting booking times (a bit of a Frankenstein 👹, but built with love 💛)
  
### 🧡 Getting Started

#### 📱 Using Expo Go

``` bash
git clone [<repo-url>](https://github.com/DarjaElina/room-reservation-app.git)
cd room-reservation-app
npm install
npm start
```
Then scan the QR code using Expo Go on your mobile device.

#### 🍎 Using iOS Development Build (Xcode)
todo: add instructions

#### 🤖 Using Android Build (Android Studio or physical device)
todo: add instructions


 ### 🌐 Web Deployment
The web version is available at: [link]

You can log in using:
- Username: jd10000
- Password: password

Or test the full account activation flow:

1) Visit [link]
2) Enter your email
3) The system will generate a username and allow you to set a password

### 🧡 Acknowledgments
Huge thanks to the [Full Stack Open](https://fullstackopen.com/en/) team for creating such a fantastic, free, and super educational course. It’s been a joy building this project and growing as a developer through the journey! 🙏✨



