# TECH-3620-FALL-2024

- https://reactnativepaper.com/
- https://docs.expo.dev/

Running the application, open up this folder in your terminal app of your choice (Powershell on Windows, Terminal on Mac OS).

```
$ npm start
```

Once

## Expo Apps

Once the expo server is running it will generate a QR code. To scan the code and build the application on your device, you need to have Expo Go downloaded. *Please note it used to redirect a user to their resepctive app store to download the app.*.

iOS -https://apps.apple.com/us/app/expo-go/id982107779
Android - https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en-US&pli=1

## Testing the application

The `BASE_URL` in `lib/pocketbase.ts` is missing to protect our datadabase. The URL can be found in canvas under class discussions.
