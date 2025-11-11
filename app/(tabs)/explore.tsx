import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  // Simple screen for now - might add more features later
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.simpleText}>Explore Tab</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light gray background
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',  // Dark text color
  },
  // TODO: add more styles when we expand this tab
});
