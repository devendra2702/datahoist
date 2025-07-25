import { Text, View, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function AboutScreen() {

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      subscription.remove();
    };
  }, []);

  const isSmallScreen = screenWidth < 768; // Example breakpoint

  return (
    <View>
      {isSmallScreen ? (
        <Text>This content is visible on small screens.</Text>
      ) : (
        <Text>This content is visible on large screens.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
