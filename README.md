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
