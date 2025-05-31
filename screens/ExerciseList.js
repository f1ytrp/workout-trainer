import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator, ScrollView, Modal, Pressable, TouchableOpacity, TextInput} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { loadFromCache, saveToCache } from '../utils/cache';
import { WebView } from 'react-native-webview'
import { useWindowDimensions } from 'react-native';
import useWorkoutStore from '../utils/WorkoutStore';
import { Picker } from '@react-native-picker/picker';


const ExerciseList = () => {
  const { width } = useWindowDimensions(); 
  const cardSize = (width - 60) / 2;

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1421',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#0E1421',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '85%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageWrapper: {
    marginVertical: 12,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },

  detailsContainer: {
    backgroundColor: '#1A1F2E',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 6,
  },
  detailValue: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#93E13C',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 18,
    color: '#93E13C',
    marginRight: 8,
    lineHeight: 22,
  },
  instructionText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    flex: 1,
  },
  noInstructions: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#1E293B',
    borderRadius: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#334155',
    borderRadius: 8,
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
  },

  okButton: {
    backgroundColor: '#93E13C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  okButtonText: {
    color: '#0E1421',
    fontWeight: 'bold',
    fontSize: 14,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
});

  const route = useRoute();
  const { bodyPart } = route.params;

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const addExerciseToWorkout = useWorkoutStore((state) => state.addExerciseToWorkout);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);
  const workouts = useWorkoutStore((state) => state.workouts);
  const [newWorkoutName, setNewWorkoutName] = useState('');

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedExistingWorkout, setSelectedExistingWorkout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('Updated workouts:', workouts);
  }, [workouts]);

  const fetchExercises = async () => {
    const cacheKey = `exercises_${bodyPart.toLowerCase()}`;
    try {
      const cachedData = await loadFromCache(cacheKey);
      if (cachedData) {
        setExercises(cachedData);
        return;
      }
      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart.toLowerCase()}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '75efadd082mshcb6abb785e9ff7dp183c8bjsn06af1a9e0891',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        },
      });

      const data = await response.json();
      setExercises(data);
      await saveToCache(cacheKey, data);

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
    <Pressable onPress = {() => {
        setSelectedExercise(item);
        setModalVisible(true);
    }} style={styles.card}>
      <Image source={{ uri: item.gifUrl }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#93E13C" />
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
      <Modal visible = {modalVisible} animationType = "slide" transparent = {true} onRequestClose = {() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                {selectedExercise ? (
                  <>
                    <Text style={styles.name}>{selectedExercise.name}</Text>

                    <View style={styles.imageWrapper}>
                      <WebView
                        source={{ uri: selectedExercise.gifUrl }}
                        style={styles.image}
                        originWhitelist={['*']}
                      />
                    </View>

                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailLabel}>
                        🎯 Target:{' '}
                        <Text style={styles.detailValue}>{selectedExercise.target}</Text>
                      </Text>
                      <Text style={styles.detailLabel}>
                        🏋️ Equipment:{' '}
                        <Text style={styles.detailValue}>{selectedExercise.equipment}</Text>
                      </Text>
                    </View>

                    {selectedExercise.instructions?.length > 0 ? (
                      <>
                        <Text style={styles.sectionTitle}>📋 Instructions</Text>
                        {selectedExercise.instructions.map((step, index) => (
                          <View key={index} style={styles.instructionItem}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.instructionText}>{step.trim()}</Text>
                          </View>
                        ))}
                      </>
                    ) : (
                      <Text style={styles.noInstructions}>No instructions available</Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.errorText}>No exercise data to display</Text>
                )}
              </ScrollView>
              <View style={{ padding: 16 }}>
                <Text style={{ color: '#fff', fontSize: 16, marginBottom: 8 }}>Create a New Workout</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    placeholder="Enter workout name"
                    value={newWorkoutName}
                    onChangeText={setNewWorkoutName}
                    style={styles.input}
                    placeholderTextColor="#ccc"
                  />
                  <TouchableOpacity
                    style={styles.okButton}
                    onPress={() => {
                      if (!newWorkoutName.trim()) {
                        console.log("Workout name is empty.");
                        return;
                      }

                      const existingWorkout = workouts.find(w => w.name === newWorkoutName.trim());

                      if (existingWorkout) {
                        addExerciseToWorkout(newWorkoutName.trim(), selectedExercise);
                        console.log(`Added to existing workout: ${newWorkoutName}`);
                      } else {
                        addWorkout(newWorkoutName.trim(), selectedExercise);
                        console.log(`Created new workout: ${newWorkoutName}`);
                      }

                      console.log('Updated workouts:', workouts);
                      setNewWorkoutName('');
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.okButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
                {workouts.length > 0 && (
                  <>
                    <Text style={{ color: '#fff', fontSize: 16, marginTop: 16, marginBottom: 8 }}>Add to Existing Workout</Text>
                    <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                      <Picker
                        selectedValue={selectedExistingWorkout}
                        onValueChange={(itemValue) => setSelectedExistingWorkout(itemValue)}
                        style={{ color: '#000' }}
                      >
                        <Picker.Item label="Select a workout" value={null} />
                        {workouts.map((workout) => (
                          <Picker.Item key={workout.name} label={workout.name} value={workout.name} />
                        ))}
                      </Picker>
                    </View>

                    <TouchableOpacity
                      style={[styles.okButton, { marginTop: 10 }]}
                      onPress={() => {
                        if (!selectedExistingWorkout) {
                          console.log("No workout selected.");
                          return;
                        }

                        addExerciseToWorkout(selectedExistingWorkout, selectedExercise);
                        console.log(`Added to existing workout: ${selectedExistingWorkout}`);
                        setSelectedExistingWorkout(null);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.okButtonText}>Add to Selected</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
    </View>
  )
}

export default ExerciseList;