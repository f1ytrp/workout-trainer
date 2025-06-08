import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function AddReminder() {
    const [showPicker, setShowPicker] = useState(false);
    const [reminderTime, setReminderTime] = useState(null);

    useEffect(() => {
        const getPermisson = async () => {
            const {status} = await Notifications.requestPermissionsAsync();
            if(status !== 'granted') {
                alert('You need to enable notifications for reminders to work');
            }
        }
        getPermisson();
    }, []);

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

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        })
    })

    const scheduleNotification = async (time) => {
        try {
            await Notifications.cancelAllScheduledNotificationsAsync();
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "⏰ Workout Reminder",
                    body: "It's time for your workout!",
                    sound: 'default',
                },
                trigger: {
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                    repeats: true,
                },
            })
            Alert.alert('Reminder set!', `Your workout reminder is set for ${time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
        } catch (err) {
            console.error('Error scheduling notification:', err);
            Alert.alert('Error', 'Failed to set reminder. Please try again.');
        }
    }
    
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
                        if (selectedTime && event.type == 'set'){
                            setReminderTime(selectedTime);
                            scheduleNotification(selectedTime);  
                        }
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
