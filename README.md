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
4. Download the [Expo Go App](https://expo.dev/go)

``` bash
git clone https://github.com/DarjaElina/room-reservation-app.git
cd room-reservation-app
npm install
EXPO_PUBLIC_BACKEND_URL=https://backend-rough-wildflower-6075.fly.dev npm start
```
Then scan the QR code using Expo Go on your mobile device.

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

❗️ Note that running the app on your development machine requires Android Studio or XCode (for Mac only).

### 📱 Running Development Builds

This project supports both Android and iOS development builds for easy testing across platforms.

#### 🤖 Android Development Build
📦 APK Download (for physical device or with Expo Orbit and Android Studio)
Open this link with your Android device:
➡️ [Download Android build](https://expo.dev/accounts/daria111/projects/mobile-frontend/builds/72860318-312d-4f6a-9e93-55d54fcf5a65)

Then follow the instructions to install the APK file.

#### 🍎 iOS Development Build (Mac only)

Unfortunately, I found no easy way to share and run the iOS development build without an Apple Developer account.
If you still would like to test the iOS build, you can do the following:

1) Download the tar file from [here](add link later)
2) Extract the file by doubleclicking it
3) Open the iOS simulator (requires XCode)
4) Drag and drop the extracted .app file into the Simulator window

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



