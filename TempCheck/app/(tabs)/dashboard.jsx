import { Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { api } from "../../apiConfig";
import { useState, useEffect } from "react";
import { LineChart } from "react-native-chart-kit";
export default function DashboardScreen() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await api()
                setData(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: data.map(item =>
            new Date(item.updatedAt).toLocaleDateString()
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

                width={Dimensions.get("window").width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: () => "#4CAF50",
                    labelColor: () => "#333",
                }}
                style={styles.chart}
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
    },
});
