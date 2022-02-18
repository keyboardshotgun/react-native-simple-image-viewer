한국어 | [English](./README.eng.md)

# react-native-simple-image-viewer

- react-native-reanimated, react-native-gesture-handler, react-native-modal를 사용하여 만든 이미지 모달 컴포넌트 입니다. 
- pan, pinch, rotate 제스쳐를 지원하여 이미지를 확대, 축소, 회전하여 볼 수 있습니다. 더블 탭으로 원래의 형태로 복귀 합니다.

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
![react-native](https://img.shields.io/badge/react--native-v0.67-blue)
![react-native-reanimted](https://img.shields.io/badge/react--native--reanimated--v2-v2.4.1-blue)
![react-native-gesture-handler](https://img.shields.io/badge/react--native--gesture--handle-v2.1-blue)
![react-native-modal](https://img.shields.io/badge/react--native--modal-v13.0-blue)

![preview](https://user-images.githubusercontent.com/25360777/154618048-94856a9b-37cc-4e1e-bcc7-0570bad19df7.gif)

## Installation

### with Dependencies
```sh
 npm install or yarn install react-native-modal react-native-reanimated react-native-gesture-handler
````

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
| Name   | Description |    Default     |
| :---        |:------------|:--------------:|
| Header      | Title       |  Here's this   |
| Paragraph   | Text        |    And more    |


## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
