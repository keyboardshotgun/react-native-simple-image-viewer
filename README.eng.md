[한국어](./README.md) | English

# react-native-simple-image-viewer

- Simple Image modal Component, Using react-native-reanimated, react-native-gesture-handler, react-native-modal
- Support Pan/Pinch/Rotate gesture ann D.Taps to rollback

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
![react-native](https://img.shields.io/badge/react--native-v0.67-blue)
![react-native-reanimated](https://img.shields.io/badge/react--native--reanimated--v2-v2.4.1-blue)
![react-native-gesture-handler](https://img.shields.io/badge/react--native--gesture--handle-v2.1-blue)
![react-native-modal](https://img.shields.io/badge/react--native--modal-v13.0-blue)

![preview](https://user-images.githubusercontent.com/25360777/154618048-94856a9b-37cc-4e1e-bcc7-0570bad19df7.gif)

## Installation

### with Dependencies

- npm
```sh
 npm install react-native-modal react-native-reanimated react-native-gesture-handler react-native-simple-image-viewer
````
- yarn
```sh
yarn add react-native-modal react-native-reanimated react-native-gesture-handler react-native-simple-image-viewer
```

### Android
| [Setting for react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)
1. your-project-name/babel.config.js

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ...
    ['react-native-reanimated/plugin'] //<- add to end of array
  ],
}
```

2. your-project-name/android/app/build.gradle
```gradle
   project.ext.react = [
      enableHermes: true  // <- here | clean and rebuild if changing
  ]
```

3. your-project-name/android/app/src/main/MainApplication.java
```java

   import com.facebook.react.bridge.JSIModulePackage;          // <- add
   import com.swmansion.reanimated.ReanimatedJSIModulePackage; // <- add
  ...
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  ...

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }

      @Override                                          // <- add
      protected JSIModulePackage getJSIModulePackage() { // <- add
        return new ReanimatedJSIModulePackage();         // <- add
      }                                                  // <- add

    };
  ...
```

4. Rebuild
```sh
  c:\your-project-name\android\gradlew clean
  c:\your-project-name\npx react-native run-android
```

### iOS

1. your-project-name/ios/Podfile
```
  ...
  use_react_native!(
    :path => config[:reactNativePath],
    # to enable hermes on iOS, change `false` to `true` and then install pods
    :hermes_enabled => true #<- false to true
  )

  # this is option
  # use_flipper!()
  ...
```
2. Rebuild
```sh
  c:\your-project-name\ios\pod cache clean --all
  c:\your-project-name\ios\pod deintegrate
  c:\your-project-name\ios\pod install
  c:\your-project-name\npm react-native run-ios
```


## Usage
```js
import { SimpleImageViewer } from "react-native-simple-image-viewer";
  //...
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <View style={{flex:1}}>
        <Button
          title={'show'}
          style={{width: '100%', height: 80}}
          onPress={()=>setIsVisible(prevState => !prevState)} />
        <SimpleImageViewer
          imageUri={{ uri: 'https://via.placeholder.com/2048/18A6F6' }}
          isVisible={isVisible}
        />
    </View>
  );
```

## Properties
| Name        | Parameter Type                              | Required |                 Default                  |        Description         |
|:------------|:--------------------------------------------|:--------:|:----------------------------------------:|:--------------------------:|
| isVisible   | Boolean                                     |    O     |                  false                   |                            |
| imageUri    | Object : { uri : string , title? : string } |    O     | https://via.placeholder.com/2048/18A6F6  | jsonPlaceHolder image url  |
| images?     | Array                                       |    X     |                   [ ]                    |                            |
| imageTitle? | String                                      |    X     |                    ''                    |                            |
| bgColor?    | String                                      |    X     |                 #333333                  |                            |
| onClose?    | Function : (state:boolean) => void          |    X     |                  false                   | return false when turn off |

## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
