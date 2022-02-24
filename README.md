 한국어 | [English](./README.eng.md)

# react-native-simple-image-viewer

- 간단한 이미지 모달 컴포넌트 입니다.
- react-native-reanimated, react-native-gesture-handler, react-native-modal, react-native-fast-image를 사용하여 구현 하였습니다.
- pan, pinch, rotate 제스쳐를 지원하여 이미지를 확대, 축소, 회전하여 볼 수 있습니다.
- 더블 탭으로 기본크기로 복귀 합니다.

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
![react-native](https://img.shields.io/badge/react--native-v0.67-blue)
![react-native-reanimated](https://img.shields.io/badge/react--native--reanimated--v2-v2.4.1-blue)
![react-native-gesture-handler](https://img.shields.io/badge/react--native--gesture--handle-v2.1-blue)
![react-native-modal](https://img.shields.io/badge/react--native--modal-v13.0-blue)
![react-native-fast-image](https://img.shields.io/badge/react--native--fast--image-v8.5.11-blue)

single image

![preview_single_1](https://user-images.githubusercontent.com/25360777/154618048-94856a9b-37cc-4e1e-bcc7-0570bad19df7.gif)

---
multiple images

![preview_multi_3](https://user-images.githubusercontent.com/25360777/155094957-c0cd7866-376e-43b7-88ee-411cfd3f48af.gif)
![preview_multi_1](https://user-images.githubusercontent.com/25360777/155094485-0ea65b0a-63b1-4399-a8a4-0decd6969ddb.gif)
![preview_multi_2](https://user-images.githubusercontent.com/25360777/155094684-b39ad79e-61de-4e99-8afb-a5e828b06bea.gif)
![error_component](https://user-images.githubusercontent.com/25360777/155249176-68793dcf-7d32-4344-bdd5-1fb5d7289f81.gif)

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
    ['react-native-reanimated/plugin'] //<- add, end of array
  ],
}
```

2. your-project-name/android/app/build.gradle
```gradle
   project.ext.react = [
      enableHermes: true  // <- false to true
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
  X:\your-project-name\android\gradlew clean
  X:\your-project-name\npx react-native run-android
```

### iOS

1. your-project-name/ios/Podfile
```
  ...
  use_react_native!(
    :path => config[:reactNativePath],
    # to enable hermes on iOS, change `false` to `true` and then install pods
    :hermes_enabled => true # <- false to true
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

### Optional
- Some images are displayed only on iOS ?
- an error such as out of memory or pool hard cap violation
```java
AndroidManifest.xml

<application
      android:name=".MainApplication"
      ...
      android:largeHeap="true" <-- add
      ...>
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
| Name          | Parameter Type                              | Required |                 Default                 |                 Description                  |
|:--------------|:--------------------------------------------|:--------:|:---------------------------------------:|:--------------------------------------------:|
| isVisible     | Boolean                                     |    O     |                  false                  |              show / hide modal               |
| imageUri      | Object : { uri : string , title? : string } |    O     | https://via.placeholder.com/2048/18A6F6 |          jsonPlaceHolder image url           |
| images?       | Array                                       |    X     |                   [ ]                   |              Array of imageUri               |
| bgColor?      | String                                      |    X     |                 #333333                 |                                              |
| onClose?      | Function : (state:boolean) => void          |    X     |                  false                  |          return false when turn off          |
| viewMode      | 'single','multi'                            |    X     |                'single'                 |                                              |
| perPage       | number                                      |    X     |                    3                    |                                              |
| naviPosition  | 'top', 'bottom'                             |    X     |                    -                    |             working in progress              |
| leftHanded    | boolean                                     |    X     |                  false                  |         close-button position change         |
| selectedIndex | number                                      |    X     |                    0                    |  Selected array of imageUri object's index   |
| showTitle     | boolean                                     |    X     |                  false                  |  Show/Hide Selected imageUri object's title  |
| itemMargin    | number                                      |    X     |                   15                    |         margin between items of list         |
| showPage      | boolean                                     |    X     |                  false                  | Show/Hide page current and total page number |
| token         | string                                      |    X     |                    -                    |            string token like jwt             |
| tokenHeader   | string                                      |    X     |                'Bearer'                 |     string token header like jwt header      |
| requestMethod | string                                      |    X     |                  'GET'                  |                                              |

## Changelog
### 0.4
+ Added properties for secured-image like needed jwt. request header is automatically generated if token property existed.

### 0.3.2
+ fixed minor errors

### 0.3.1
+ Added current / total page info
+ new property (showPage,itemMargin,leftHanded)
+ fixed almost minor errors
+ Added new option component for example

### 0.2.3
+ fixed ErrorComponent

### 0.2.1
+ Added react-native-fast-image dependency for list performance.
+ When image not found or error, show Alternative component.

### 0.2.0
+ Added horizontal scroll list bar for multi-image support
+ A complementary color for the close-button background and item border are automatically generated by the background color.
+ The item size of the list is automatically changed according to "perPage" props.
+ Example update.

---
## known issues
+ The Item of list component show slow or laggy when open modal.
---

## Contributing
See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
