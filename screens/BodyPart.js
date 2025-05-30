import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function BodyPart() {
    const navigation = useNavigation();
    
    const bodyParts = [
    { id: '1', name: 'Chest', image: require('../assets/images/chest.png') },
    { id: '2', name: 'Back', image: require('../assets/images/back.png') },
    { id: '3', name: 'Cardio', image: require('../assets/images/cardio.png') },
    { id: '4', name: 'Lower Arms', image: require('../assets/images/lowerArms.png') },
    { id: '5', name: 'Upper Arms', image: require('../assets/images/upperArms.png') },
    { id: '6', name: 'Shoulders', image: require('../assets/images/shoulders.png') },
    { id: '7', name: 'Lower Legs', image: require('../assets/images/lowerLegs.png') },
    { id: '8', name: 'Upper Legs', image: require('../assets/images/upperLegs.png') },
    { id: '9', name: 'Neck', image: require('../assets/images/neck.png') },
   ];
    const renderItem = ({ item }) => (
        <Pressable style={styles.card} onPress={() => navigation.navigate('ExerciseList', { bodyPart: item.name })}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
        </Pressable>
    );
    return (
        <View style = {styles.container}>
            <Text style = {styles.heading1}>Browse through the</Text>
            <Text style = {styles.heading2}>Exercises</Text>
            <FlatList
                data={bodyParts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1421',
        padding: 20,
    },
    heading1 : {
        fontSize: 24,
        fontFamily: 'DMSans-Medium',
        color: '#FFFFFF',
        marginBottom: 5,
    },
    heading2 : {
        fontSize: 32,
        fontFamily: 'DMSans-Bold',
        color: '#93E13C',
    },
    card: {
        backgroundColor: '#1E1E2F',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Regular',
    },
})