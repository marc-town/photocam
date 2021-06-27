import React from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HOME } from 'src/config/screens';

export const TimeLineScreen = () => {
  const title = 'TimeLineScreen';
  const { navigate } = useNavigation();
  return (
    <View>
      <Text>{title}</Text>
      <Button
        title="ホーム画面"
        onPress={() => {
          navigate(HOME);
        }}
      />
    </View>
  );
};