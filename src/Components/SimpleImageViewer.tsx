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
  itemMargin = 15,
  leftHanded = false,
  showPage = false,
  token,
  tokenHeader = 'Bearer',
  requestMethod = 'GET'
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
      statusBarTranslucent={true}
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
          showPage={showPage}
          itemMargin={itemMargin}
          token={token}
          tokenHeader={tokenHeader}
          requestMethod={requestMethod}
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
