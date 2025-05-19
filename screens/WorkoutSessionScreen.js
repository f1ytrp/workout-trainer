import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WorkoutSession() {
    return(
        <View style = {styles.container}>
            <Text style={styles.text}>No exercises in this workout yet.</Text>
            <Text style={styles.subtext}>Please add exercises to begin.</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1421',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20',
    },
    text: {
        color: '#EEFF00',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtext: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 10,
    },
})