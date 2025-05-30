import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

export default function WorkoutSession() {
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
        ]).start()
    }
    return(
        <View style = {styles.container}>
            <Text style={styles.text}>No workouts created yet...</Text>
            <Text style={styles.subtext}>Create a Workout and add exercises to it to start</Text>

            <Animated.View style={[styles.fabContainer, { transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                    <View style={styles.fab}>
                        <AntDesign name="plus" size={30} color="white" />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1421',
        justifyContent: 'center',
        alignItems: 'center',
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
})