import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
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
            .then(response => {
                const fetchedData = response.data.bins;
                const formattedData = fetchedData.map((item: { bin_id: number, count: number }) => ({
                    name: `in Bin ${item.bin_id}`,
                    population: item.count,
                    color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color for each bin
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15
                }));

                setChartData(formattedData);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, []);

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