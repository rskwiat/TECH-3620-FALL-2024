# Cougar Chat -- Tech 3620 Fall 2024 Application

Libraries and documentation used in class

- UI - https://reactnativepaper.com/
- Expo - https://docs.expo.dev/
- React Hook Form - https://react-hook-form.com/
- Pocketbase for database / api

## Clean Installation

Download the [latest release](https://github.com/rskwiat/TECH-3620-FALL-2024/releases) from the github here, and in your terminal application run the following command 

```
$ npm install
```

Running the application, open up this folder in your terminal app of your choice (Powershell on Windows, Terminal on Mac OS).

```
$ npm start
```

## Expo Apps

Once the expo server is running it will generate a QR code. To scan the code and build the application on your device, you need to have Expo Go downloaded. *Please note it used to redirect a user to their resepctive app store to download the app.*.

- [iOS](https://apps.apple.com/us/app/expo-go/id982107779)
- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en-US&pli=1)

## Testing the application

Copy `.env.sample` to `.env`

```
$ cp .env.sample .env
```

Update the `EXPO_PUBLIC_API_URL` with our API URL found in canvas under the discussions tab.

## Deployment

We are using [EAS](https://docs.expo.dev/build/introduction/) to build and ship our application. EAS lets us bypass creating a Gradle and XCode project to help us deploy quickly. 

* You still need a paid for Apple Developer Account to deploy to the App Store.
* Google play all you need is a gmail address.

Install the EAS cli

```
$ npm install -g eas-cli
```

Login in to your expo account

```
$ eas login
```

Build the application
```
$ eas build
```

In the EAS dashboard you can find the ios and android app for testing and you can then submit via the dashboard to their respective stores.

## Application Structure

File based routing in Expo Router

https://docs.expo.dev/
https://docs.expo.dev/router/advanced/stack/

```
src // all our Javascript & React Code
  app // views & routes
    (auth)
    (posts)
    (profile)
    (social)
  _layout.jsx
  index.jsx
  +not_found.jsx
  components
    forms //all forms
    posts // user post cards UI
    Navbar
  context
  schemas
```

### _layout.jsx

All of our navigation files are based on this `_layout.jsx`. This controls the layout for all the files found in their respective folders. `_layouts` can change from view to view. 

In our application tthe root view `app/_layout.tsx` should be a stack layout loading all the main folders.

```
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
    <Stack.Screen name="(auth)" />
    <Stack.Screen name="(social)" />
    <Stack.Screen name="(posts)/index" options={{ presentation: 'modal' }} />
    <Stack.Screen name='(profile)' />
  </Stack>
```

The stack screen has a parameter called `options` where we can pass in the the type of modal to render that stack as a 'modal' on top of our application.

### (social)/_layout.tsx

Our main application, using the tabbed view, to eliminate code repetion all of our tabs are built in an array and then mapped over.

The tabs have are set with a title, iconName and tab names.

```
  {tabs.map((tab, i) => {
    return (
      <Tabs.Screen
        key={`${tab.name}-${i}`}
        name={tab.name}
        options={{
          title: tab.title,
          tabBarIcon: ({ color }) => <MaterialIcons size={ICON_SIZE} name={tab.iconName} color={color} />
        }}
      />
    );
  })}
```

### Screen Types

Stack Screen is the 'default' layout, all views are stacked on top of each other and a user can navigate back by swiping left and clicking buttons to navigate forward. 

Tab Screen is the tabbed view found in all applications, all the views are registered with buttons in the bottom row.

### Context(s)

[Context](https://www.freecodecamp.org/news/react-context-for-beginners/), allows us to have global state that we can call with a `useContext` hook across the app. The context / providers should wrap around our main application.

### Components Foldder

Anything that can be reused that was not built with React Native Paper. Forms, Card Button Groups and the custom navbar.

### Custom Nav Bar `(social)/_layout`

ScreenOptions can take a header prop as a function and we pass in all props from the header into our NavBar component. 

This replaces the navbar found in Expo-Router with our custom one from React Native Paper.

```
<Tabs
  screenOptions={{
    header: (props) => <NavBar {...props} />
  }}>
  ...
</Tabs>
```

### Custom Loading Screen

Still researching this
