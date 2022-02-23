import React from 'react';
import { ImageStyle, Text } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';

type ErrorComponentProps = {
  transXYStyle? : AnimatedStyleProp<ImageStyle>;
  size : 'small' | 'big';
}

const ErrorComponent = ({ transXYStyle, size = 'big' } : ErrorComponentProps ) => {
  return (
    <Animated.View style={[transXYStyle, { flex: 1, backgroundColor : "#FFFFFF", justifyContent : 'center', alignItems : 'center'}]}>
      <Text
        allowFontScaling={false}
        adjustsFontSizeToFit={true}
        style={{fontSize : size === 'big' ? 60 : 25, color : '#BBBBBB'}}>{`✖︎`}</Text>
      { (size === 'big') ?
        <Text style={{fontSize :14, color : '#CCCCCC'}}>{`Not Found`}</Text>
        :
        null
      }
    </Animated.View>
  )
};

export default ErrorComponent
