import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview'

import { getExerciseByName } from '../utils/getAllExercise';
import LoadingSpinner from '../components/LoadingSpinner';
import { saveToCache, loadFromCache } from '../utils/cache';


export default function ExerciseDetail() {
  const route = useRoute();
  const { name } = route.params;

  const [exerciseData, setExerciseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const exercise = await getExerciseByName(name);
        
        if (!exercise) {
          const errorMsg = `Exercise "${name}" not found`;
          console.log('[DEBUG]', errorMsg);
          throw new Error(errorMsg);
        }
        
        setExerciseData(exercise);
      } catch (err) {
        console.error('[DEBUG] Fetch error:', {
          message: err.message,
          stack: err.stack,
        });
        setError(err.message);
      } finally {
        console.log('[DEBUG] Fetch completed');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [name]);


  if (loading) return (
    <View style={styles.loader}>
      <LoadingSpinner />
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.name, { color: '#FF6B6B' }]}>Error: {error}</Text>
        <Text style={styles.target}>Exercise: "{name}"</Text>
      </View>
    );
  }

  if (!exerciseData) {
    return (
      <View style={styles.container}> 
        <Text style={[styles.name, { color: '#FF6B6B' }]}>No data found for "{name}"</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView  style={styles.scrollContent}>
      {exerciseData ? (
        <>
          <Text style={styles.name}>{exerciseData.name}</Text>

          <View style={styles.imageWrapper}>
            <WebView
              source={{ uri: exerciseData.gifUrl }}
              style={styles.image}
              originWhitelist={['*']}
            />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>🎯 Target: <Text style={styles.detailValue}>{exerciseData.target}</Text></Text>
            <Text style={styles.detailLabel}>🏋️ Equipment: <Text style={styles.detailValue}>{exerciseData.equipment}</Text></Text>
          </View>

          {exerciseData.instructions && exerciseData.instructions.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>📋 Instructions</Text>
              {exerciseData.instructions.map((step, index) => (
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
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1421',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#93E13C',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
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
});

