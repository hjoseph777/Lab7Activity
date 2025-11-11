import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

export default function App() {
  // These control our animation state
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);

  // This combines all our animations into one style object
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
        { translateX: translateX.value }
      ],
      opacity: opacity.value,
    };
  });

  // Animation functions - each does something different
  const handleScale = () => {
    scale.value = withSpring(scale.value === 1 ? 1.5 : 1);
  };

  const handleRotate = () => {
    rotation.value = withTiming(rotation.value + 180, { duration: 500 });
  };

  const handleSlide = () => {
    translateX.value = withSpring(translateX.value === 0 ? 100 : 0);
  };

  const handleFade = () => {
    opacity.value = withTiming(opacity.value === 1 ? 0.3 : 1, { duration: 300 });
  };

  // Brings everything back to normal
  const resetAnimations = () => {
    scale.value = withSpring(1);
    rotation.value = withTiming(0);
    translateX.value = withSpring(0);
    opacity.value = withTiming(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Reanimated Demo</Text>
      
      {/* This is our animated element */}
      <Animated.View style={[styles.animatedBox, animatedStyle]}>
        <Text style={styles.boxText}>Animated Box</Text>
      </Animated.View>

      {/* Control buttons laid out in a grid */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleScale}>
          <Text style={styles.buttonText}>Scale</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRotate}>
          <Text style={styles.buttonText}>Rotate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSlide}>
          <Text style={styles.buttonText}>Slide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFade}>
          <Text style={styles.buttonText}>Fade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetAnimations}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  animatedBox: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF', // iOS blue
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10, // Modern gap property works great
  },
  button: {
    backgroundColor: '#34C759', // Green buttons
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  resetButton: {
    backgroundColor: '#FF3B30', // Red for reset - stands out
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Consider adding more animation types in future versions
});