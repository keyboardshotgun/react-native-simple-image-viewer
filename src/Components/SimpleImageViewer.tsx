import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import SimpleImageView from './SimpleImageView';
import type { SimpleImageViewerProps } from './types';

const SimpleImageViewer = ({
  isVisible = false,
  imageUri,
  imageTitle = '',
  images = [],
  bgColor,
}: SimpleImageViewerProps) => {
  const defaultImage = { uri: 'https://via.placeholder.com/2048/18A6F6' };
  const [thisVisible, setThisVisible] = useState<boolean>(false);

  useEffect(() => {
    setThisVisible(isVisible);
  }, [isVisible]);

  const onClose = () => {
    setThisVisible(false);
  };

  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={{ padding: 0, margin: 0 }}
      isVisible={thisVisible}
    >
      <SimpleImageView
        imageUri={imageUri?.uri ? imageUri : defaultImage}
        imageTitle={imageTitle}
        images={images}
        bgColor={bgColor ?? '#333333'}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 80,
          right: 0,
          height: 50,
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onClose}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 25 }}>{`X`}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default SimpleImageViewer;
