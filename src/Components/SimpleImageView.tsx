import React from 'react';
import {
  ComposedGesture,
  Gesture,
  GestureDetector,
  GestureType,
} from 'react-native-gesture-handler';
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import ViewGestureHandlerRootHOC from './ViewGestureHandlerRootHOC';

import type { SimpleImageViewProps } from './types';
const SimpleImageView = ({ imageUri, bgColor }: SimpleImageViewProps) => {
  const startX = useSharedValue<number>(0);
  const transX = useSharedValue<number>(0);
  const startY = useSharedValue<number>(0);
  const transY = useSharedValue<number>(0);
  const scaleXY = useSharedValue<number>(1);
  const savedScale = useSharedValue<number>(1);

  const transXYStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transX.value },
        { translateY: transY.value },
        { scale: scaleXY.value },
      ],
    };
  }, []);

  const scaleAnimation = () => {
    'worklet';
    cancelAnimation(scaleXY);
    cancelAnimation(startX);
    cancelAnimation(startY);
    savedScale.value = 1;
    startX.value = 0;
    startY.value = 0;
    scaleXY.value = withSpring(1);
    transX.value = withSpring(0);
    transY.value = withSpring(0);
  };

  const panHandler: ComposedGesture | GestureType | undefined = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      transX.value = startX.value;
      transY.value = startY.value;
    })
    .onUpdate((event) => {
      transX.value = event.translationX + startX.value;
      transY.value = event.translationY + startY.value;
    })
    .onEnd(() => {
      startX.value = transX.value;
      startY.value = transY.value;
    });

  const pinchHandler = Gesture.Pinch()
    .onUpdate((e) => {
      scaleXY.value = savedScale.value * (e.scale > 0 ? e.scale : 1);
    })
    .onEnd(() => {
      savedScale.value = scaleXY.value > 0 ? scaleXY.value : 1;
    });

  const tapHandler: ComposedGesture | GestureType | undefined = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(300)
    .onEnd(scaleAnimation);

  const simultaneousHandler = Gesture.Simultaneous(
    panHandler,
    pinchHandler,
    tapHandler
  );

  return imageUri?.uri ? (
    <GestureDetector gesture={simultaneousHandler}>
      <ViewGestureHandlerRootHOC
        imageUri={imageUri}
        transXYStyle={transXYStyle}
        bgColor={bgColor as string}
      />
    </GestureDetector>
  ) : null;
};

export default SimpleImageView;
