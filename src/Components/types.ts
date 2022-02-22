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
  selectedIndex?: number;
  images?: ImageElementType[] | [];
  showTitle?: boolean;
  bgColor?: string | undefined | null;
  complementaryBgColor?: string | undefined | null;
  onClose?: (state: boolean) => void;
  viewMode?: 'single' | 'multi';
  perPage?: number;
  itemMargin?: number;
  naviPosition?: 'top' | 'bottom';
  leftHanded?: boolean;
};

export type ViewGestureHandlerRootHOCProps = {
  transXYStyle: AnimatedStyleProp<ImageStyle>;
  imageUri: SimpleImageViewerProps['imageUri'];
  bgColor?: SimpleImageViewerProps['bgColor'];
};

export type ThumbnailComponentProps = {
  imgIndex: number;
  nowPage: number;
  updateNowImageIndex: (nowPage: number, ImgIndex: number) => void;
  imageSize: number;
  imageBorderRadius: number;
  imgObj: ImageElementType;
  perPage: number;
  borderColor: string;
};
