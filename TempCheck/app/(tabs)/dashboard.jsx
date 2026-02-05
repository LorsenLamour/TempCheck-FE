import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.sectionTitle}>Daily Stats</Text>

      <LineChart
        data={{
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"],
          datasets: [{ data: [20, 45, 28, 35, 50, 60, 40] }],
        }}
        
        width={Dimensions.get("window").width -40}
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
