import { Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import api from "../../apiConfig";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";

export default function DashboardScreen() {
    const screenWidth = Dimensions.get("window").width;

    const [data, setData] = useState([]);
    const chartConfig = {
        backgroundColor: "#000000",
        backgroundGradientFrom: "#acc00",
        backgroundGradientTo: "#000080",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ffa726"
          },
          propsForLabels: {
            fontSize: 9,
            fontWeight: 'bold',
           // letterSpacing: 1,
           // wordSpacing: 3,
          }
      };
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/temperature/`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: data.map(item =>
            new Date(item.updatedAt).toLocaleDateString(`en-US`, {
                weekday: `short`,
                 hour: "numeric",
                 hour12: true
            })
        ),
        datasets: [
            {
                data: data.map(item => item.temperature),
            },
        ],
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>

            <Text style={styles.sectionTitle}>Daily Stats</Text>

            <LineChart

                data={chartData}
                width={screenWidth}
                height={290}
                verticalLabelRotation={30}
                chartConfig={chartConfig}

            />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 12,
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    chart: {
        borderRadius: 12,
        fontSize: 28
    },
});
