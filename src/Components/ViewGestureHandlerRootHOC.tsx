import React, { useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { ViewGestureHandlerRootHOCProps } from './types';
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import ErrorComponent from './ErrorComponent';

const ViewGestureHandlerRootHOC = gestureHandlerRootHOC(
  ({ imageUri, bgColor, transXYStyle }: ViewGestureHandlerRootHOCProps) => {
    const [isError, setIsError] = useState<boolean>(false);

    const onImageLoadedHandler = (e :  NativeSyntheticEvent<ImageLoadEventData>) => {
      if(isError && ( e?.nativeEvent?.source?.width >= 0) )
      {
        setIsError(false);
      }
    }

    const onImageErrorHandler = () => {
        setIsError(true);
    }

    return imageUri ? (
      <Animated.View style={{ flex: 1, backgroundColor: bgColor as string }}>
        {
          (isError) ?
            <ErrorComponent transXYStyle={transXYStyle} size={'big'} />
            :
            <Animated.Image
              onLoad={onImageLoadedHandler}
              onError={onImageErrorHandler}
              style={[transXYStyle, { flex: 1 }]}
              source={{ uri: imageUri?.uri }}
              resizeMode={'contain'}
            />
        }
      </Animated.View>
    ) : null;
  }
);

export default ViewGestureHandlerRootHOC;
