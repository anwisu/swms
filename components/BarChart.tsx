import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.5,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Change bar color to white for contrast
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    propsForLabels: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#ffffff',
    },
    propsForVerticalLabels: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#ffffff',
    },
    propsForBackgroundLines: {
        strokeDasharray: '', // Solid lines
        strokeWidth: 0.5,
        color: '#ffffff',
    },
};

type ChartData = {
    labels: string[];
    datasets: { data: number[] }[];
};

export default function BarChartScreen() {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get('http://192.168.1.47/test/api/fetch_composition_data.php')
            .then(response => {
                const fetchedData = response.data;
                const labels = Object.keys(fetchedData);
                const values = Object.values(fetchedData).map(Number);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: values
                        }
                    ]
                });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <BarChart
                style={styles.chart}
                data={chartData}
                width={screenWidth - 40}
                height={300}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    chart: {
        borderRadius: 16,
        flex: 1,
    },
});