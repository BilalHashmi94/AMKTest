# Historical Places App - AMK Technologies Technical Assessment

This app was developed as part of a technical assessment for **AMK Technologies**.  
It allows users to discover historical places, mark them as visited, and explore a fun random suggestion feature.

Completed in ~16 hours using **React Native**

## Demo

Watch the demo here:  
[![Technical Assessment Ascendion Demo](https://img.youtube.com/vi/QnaXXzcy4x8/hqdefault.jpg)](https://youtu.be/QnaXXzcy4x8)


## Features

- Fetch and display historical places from [OpenTripMap API](https://api.opentripmap.com/)
- View details of each place (name, description, image)
- Mark and unmark places as **Visited**
- Dedicated **Visited Places** screen
- Random place suggestion feature
- Smooth navigation between screens
- Works on both iOS and Android

## Important Notes

- The app uses the free **OpenTripMap API**.  
- Since the API requires fetching details for each place individually, I added a **delay** between requests to avoid getting blocked due to too many calls.  
- This results in a slightly longer loading time when fetching places.  
- Pagination could have improved this, but due to time limits, it wasn’t implemented.  
- You can check the logic for fetching places in the **Home screen** code.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/BilalHashmi94/HistoricalPlacesApp.git
cd HistoricalPlacesApp

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


## 👨‍💻 Author

**M Bilal Hashmi**  
📧 muhammedbilalhashmi94@gmail.com

---

> This project was built as part of a React Native technical assignment in a clean, modular app.