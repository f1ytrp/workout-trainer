import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import scheduleNotification from './Notification';

export default function AddReminder() {
    const [showPicker, setShowPicker] = useState(false);
    const [reminderTime, setReminderTime] = useState(null);
    
    return (
        <View style={styles.container}>
            <Pressable 
                onPress = {() => setShowPicker(!showPicker)} 
                style = {({ pressed }) => [
                    styles.button,
                    {
                        transform: [{ scale: pressed ? 0.95 : 1  }],
                        backgroundColor: pressed ? '#7BCF2A' : '#93E13C',
                        opacity: pressed ? 0.8 : 1,
                    }
                ]}
            >
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
                        if (selectedTime && event.type == 'set'){
                            const now = new Date();
                            const scheduledTime = new Date(
                                now.getFullYear(),
                                now.getMonth(),
                                now.getDate(),
                                selectedTime.getHours(),
                                selectedTime.getMinutes(),
                                0,
                                0
                            );
                            setReminderTime(scheduledTime);
                            scheduleNotification(scheduledTime, false);  
                        }
                    }}
                />
            )}
            {reminderTime && (
                <Text style={styles.selectedTime}>
                    Reminder set for: {reminderTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
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
