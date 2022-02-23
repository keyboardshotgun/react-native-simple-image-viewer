[한국어](./README.md) | English

# react-native-simple-image-viewer

- Simple Image modal Component.
- Using react-native-reanimated, react-native-gesture-handler, react-native-modal and react-native-fast-image dependencies.
- Support Pan / Pinch / Rotate gesture. 
- Double Tap to default size.

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
![react-native](https://img.shields.io/badge/react--native-v0.67-blue)
![react-native-reanimated](https://img.shields.io/badge/react--native--reanimated--v2-v2.4.1-blue)
![react-native-gesture-handler](https://img.shields.io/badge/react--native--gesture--handle-v2.1-blue)
![react-native-modal](https://img.shields.io/badge/react--native--modal-v13.0-blue)

Single image

![preview_single_1](https://user-images.githubusercontent.com/25360777/154618048-94856a9b-37cc-4e1e-bcc7-0570bad19df7.gif)

---
Multiple images

![preview_multi_3](https://user-images.githubusercontent.com/25360777/155094957-c0cd7866-376e-43b7-88ee-411cfd3f48af.gif)
![preview_multi_1](https://user-images.githubusercontent.com/25360777/155094485-0ea65b0a-63b1-4399-a8a4-0decd6969ddb.gif)
![preview_multi_2](https://user-images.githubusercontent.com/25360777/155094684-b39ad79e-61de-4e99-8afb-a5e828b06bea.gif)
![error_component](https://user-images.githubusercontent.com/25360777/155249176-68793dcf-7d32-4344-bdd5-1fb5d7289f81.gif)

## Installation

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
### single image
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
### multiple images
```js
      <SimpleImageViewer
        perPage={itemsPerPage}
        imageUri={defaultImage}
        images={defaultImages}
        isVisible={showHide}
        onClose={() => setShowHide(false)}
        bgColor={'#333333'}
      />
```

## Properties
| Name           | Parameter Type                              | Required |                 Default                 |                Description                |
|:---------------|:--------------------------------------------|:--------:|:---------------------------------------:|:-----------------------------------------:|
| isVisible      | Boolean                                     |    O     |                  false                  |             show / hide modal             |
| imageUri       | Object : { uri : string , title? : string } |    O     | https://via.placeholder.com/2048/18A6F6 |         jsonPlaceHolder image url         |
| images?        | Array                                       |    X     |                   [ ]                   |             Array of imageUri             |
| bgColor?       | String                                      |    X     |                 #333333                 |                                           |
| onClose?       | Function : (state:boolean) => void          |    X     |                  false                  |        return false when turn off         |
| viewMode       | 'single','multi'                            |    X     |                'single'                 |                                           |
| perPage        | number                                      |    X     |                    3                    |                                           |
| itemMargin     | number                                      |    X     |                  auto                   |                                           |
| naviPosition   | 'top', 'bottom'                             |    X     |                                         |                                           |
| leftHanded     | boolean                                     |    X     |                  false                  |                                           |
| selectedIndex  | number                                      |    X     |                    0                    | Selected array of imageUri object's index |
| showTitle      | boolean                                     |    X     |                  false                  |    Show selected imageUri object's title  |


## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
