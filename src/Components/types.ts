import type { AnimatedStyleProp } from 'react-native-reanimated';
import type { ImageStyle } from 'react-native';

export type SimpleImageViewProps = Omit<SimpleImageViewerProps, 'isVisible'>;

export type ImageElementType = {
  uri: string;
  title?: string;
};

export type SimpleImageViewerProps = {
  isVisible: boolean;
  imageUri: ImageElementType;
  images?: ImageElementType[] | [];
  imageTitle?: string | undefined | null;
  bgColor?: string | undefined | null;
};

export type ViewGestureHandlerRootHOCProps = {
  transXYStyle: AnimatedStyleProp<ImageStyle>;
  imageUri: SimpleImageViewerProps['imageUri'];
  bgColor?: SimpleImageViewerProps['bgColor'];
};
