import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

export default function HomeScreen() {
  // Main state values for all our animations - keeps everything organized in one place
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const borderRadius = useSharedValue(50);
  const backgroundColor = useSharedValue('#3498db');

  // This handles all the visual changes - pretty neat how it combines everything
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${rotation.value * 180}deg` },
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
      opacity: opacity.value,
      backgroundColor: backgroundColor.value,
      borderRadius: borderRadius.value,
    };
  });

  // First button - spins the shape and plays with transparency
  const handleAnimation1 = () => {
    rotation.value = withSpring(rotation.value + 2); // Two full spins
    opacity.value = withTiming(Math.random() > 0.5 ? 0.3 : 1, { duration: 1000 });
  };

  // Second one does scaling and random color changes - always fun to watch
  const handleAnimation2 = () => {
    scale.value = withSpring(Math.random() * 1.5 + 0.5); 
    const colors = ['#e74c3c', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#1abc9c'];
    backgroundColor.value = withTiming(colors[Math.floor(Math.random() * colors.length)], { duration: 500 });
  };

  // Position changes and shape morphing - this one's quite cool
  const handleAnimation3 = () => {
    translateX.value = withSpring(Math.random() * 100 - 50);
    translateY.value = withSpring(Math.random() * 100 - 50);
    borderRadius.value = withTiming(Math.random() * 50, { duration: 800 });
  };

  // Last button does a full reset then goes crazy with effects
  const handleAnimation4 = () => {
    // Back to square one first
    rotation.value = withSpring(0);
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    borderRadius.value = withTiming(50);
    backgroundColor.value = withTiming('#3498db');
    
    // Then we add some flair after a tiny delay
    setTimeout(() => {
      rotation.value = withSpring(4); 
      scale.value = withSpring(1.5);
      opacity.value = withTiming(0.5);
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* Our animated shape - this is where the magic happens */}
      <Animated.View style={[styles.shape, animatedStyle]} />
      
      {/* Control buttons for different effects */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.button1]} onPress={handleAnimation1}>
          <Text style={styles.buttonText}>Rotation</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.button2]} onPress={handleAnimation2}>
          <Text style={styles.buttonText}>Scale & Color</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.button3]} onPress={handleAnimation3}>
          <Text style={styles.buttonText}>Position</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.button4]} onPress={handleAnimation4}>
          <Text style={styles.buttonText}>Reset & Combo</Text>
        </TouchableOpacity>
      </View>

      {/* Info section - helps users understand what's happening */}
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>React Native Animation Lab</Text>
        <Text style={styles.subtitleText}>Interactive Animation Showcase</Text>
        <Text style={styles.descriptionText}>
          Tap the buttons above to see different animation effects applied to the shape. 
          This demonstrates React Native Reanimated capabilities.
        </Text>
        
        {/* Quick reference guide for the animations */}
        <View style={styles.animationInfoContainer}>
          <View style={styles.animationInfoItem}>
            <View style={[styles.colorIndicator, styles.rotationColor]} />
            <Text style={styles.animationInfoText}>Rotation + Opacity</Text>
          </View>
          
          <View style={styles.animationInfoItem}>
            <View style={[styles.colorIndicator, styles.scaleColor]} />
            <Text style={styles.animationInfoText}>Scale + Color Change</Text>
          </View>
          
          <View style={styles.animationInfoItem}>
            <View style={[styles.colorIndicator, styles.positionColor]} />
            <Text style={styles.animationInfoText}>Position + Morphing</Text>
          </View>
          
          <View style={styles.animationInfoItem}>
            <View style={[styles.colorIndicator, styles.resetColor]} />
            <Text style={styles.animationInfoText}>Reset + Complex</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  shape: {
    width: 100,
    height: 100,
    backgroundColor: '#3498db',
    borderRadius: 50, // Makes it circular
    marginBottom: 30,
    alignSelf: 'center',
    // Some extra visual flair here
    borderWidth: 5,
    borderColor: '#2980b9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // For android shadows
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 10, // Nice spacing between buttons
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  // Each button gets its own color - keeps things interesting
  button1: {
    backgroundColor: '#e74c3c', // Red for rotation
  },
  button2: {
    backgroundColor: '#f39c12', // Orange for scale/color
  },
  button3: {
    backgroundColor: '#27ae60', // Green for position
  },
  button4: {
    backgroundColor: '#9b59b6', // Purple for reset
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Info section styling - keeps everything organized
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  animationInfoContainer: {
    gap: 12, // Keeps everything nicely spaced
  },
  animationInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    gap: 12, // Space between color indicator and text
  },
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8, // Small circle indicators
  },
  // Color indicators match the button colors - nice visual connection
  rotationColor: {
    backgroundColor: '#e74c3c',
  },
  scaleColor: {
    backgroundColor: '#f39c12',
  },
  positionColor: {
    backgroundColor: '#27ae60',
  },
  resetColor: {
    backgroundColor: '#9b59b6',
  },
  animationInfoText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  // Note: might refactor these colors into a constants file later
});
