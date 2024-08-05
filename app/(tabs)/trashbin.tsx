import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

const validatePercentage = (value: string): number => {
    let num = parseFloat(value);
    if (isNaN(num)) return 0;
    return Math.max(0, Math.min(100, parseFloat(num.toFixed(2))));
};

export default function Trashbin() {
    const [data, setData] = useState<{ [key: string]: { height: string; weight: string; composition: string } }>({
        trashbin1: { height: 'N/A', weight: 'N/A', composition: 'N/A' },
        trashbin2: { height: 'N/A', weight: 'N/A', composition: 'N/A' },
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                const response = await axios.get('http://192.168.1.47/test/api/fetch_sensor_data.php');
                console.log('Data fetched:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // setError(error);
            }
        };

        fetchData();
    }, []);

    const renderTrashbin = (binId: string, binData: { height: string; weight: string; composition: string }) => {
        const height = validatePercentage(binData.height);
        const weight = validatePercentage(binData.weight);

        return (
            <View style={styles.trashbin} key={binId}>
                <Text style={styles.header}>
                    <FontAwesome name="trash" size={24} color="#76c7c0" /> {`Trashbin ${binId.replace('trashbin', '')}`}
                </Text>
                <Text style={styles.location}>
                    <FontAwesome name="map-marker" size={20} color="#76c7c0" />{' '}
                    {binId === 'trashbin1' ? '1st Floor East Side' : '2nd Floor West Side'}
                </Text>
                <Text style={styles.label}>
                    <FontAwesome name="arrows-v" size={18} color="#333" /> Height
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.fill, { width: `${height}%` }]}>
                        <Text style={styles.percentage}>{height}%</Text>
                    </View>
                </View>
                <Text style={styles.label}>
                    <FontAwesome name="balance-scale" size={18} color="#333" /> Weight
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.fill, { width: `${weight}%` }]}>
                        <Text style={styles.percentage}>{weight}%</Text>
                    </View>
                </View>
                <View style={styles.status}>
                    <Text style={styles.statusMessage}>
                        {binData.composition === 'No object detected'
                            ? 'No object detected'
                            : 'Object detected!'}
                    </Text>
                    {binData.composition !== 'No object detected' && (
                        <>
                            <Text style={styles.statusMessage}>Checking material...</Text>
                            <Text style={styles.statusMessage}>
                                Composition: <Text style={styles.composition}>{binData.composition}</Text>{' '}
                                <FontAwesome name="flask" size={18} color="#76c7c0" />
                            </Text>
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.trashbinContainer}>
            {error ? (
                <Text style={styles.errorText}>Error: {error}</Text>
            ) : (
                Object.keys(data).map((binId: string) => renderTrashbin(binId, data[binId]))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    trashbinContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    trashbin: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: 25,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    location: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 5,
    },
    progressBar: {
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
    },
    fill: {
        height: '100%',
        backgroundColor: '#76c7c0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentage: {
        color: '#fff',
        fontWeight: 'bold',
    },
    status: {
        marginTop: 10,
    },
    statusMessage: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    composition: {
        fontWeight: 'bold',
        color: '#76c7c0',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});