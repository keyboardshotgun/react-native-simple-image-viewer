import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpleImageViewer } from 'react-native-simple-image-viewer';
import { useCallback, useEffect, useState } from 'react';
import RandomButton from './RandomButton';

const setBg = (index: number) => {
  return Math.floor(Math.random() * 16777200 + index).toString(16);
};

const defaultImage = { uri: 'https://via.placeholder.com/2048/18A6F6' };

export default function App() {
  const MIN_NUMBER = 10;
  const [showHide, setShowHide] = useState<boolean>(false);
  const [totItems, setTotItems] = useState<number>(10);
  const [itemsPerPage, setItemPerPage] = useState<number>(3);
  const [defaultImages, setDefaultImages] = useState<
    { uri: string; title: string }[]
  >([]);

  useEffect(() => {
    const newArray = arrayMaker(totItems);
    setDefaultImages(newArray);
  }, [totItems]);

  const arrayMaker = useCallback((arrayLength: number) => {
    return Array.from({ length: arrayLength }).map((_, index) => {
      return {
        uri: 'https://via.placeholder.com/2048/' + setBg(index),
        title: 'index-' + index,
      };
    });
  },[]);

  const updateTotItem = (value: number) => {
    setTotItems(value);
  };

  const updateItemPerPage = (value: number) => {
    setItemPerPage(value);
  };

  return (
    <View style={styles.container}>
      <RandomButton
        title={'Total count of items'}
        min={MIN_NUMBER}
        max={100}
        onResult={updateTotItem}
      />

      <RandomButton
        title={'Items per page'}
        min={3}
        max={MIN_NUMBER}
        onResult={updateItemPerPage}
      />
      <TouchableOpacity
        style={styles.simpleButton}
        onPress={() => setShowHide(true)}
      >
        <Text style={styles.simpleButtonText}>{'Show me the Modal'}</Text>
      </TouchableOpacity>
      <SimpleImageViewer
        perPage={itemsPerPage}
        imageUri={defaultImage}
        images={defaultImages}
        isVisible={showHide}
        onClose={() => setShowHide(false)}
        bgColor={'#FFFFFF'}
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
