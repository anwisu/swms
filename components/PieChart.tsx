import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: "#a2d8af", // Softer green background color
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#a2d8af", // Softer green background color
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`, // Change bar color to dark text color for contrast
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    propsForLabels: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#333', // Text color
    },
    propsForVerticalLabels: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#333', // Text color
    },
    propsForBackgroundLines: {
        strokeDasharray: '', // Solid lines
        strokeWidth: 0.5,
        color: '#333', // Text color
    },
};

type PieChartData = {
    name: string;
    population: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}[];

export default function PieChartScreen() {
    const [chartData, setChartData] = useState<PieChartData>([]);

    useEffect(() => {
        axios.get('http://192.168.1.47/test/api/fetch_items_per_bin.php')
        // 192.168.43.110
            .then(response => {
                const fetchedData = response.data.bins;
                const formattedData = fetchedData.map((item: { bin_id: number, count: number }) => ({
                    name: `in Bin ${item.bin_id}`,
                    population: item.count,
                    color: getRandomGreenColor(), // Random color for each bin
                    legendFontColor: '#333', // Text color
                    legendFontSize: 15
                }));

                setChartData(formattedData);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    function getRandomGreenColor() {
        const greenShades = [
            '#a2d8af', '#81c784', '#66bb6a', '#4caf50', '#388e3c', '#2e7d32', '#1b5e20'
        ];
        return greenShades[Math.floor(Math.random() * greenShades.length)];
    }

    return (
        <View style={styles.container}>
            <PieChart
                style={styles.chart}
                data={chartData}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[20, 25]}
                absolute
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