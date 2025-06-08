import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddReminder() {
    const [showPicker, setShowPicker] = useState(false);
    const [reminderTime, setReminderTime] = useState(null);

    useEffect(() => {
        if (reminderTime) {
            const storeReminder = async () => {
                try {
                    await AsyncStorage.setItem('reminderTime', reminderTime.toISOString());
                } catch (err) {
                    console.error('Error saving reminder time:', err);
                }
            };
            storeReminder();
        }
    }, [reminderTime]);

    return (
        <View style={styles.container}>
            <Pressable onPress = {() => setShowPicker(!showPicker)} style = {styles.button}>
                <Text style = {styles.buttonText}>⏰ Set Reminder Time</Text>
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    value={reminderTime || new Date()}
                    is24Hour={true}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedTime) => {
                        setShowPicker(false);
                        if (selectedTime && event.type == 'set') setReminderTime(selectedTime);
                    }}
                />
            )}
            {reminderTime && (
                <Text style={styles.selectedTime}>
                    Reminder set for: {reminderTime.toLocaleTimeString()}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E1421',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#93E13C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  selectedTime: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  }
});
