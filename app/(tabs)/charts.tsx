import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';

export default function Charts() {
    return (
        <View style={styles.container}>
            <Text style={styles.chartHeading}>Overall Composition Count</Text>
            <View style={styles.card}>
                <View style={styles.chartContainer}>
                    <BarChart />
                </View>
            </View>
            <Text style={styles.chartHeading}>Items Bin Count</Text>
            <View style={styles.card}>
                <View style={styles.chartContainer}>
                    <PieChart />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f5f7',
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
        overflow: 'hidden',  // Ensures content doesn't overflow the card
    },
    chartContainer: {
        height: 300,  // Set a specific height for the chart container
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartHeading: {
        paddingTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});