import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import useWorkoutStore from '../utils/WorkoutStore';
import TimerDisplay from '../components/TimerDisplay'

export default function WorkoutSession() {
    const navigation = useNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.out(Easing.quad),
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.in(Easing.quad),
            }),
        ]).start(() => {
            navigation.navigate('BodyPart');
        })
    }

    const workouts = useWorkoutStore((state) => state.workouts)

    return (
        <View style = {styles.container}>
            {workouts.length === 0 ? (
            <View style = {styles.container2}>
                <Text style={styles.text}>No workouts created yet...</Text>
                <Text style={styles.subtext}>Create a Workout and add exercises to it to start</Text>
                <Animated.View style={[styles.fabContainer, { transform: [{ scale: scaleAnim }] }]} >
                <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                    <View style={styles.fab}>
                    <AntDesign name="plus" size={30} color="white" />
                    </View>
                </TouchableOpacity>
                </Animated.View>
            </View>
            ) : (
            <ScrollView contentContainerStyle={styles.container2}>
                <Text style={styles.headers}>Start your Workout Session!</Text>
                <Text style={styles.subheader}>Select a workout to begin...</Text>

                {workouts.map((workout, index) => (
                    <View style={styles.workoutCard} key={index}>
                    <Text style={styles.workoutTitle}>{index + 1}. {workout.name}</Text>
                    <TimerDisplay />
                    <View style={styles.exerciseList}>
                        {workout.exercise.map((ex, idx) => (
                        <Text key={idx} style={styles.exerciseItem}>
                            • {ex.name} <Text style={styles.bodyPart}>({ex.bodyPart})</Text>
                        </Text>
                        ))}
                    </View>
                    </View>
                ))}
                </ScrollView>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1421',
        padding: 20,
    },
    text: {
        color: '#93E13C',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtext: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 10,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 80,
        right: 30,
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
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
    },
    headers: {
        color: '#93E13C',
        fontSize: 32,
        paddingVertical: 16,
        fontFamily: 'Montserrat-Bold',
    },
    subheader: {
        color: '#ffffff',
        fontSize: 24,
        paddingBottom: 20,
        fontFamily: 'Montserrat-Medium',
    },
    workoutCard: {
        backgroundColor: '#1C2331',
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    workoutTitle: {
        color: '#93E13C',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
    },
    exerciseList: {
        paddingLeft: 10,
    },
    exerciseItem: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 6,
        fontFamily: 'Montserrat-Regular',
    },
    bodyPart: {
        color: '#93E13C',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
    }
})