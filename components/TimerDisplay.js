import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useTimer from './useTimer'; // adjust the path

export default function TimerDisplay() {
  const { time, start, stop, resetTimer, isRunning } = useTimer();

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{formatTime(time)}</Text>

      <View style={styles.timerControls}>
        <TouchableOpacity onPress={isRunning ? stop : start} style={styles.timerButton}>
          <Text style={styles.timerButtonText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={resetTimer} style={[styles.timerButton, { backgroundColor: '#ff5252' }]}>
          <Text style={styles.timerButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: '#1A1F2E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  timerText: {
    fontSize: 32,
    color: '#93E13C',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 16,
  },
  timerControls: {
    flexDirection: 'row',
    gap: 12,
  },
  timerButton: {
    backgroundColor: '#93E13C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
});
