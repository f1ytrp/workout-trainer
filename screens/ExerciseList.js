import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator, ScrollView, Modal, Pressable, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { loadFromCache, saveToCache } from '../utils/cache';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview'
import { useWindowDimensions } from 'react-native';


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
  closeButton: {
    backgroundColor: '#93E13C',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#0E1421',
    fontWeight: 'bold',
    fontSize: 16,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 10,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#93E13C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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

  modalButton: {
    backgroundColor: '#93E13C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalButtonText: {
    color: '#0E1421',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

  const route = useRoute();
  const { bodyPart } = route.params;

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

              <View style={styles.buttonRow}>
                <Pressable onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </Pressable>

                <TouchableOpacity activeOpacity={0.8} style={styles.modalButton}>
                  <AntDesign name="plus" size={24} color="#0E1421" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </View>
  )
}

export default ExerciseList;