import React, { useEffect, useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { ImageElementType, ViewGestureHandlerRootHOCProps } from './types';
import type { ImageErrorEventData, ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import ErrorComponent from './ErrorComponent';

const ViewGestureHandlerRootHOC = gestureHandlerRootHOC(
  ({ imageUri, bgColor, transXYStyle, token, tokenHeader, requestMethod }: ViewGestureHandlerRootHOCProps) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [thisImage, setThisImage] = useState<ImageElementType | undefined>(undefined);

    useEffect(()=>{
      if(imageUri?.uri)
      {
        if(token)
        {
          setThisImage(
            {
              uri : imageUri?.uri?.trim(),
              headers : {
                auth : `${tokenHeader?.trim()} ${token?.trim()}`,
                Authorization : `${tokenHeader?.trim()} ${token?.trim()}`
              },
              method : requestMethod
            }
          )
        }else{
          setThisImage(imageUri);
        }
      }
    },[imageUri])

    const onImageLoadedHandler = (e :  NativeSyntheticEvent<ImageLoadEventData>) => {
      if(isError && ( e?.nativeEvent?.source?.width >= 0) )
      {
        setIsError(false);
      }
    }

    const onImageErrorHandler = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        console.log("[SimpleImageViewer] error : " , error?.nativeEvent?.error);
        setIsError(true);
    }

    return thisImage?.uri ? (
      <Animated.View style={{ flex: 1, backgroundColor: bgColor as string }}>
        {
          (isError) ?
            <ErrorComponent transXYStyle={transXYStyle} size={'big'} />
            :
            <Animated.Image
              style={[transXYStyle, { flex: 1 }]}
              onLoad={onImageLoadedHandler}
              onError={onImageErrorHandler}
              source={thisImage as ImageElementType}
              resizeMode={'contain'}
            />
        }
      </Animated.View>
    ) : null;
  }
);

export default ViewGestureHandlerRootHOC;
