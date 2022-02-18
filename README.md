# react-native-simple-image-viewer

```warning
iOS example not working now, create project base outdated.
```
## Before you install

First, you need to some steps. both Android and iOS

```js
  react-native-reanimated
  react-native-gesture-handler
  react-native-modal
```

## Installation

```sh
npm install react-native-simple-image-viewer
```

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
