import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ExerciseCard({ exercise }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
      ]}
      android_ripple={{ color: '#2A2A3F' }}
    >
      <Image source={exercise.image} style={styles.cardImage} />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>{exercise.name}</Text>
        <Text style={styles.cardSubtext}>Tap to view details</Text>
      </View>
      <Ionicons name="arrow-forward-circle" size={24} color="#32CD32" style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2F',
    borderRadius: 16,
    padding: 12,
    marginRight: 14,
    width: 200,
    height: 250,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    position: 'relative',
},
textContainer: {
    flex: 1,
    justifyContent: 'space-between',
},
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
},
  cardSubtext: {
    fontSize: 13,
    color: '#AAAAAA',
    marginTop: 4,
    fontFamily: 'Montserrat-Medium',
},
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 10,
    resizeMode: 'cover',
},
  icon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
});