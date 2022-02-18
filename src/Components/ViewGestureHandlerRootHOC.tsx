import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { ViewGestureHandlerRootHOCProps } from './types';

const ViewGestureHandlerRootHOC = gestureHandlerRootHOC(
  ({ imageUri, bgColor, transXYStyle }: ViewGestureHandlerRootHOCProps) => {
    return imageUri ? (
      <Animated.View style={{ flex: 1, backgroundColor: bgColor as string }}>
        <Animated.Image
          style={[transXYStyle, { flex: 1 }]}
          source={{ uri: imageUri?.uri }}
          resizeMode={'contain'}
        />
      </Animated.View>
    ) : null;
  }
);

export default ViewGestureHandlerRootHOC;
