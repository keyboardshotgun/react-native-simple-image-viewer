[한국어](./README.ko-KR.md) | English

# react-native-simple-image-viewer
![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
![react-native](https://img.shields.io/badge/react--native-v0.67-blue)
![react-native-reanimted](https://img.shields.io/badge/react--native--reanimated--v2-v2.4.1-blue)
![react-native-gesture-handler](https://img.shields.io/badge/react--native--gesture--handle-v2.1-blue)
![react-native-modal](https://img.shields.io/badge/react--native--modal-v13.0-blue)


```warning
The iOS examples do not work because old version.
It will be fixed soon.
```
## Before Installation

This project depend on these fantastic projects

```js
  react-native-reanimated
  react-native-gesture-handler
  react-native-modal
```

## Installation

```sh
npm install react-native-simple-image-viewer
```

Now we need to install [`react-native-gesture-handler`](https://github.com/kmagiera/react-native-gesture-handler) and [`react-native-reanimated(>=2.0.0)`](https://github.com/kmagiera/react-native-reanimated).

## Usage

- Support Pan or Pinch Image
- Double Taps to rollback origin image size
- Small previewing navigation for images.

```js
import { SimpleImageViewer } from "react-native-simple-image-viewer";
const MyImageView = (isVisible : boolean) => {
  //...
  return (
    <SimpleImageViewer
      imageUri={{ uri: 'https://via.placeholder.com/2048/18A6F6' }}
      isVisible={true}
    />
  )
}
```

## Properties
| Name   | Description | Default |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |


## Dependence

Depend on 
- react-native-modal ^13.X : https://github.com/react-native-modal/react-native-modal
- react-native-reanimated ^2.X : https://github.com/software-mansion/react-native-reanimated
- react-native-gesture-handler ^2.X : https://github.com/software-mansion/react-native-gesture-handler

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
