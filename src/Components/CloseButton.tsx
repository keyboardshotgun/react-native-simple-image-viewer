import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type CloseButtonProps = {
  onClose: () => void;
  closeButtonColor: string;
  handed: boolean;
};

const CloseButton = ({
  handed,
  onClose,
  closeButtonColor,
}: CloseButtonProps) => {
  const onCloseHandler = () => {
    if (onClose) onClose();
  };
  return (
    <TouchableOpacity style={ handed ? styles.closeBtnLeftHand : styles.closeBtn } onPress={onCloseHandler}>
      <Text style={{ color: closeButtonColor ?? '#FFFFFF', fontSize: 30 }}>{`✕`}</Text>
    </TouchableOpacity>
  );
};

export default CloseButton;
