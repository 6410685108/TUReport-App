import React from 'react';
import { View, Text } from 'react-native';

const Screen2 = ({ navigation }) => {
  // Customize navigation options for Screen2
//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       // Hide the back button
//       headerLeft: () => null,
//     });
//   }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 2</Text>
    </View>
  );
};

export default Screen2;
