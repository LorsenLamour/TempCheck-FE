import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";


try {
    const response = await axios.get("/");
    console.log(response)

} catch (error) {
    console.log(error);
};

export default function Home() {

    const [state, setState] = useState("Normal");
    const getAlertColor = () => {

        switch (state) {
            case "Normal":
                return ["#F1FBA1", "#3AF38D"];
            case "Anormal":
                return ["#F1FBA1", "#F33A3A"];
            case "Très Anormal":
                return ["#FA8B8B", "#FF0000"];
            default:
                return ["#F1FBA1", "#3AF38D"];
        }
    };

    return (
        <LinearGradient colors={getAlertColor(state)} style={styles.container}>
            <Text style={styles.textHeader}>Votre température actuelle:</Text>
            <View style={styles.temperatureContainer}>
                <Text style={styles.text}>36.5°C</Text>
            </View>
            <Text style={styles.textState}>États: {state}</Text>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30
    },
    textState: {
        padding: 20,
        fontSize: 26,
        fontWeight: "bold"
    },
    text: {
        fontSize: 26,
        fontWeight: "bold"
    },
    temperatureContainer: {
        backgroundColor: "#ffffffa4",
        padding: 20,
        borderRadius: 10,
        borderColor: "#000000",
        borderWidth: 5
    }
})