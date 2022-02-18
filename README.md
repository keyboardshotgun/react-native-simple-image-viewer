# react-native-simple-image-viewer

iOS example not working now, create project base outdated.

---
Welcome to react-native-simple-image-viewer github.

Simple Image View Modal Component for React Native using These fantastic modules.

- react-native-modal ^13.X
- react-native-reanimated ^2.X
- react-native-gesture-handler ^2.X

---

### Features

- Working like a charm
- Support Pan or Pinch Image
- Double Taps to rollback origin image size
- small previewing navigation for images.

## Installation

```sh
npm install react-native-simple-image-viewer
```

## Before you install
First, you need to some steps. both Android and iOS
```js
  react-native-reanimated
  react-native-gesture-handler
  react-native-modal
```

## Usage

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
