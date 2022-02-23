import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  const [viewMode, setViewMode] = useState<'single' | 'multi'>('single');

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

  const updateViewMode = (value: number) =>{
      setViewMode(value === 0 ? 'single' : 'multi');
  }

  const updateTotItem = (value: number) => {
    setTotItems(value);
  };

  const updateItemPerPage = (value: number) => {
    setItemPerPage(value);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <View style={{height : 160, backgroundColor : "#EEEEEE", width: '100%', marginBottom : 50, borderRadius : 10, justifyContent : 'center', alignItems : 'center'}}>
          <Text style={{fontSize : 20, lineHeight : 60, color : "#333333" }}>{`react-native-simple-image-viewer`}</Text>
          <View style={{padding : 15, backgroundColor : "#FFFFFF", width: '90%', borderRadius : 10}}>
            <Text style={{fontSize : 14, lineHeight : 20, color : "#555555"}}>{`- Pan, Pinch, Rotate gestures`}</Text>
            <Text style={{fontSize : 14, lineHeight : 20, color : "#555555"}}>{`- Double tap to rollback`}</Text>
          </View>
        </View>

        <RandomButton
          title={'ViewMode'}
          min={0}
          max={0}
          onResult={updateViewMode}
        />

        { viewMode === 'multi' ?
          <>
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
          </>
          :
          null
        }

        <TouchableOpacity
          style={styles.simpleButton}
          onPress={() => setShowHide(true)}>
          <Text style={styles.simpleButtonText}>{'Open Modal'}</Text>
        </TouchableOpacity>

        <SimpleImageViewer
          viewMode={viewMode}
          perPage={itemsPerPage}
          imageUri={defaultImage}
          images={defaultImages}
          isVisible={showHide}
          onClose={() => setShowHide(false)}
          bgColor={'#333333'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 15,
  },
  simpleButton: {
    backgroundColor: '#18A6F6',
    width: '100%',
    height: 50,
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
