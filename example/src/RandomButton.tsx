import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RandomButtonProps = {
  title: string;
  min: number;
  max: number;
  onResult: (ret: number) => void;
};

const RandomButton = ({
  title,
  min = 3,
  max = 10,
  onResult,
}: RandomButtonProps) => {
  const [randomTitle, setRandomTitle] = useState<number>(min);

  const randomNumberMaker = () => {
    const randomNumber = Math.round(Math.random() * (max - min)) + min;
    setRandomTitle(randomNumber);
    onResult(randomNumber);
  };

  return (
    <View
      style={{
        width: '100%',
        height: 80,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: '80%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>{`${title}`}</Text>
        <Text style={{ fontSize: 16 }}>{`(Min ${min}, Max ${max})`}</Text>
      </View>
      <View
        style={{
          width: '20%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={randomNumberMaker}
          style={{
            backgroundColor: '#181800',
            borderRadius: 10,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ fontSize: 20, color: '#FFFFFF' }}
          >{`${randomTitle}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RandomButton;
