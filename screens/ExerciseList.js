import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator, } from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ExerciseList = () => {
  const route = useRoute();
  const { bodyPart } = route.params;

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart.toLowerCase()}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '75efadd082mshcb6abb785e9ff7dp183c8bjsn06af1a9e0891',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      });

      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExercises();
  }, [bodyPart]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.gifUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#93E13C" />;
        </View>
    )
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>
            Exercises for <Text style={styles.highlight}>{bodyPart}</Text>
        </Text>
        <FlatList
            data={exercises}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            numColumns={2}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
        />
    </View>
  )
}

export default ExerciseList;

const cardSize = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1421',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  highlight: {
  color: '#93E13C',
  fontFamily: 'DMSans-Bold',
},
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#1C2331',
    borderRadius: 16,
    padding: 10,
    marginBottom: 20,
    marginRight: 10,
    width: cardSize,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0E1421',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
