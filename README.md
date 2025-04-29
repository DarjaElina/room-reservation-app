## 🎻 Room Reservation App 

This is a final project implemented for the [Full Stack Open course](https://fullstackopen.com/en/) at the [University of Helsinki](https://www.helsinki.fi/en).

This project is a full-stack application designed for music school students and teachers. It allows users to book different study facilities such as practice rooms, classrooms, and more.

This repository contains the frontend part of the application. Built with [TypeScript](https://www.typescriptlang.org/), [React Native](https://reactnative.dev/), and [Expo](https://expo.dev/), it supports both native mobile and web platforms.

#### 🔗 Links to other parts of the project:

- Backend repo: https://github.com/DarjaElina/room-reservation-app-backend
- Account activation page repo: https://github.com/DarjaElina/account-activation-page

### ✨ Features

- JSON Web Token authentication (login, registration, refresh)
- Full room booking CRUD: create, view, update, cancel
- Filter rooms by time, type, building, and available tools
- Paginated room list with infinite scroll
- Localization with [typesafe-i18n](https://www.npmjs.com/package/typesafe-i18n/v/2.21.1)
- Cross-platform support: Web, Android, iOS
- Testing with [Jest](https://jestjs.io/) and [Maestro](https://docs.maestro.dev/)
- CI/CD with [GitHub Actions](https://github.com/features/actions): linting, tests, web deploy, and Expo development builds
- Uses two backend environments: staging (for testing and dev builds) and production (for deployed web)
- Automatic username generation and email-based registration for testing
- Custom-built TimePicker for selecting booking times (a bit of a Frankenstein 👹, but built with love 💛)

> Note: While localization is supported in the UI, some static data (e.g., room and building names, tools) is still in English. I’m aware of this and plan to internationalize the database content in a future update.
  
### 🏁 Getting Started

#### 📱 Run with [Expo Go](https://expo.dev/go) (physical device)

> ✅ Recommended if you want to test with the staging backend

1. Clone the repo
2. Install dependencies
3. Start the dev server pointing to the staging backend

``` bash
git clone https://github.com/DarjaElina/room-reservation-app.git
cd room-reservation-app
npm install
EXPO_PUBLIC_BACKEND_URL=https://backend-rough-wildflower-6075.fly.dev npm start
```
Then scan the QR code using Expo Go on your mobile device or follow the terminal instructions:
```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web
```

⚠️ Notes on Local Backend and Expo Go

- ❌ backend running on localhost or 127.0.0.1 will not work with Expo Go on a physical device.
- ✅ localhost works fine in web or simulators running on your development machine.

#### 💻 Run with Local Backend (❗️ web or simulator only)

1. Start your backend locally by following [backend](https://github.com/DarjaElina/room-reservation-app-backend) README
2. Clone the frontend repo and install dependencies
3. Start the frontend pointing to local backend:

``` bash
git clone https://github.com/DarjaElina/room-reservation-app.git
cd room-reservation-app
npm install
EXPO_PUBLIC_BACKEND_URL=http://localhost:4000 npm start
```

Then follow the terminal instructions:
```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web
```

#### 🍎 Using iOS Development Build (Xcode)
todo: add instructions

#### 🤖 Using Android Build (Android Studio or physical device)
todo: add instructions


### 🌐 Web Deployment
The web version lives here: https://mobile-frontend--jbyli0d1x4.expo.app/

#### You can log in using:
- Username: jd10000
- Password: password

#### 🧪 Or if you'd like to test the full account activation flow:
1. Visit [link]
2. Enter your email address
3. The system will generate a username and let you set a password

### 🧡 Acknowledgments
Huge thanks to the [Full Stack Open](https://fullstackopen.com/en/) team for creating such a fantastic, free, and super educational course. It’s been a joy building this project and growing as a developer through the journey! 🙏✨



