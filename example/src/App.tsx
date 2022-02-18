import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpleImageViewer } from 'react-native-simple-image-viewer';
import { useState } from 'react';

export default function App() {
  const [showHide, setShowHide] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.simpleButton}
        onPress={() => setShowHide(true)}
      >
        <Text style={styles.simpleButtonText}>{'show'}</Text>
      </TouchableOpacity>
      <SimpleImageViewer
        imageUri={{ uri: 'https://via.placeholder.com/2048/18A6F6' }}
        isVisible={showHide}
        onClose={() => setShowHide(false)}
        bgColor={'#000000'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  simpleButton: {
    backgroundColor: '#18A6F6',
    width: '100%',
    height: 80,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleButtonText: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
