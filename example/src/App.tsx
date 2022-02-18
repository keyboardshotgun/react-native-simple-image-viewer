import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SimpleImageViewer } from 'react-native-simple-image-viewer';

export default function App() {
  return (
    <View style={styles.container}>
      <SimpleImageViewer
        imageUri={{ uri: 'https://via.placeholder.com/2048/18A6F6' }}
        isVisible={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
