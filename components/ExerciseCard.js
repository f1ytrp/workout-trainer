import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

export default function ExerciseCard({ exercise }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={exercise.image} style={styles.cardImage} />
      <Text style={styles.name}>{exercise.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 200,
    height: 230,
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
},
});