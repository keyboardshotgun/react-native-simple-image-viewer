import React, { useEffect, useState } from 'react';
import {  TouchableOpacity  } from 'react-native';
import { styles } from './styles';
import type { ImageElementType, ThumbnailComponentProps } from './types';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import ErrorComponent from './ErrorComponent';

const ThumbnailComponent = ({
  imgIndex,
  updateNowImageIndex,
  imageSize,
  imageBorderRadius,
  imgObj,
  nowPage,
  perPage,
  borderColor,
  token,
  tokenHeader,
  requestMethod
}: ThumbnailComponentProps) => {

  const [isError, setIsError] = useState<boolean>(false);
  const [thisImage, setThisImage] = useState<ImageElementType | undefined>(undefined);

  useEffect(()=>{
    if(imgObj?.uri)
    {
      if(token)
      {
        setThisImage(
          {
            uri : imgObj.uri,
            headers : {
              Authorization : `${tokenHeader} ${token}`
            },
            method : requestMethod
          }
        )
      }else{
        setThisImage(imgObj);
      }
    }
  },[imgObj])

  const updateIndex = () => {
    if (updateNowImageIndex) {
      if (nowPage >= 0 && imgIndex >= 0) updateNowImageIndex(nowPage, imgIndex);
    }
  };

  const imageLoadedHandler = (e:  OnLoadEvent) => {
    if(isError && ( e?.nativeEvent?.width >= 0  || e?.nativeEvent?.height >= 0 ) )
    {
      setIsError(false);
    }
  }

  const imageErrorHandler = () => {
    setIsError(true);
  }

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
      {
        (isError) ?
          <ErrorComponent size={'small'} />
          :
          <FastImage
            fallback={true}
            source={thisImage as ImageElementType}
            removeClippedSubviews={true}
            onLoad={imageLoadedHandler}
            onError={imageErrorHandler}
            style={{ flex: 1, borderRadius: imageBorderRadius }}
            resizeMode={'cover'}
          />
      }
    </TouchableOpacity>
  ) : null;
};

export default ThumbnailComponent;
