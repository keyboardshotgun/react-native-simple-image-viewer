import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import type { ThumbnailComponentProps } from './types';

const ThumbnailComponent = ({
  imgIndex,
  updateNowImageIndex,
  imageSize,
  imageBorderRadius,
  imgObj,
  nowPage,
  perPage,
  borderColor,
}: ThumbnailComponentProps) => {
  const updateIndex = () => {
    if (updateNowImageIndex) {
      if (nowPage >= 0 && imgIndex >= 0) updateNowImageIndex(nowPage, imgIndex);
    }
  };

  return imgObj?.uri ? (
    <TouchableOpacity
      onPress={updateIndex}
      key={nowPage + ':' + imgIndex}
      style={[
        styles.thumbnailBorder,
        {
          width: imageSize,
          height: imageSize,
          borderRadius: imageBorderRadius,
          borderColor: borderColor ?? '#FFFF00',
          marginLeft: imgIndex % perPage === 1 ? 10 : 0,
          marginRight: imgIndex % perPage === 0 ? 0 : 10,
        },
      ]}
    >
      <Image
        source={imgObj}
        style={{ flex: 1, borderRadius: imageBorderRadius }}
        resizeMode={'cover'}
      />
    </TouchableOpacity>
  ) : null;
};

export default ThumbnailComponent;
