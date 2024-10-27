# About the Step Counter App
This React Native app is a step counter that tracks daily steps, displays progress toward a daily goal, and provides motivational quotes. The app allows users to view their step progress in a circular progress bar, set a custom daily step goal, and save their daily steps to a history log. Additionally, the app retrieves a daily motivational quote to inspire users on their fitness journey.

Code Summary
The app uses React Native's useState and useEffect hooks for managing state and side effects. The pedometer sensor, accessed via Expo, tracks steps, while the SecureStore API saves and retrieves the user's daily goal and step history securely. The app includes basic error handling to alert users of any issues with accessing sensors or storage. A circular progress indicator shows progress toward the daily goal, and several buttons allow users to reset steps, update goals, and view their history.

This app is a straightforward step tracker with a user-friendly interface, designed to encourage daily activity.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
