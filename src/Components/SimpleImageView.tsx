import React, { useCallback, useEffect, useState } from 'react';
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
import type { ImageElementType, SimpleImageViewProps } from './types';
import {
  ActivityIndicator,
  Dimensions,
  FlatList, NativeScrollEvent, NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import ThumbnailComponent from './ThumbnailComponent';
import { styles } from './styles';

const SimpleImageView = ({
  imageUri,
  bgColor,
  images,
  viewMode,
  selectedIndex,
  perPage,
  itemMargin,
  showTitle,
  complementaryBgColor,
  showPage,
}: SimpleImageViewProps) => {
  const DeviceWidth = Dimensions.get('window').width;
  const imageSize =
    (perPage! < 4
      ? Math.round(DeviceWidth / 4)
      : Math.round(DeviceWidth / perPage!)) - itemMargin!;
  const imageBorderRadius = imageSize * 0.05;
  const tmpImgObj = { uri: '', title: '' };
  const [nowImage, setNowImage] = useState<ImageElementType>(tmpImgObj);
  const [totPage, setToTPage] = useState<number | undefined>(undefined);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [imgArray, setImgArray] = useState<ImageElementType[][]>([]);
  const [nowPage , setNowPage] = useState<number>(1);
  const startX = useSharedValue<number>(0);
  const transX = useSharedValue<number>(0);
  const startY = useSharedValue<number>(0);
  const transY = useSharedValue<number>(0);
  const scaleXY = useSharedValue<number>(1);
  const savedScale = useSharedValue<number>(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  useEffect(() => {
    if (viewMode === 'multi' && images && images?.length > 0) {
      setToTPage(Math.ceil(images?.length / perPage!));
      setNowImage(images[selectedIndex!] ?? imageUri);
    } else {
      setToTPage(1);
      setNowImage(imageUri);
    }
  }, [images, imageUri]);

  useEffect(() => {
    if (totPage && totPage > 0 && images && images?.length > 0) {
      const newArray: ImageElementType[][] = [];
      Array.from({ length: totPage }).forEach((_, index) => {
        newArray.push(
          images?.slice(perPage! * index, perPage! * index + perPage!)
        );
      });
      setImgArray(newArray);
    }
  }, [totPage]);

  useEffect(() => {
    if (!imgArray) return;
    setNowImage(tmpImgObj);
    setNowImage(images![imgIndex]);
  }, [imgIndex]);

  const transXYStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: transX.value },
        { translateY: transY.value },
        { scale: scaleXY.value },
        { rotateZ: `${(rotation.value / Math.PI) * 180}deg` },
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
    rotation.value = withSpring(0);
    savedRotation.value = 0;
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

  const rotateHandler: ComposedGesture | GestureType | undefined =
    Gesture.Rotation()
      .onUpdate((e) => {
        rotation.value = savedRotation.value + e.rotation;
      })
      .onEnd(() => {
        savedRotation.value = rotation.value;
      });

  const simultaneousHandler = Gesture.Simultaneous(
    panHandler,
    pinchHandler,
    tapHandler,
    rotateHandler
  );

  const updateNowImageIndex = (pageIndex: number, imageIndex: number) => {
    setImgIndex(pageIndex * perPage! + imageIndex);
  };

  const updateNowPage = useCallback((e:  NativeSyntheticEvent<NativeScrollEvent>) => {
    setNowPage((Math.floor(e?.nativeEvent?.contentOffset?.x / e?.nativeEvent?.layoutMeasurement?.width)??0)+1);
  },[]);

  const keyExtractor = (_: ImageElementType[], index: number) =>
    index.toString();

  const _renderItem = ({
    item,
    index,
  }: {
    item: ImageElementType[];
    index: number;
  }) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {
            width: DeviceWidth,
            backgroundColor: bgColor as string,
          },
        ]}
      >
        {item?.map((el, imageIndex) => {
          return (
            <ThumbnailComponent
              key={index + ':' + imageIndex}
              nowPage={index}
              imgIndex={imageIndex}
              imgObj={el}
              imageBorderRadius={imageBorderRadius}
              imageSize={imageSize}
              perPage={perPage!}
              borderColor={complementaryBgColor!}
              updateNowImageIndex={updateNowImageIndex}
            />
          );
        })}
      </View>
    );
  };

  return images && (imageUri?.uri || images?.length > 0) ? (
    <View style={{ flex: 1,  backgroundColor: bgColor as string }}>

      <View style={{ flex: 0.65, justifyContent: 'flex-end', alignItems: 'center', }}>
        { showTitle && nowImage?.title && nowImage?.title?.length > 0 ? (
          <Text
            style={{
              fontSize: 16,
              color: complementaryBgColor!,
            }}
          >{`${nowImage?.title}`}</Text>
        ) : null}
      </View>

      {nowImage && nowImage?.uri ? (
        <View style={{ flex: 4 }}>
          <GestureDetector gesture={simultaneousHandler}>
            <ViewGestureHandlerRootHOC
              imageUri={nowImage}
              transXYStyle={transXYStyle}
              bgColor={bgColor as string}
            />
          </GestureDetector>
        </View>
      ) : (
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size={'small'}
            color={complementaryBgColor! ?? '#FFFFFF'}
          />
        </View>
      )}

      {viewMode === 'multi' && (totPage && totPage > 0) && ( imgArray && imgArray?.length > 0) ?
        (
          <FlatList
            ListEmptyComponent={
              <ActivityIndicator size={'large'} color={complementaryBgColor!} />
            }
            style={{ flex: 0.85 }}
            windowSize={1}
            initialNumToRender={
              totPage ? (totPage >= 2 ? 2 : totPage) : undefined
            }
            keyExtractor={keyExtractor}
            data={imgArray}
            renderItem={_renderItem}
            horizontal={true}
            pagingEnabled={true}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollBegin={undefined}
            onMomentumScrollEnd={updateNowPage}
            onEndReached={undefined}
            onEndReachedThreshold={0.5}
          />
      ) : null}

      { (viewMode === 'multi' && showPage) ?
        <View style={{flex: 0.5, justifyContent : 'flex-start', alignItems : 'center' }}>
          <Text style={{color : complementaryBgColor!, fontSize : 15, fontWeight : '500' }}>{`${nowPage} / ${totPage}`}</Text>
        </View>
        :
        null
      }
    </View>
  ) : null;
};

export default SimpleImageView;
