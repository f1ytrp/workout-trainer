import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("Notification shown at:", new Date());
    return{
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
    }
  },
});

const requestPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'You need to enable notifications for reminders to work');
  }
};
requestPermission();

const scheduleNotification = async (time) => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Workout Reminder",
        body: "It's time for your workout!",
        sound: 'default',
      },
      trigger: { type: 'date', date: time },
    });
    console.log("Scheduled Time:", time.toString()),
    Alert.alert(
      'Reminder set!',
      `Your workout reminder is set for ${time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`
    );
  } catch (err) {
    console.error('Error scheduling notification:', err);
    Alert.alert('Error', 'Failed to set reminder. Please try again.');
  }
};

export default scheduleNotification;
