import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import SimpleImageView from './SimpleImageView';
import type { SimpleImageViewerProps } from './types';
import CloseButton from './CloseButton';
import { styles } from './styles';
import { getComplementaryColor } from './Utils';

const SimpleImageViewer = ({
  isVisible = false,
  imageUri,
  images = [],
  onClose,
  bgColor = '#333333',
  viewMode = 'multi',
  showTitle = false,
  selectedIndex = 0,
  perPage = 3,
  leftHanded = false,
}: SimpleImageViewerProps) => {

  const [complementaryBgColor,] = useState<string>(getComplementaryColor(bgColor!))
  const [thisVisible, setThisVisible] = useState<boolean>(false);

  useEffect(() => {
    setThisVisible(isVisible);
  }, [isVisible]);

  const closeModal = () => {
    setThisVisible(false);
    if (onClose) onClose(false);
  };

  return (
    <Modal
      isVisible={thisVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={[styles.modal, { backgroundColor : bgColor! }]}>
      <SimpleImageView
        viewMode={viewMode}
        perPage={perPage}
        selectedIndex={selectedIndex}
        imageUri={imageUri}
        images={images}
        showTitle={showTitle}
        bgColor={bgColor}
        complementaryBgColor={complementaryBgColor}
      />
      <CloseButton
        handed={leftHanded}
        onClose={closeModal}
        closeButtonColor={complementaryBgColor}
      />
    </Modal>
  );
};

export default SimpleImageViewer;
