import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RandomButtonProps = {
  title: string;
  min: number;
  max: number;
  onResult: (ret: number) => void;
  onOffTitle? : boolean;
};

const RandomButton = ({
  title,
  min = 3,
  max = 10,
  onResult,
  onOffTitle = false,
}: RandomButtonProps) => {
  const [randomTitle, setRandomTitle] = useState<number>(min);

  useEffect(()=>{
    onResult(randomTitle);
  },[randomTitle])

  const randomNumberMaker = () => {
    if(min && max){
      const randomNumber = Math.round(Math.random() * (max - min)) + min;
      setRandomTitle(randomNumber);
    }else{
      setRandomTitle(prevState => (prevState === 0) ? 1 : 0);
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderTopWidth : StyleSheet.hairlineWidth,
        borderColor : "#999999",
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
        <Text style={{ fontSize: 18 }}>{`${title}`}</Text>
        { (min && max) ?
          <Text style={{ fontSize: 12 }}>{`(Min ${min}, Max ${max})`}</Text>
          :
          null
        }
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
          }}>
          { (min && max) ?
            <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{`${randomTitle}`}</Text>
            :
            <Text style={{ fontSize: 12, color: '#FFFFFF' }}>
              { onOffTitle ?
                `${randomTitle === 0 ? 'Off' : 'On'}`
                :
                `${randomTitle === 0 ? 'Single' : 'Multi'}`
              }
            </Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RandomButton;
