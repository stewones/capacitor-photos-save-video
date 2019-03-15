# capacitor-photos-save-video

## steps

- git clone this repo
- npm install
- clone the PR (https://github.com/ionic-team/capacitor/pull/1125)
- npm install in `core` folder
- npm run build in `core` folder
- npm link in `core` folder
- back to this project and issue `npm link @capacitor/core`
- change the paths located at `ios/App/Podfile`
- cd ios/App/Podfile and issue `pod install`
- back to the root of this project and issue `ionic cap run ios`

then you're set to go. relevant code is located at `src/app/home`

## Android local build for capacitor

In App's build.gradle change `implementation project(':capacitor-android')` to `implementation project(':capacitor-androide')`

In capacitor.settings.gradle change

```
include ':capacitor-android'
project(':capacitor-android').projectDir = new File('../node_modules/@capacitor/android/capacitor')
```

to

```
include ':capacitor-androide'
project(':capacitor-androide').projectDir = new File('/path/to/root/of/local-capacitor-copy/android/capacitor')
```

You can use any other name instead of `:capacitor-androide` as long as it matches in both files, but change it as gradle doesn't handle well the patch change if you don't change the name, sometimes it works, sometimes it doesn't, but changing the name it always works.
