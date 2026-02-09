import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Modal, Alert} from "react-native";

import axios from "axios";
import api from "../../apiConfig"
 
 

export default function Home() {

    const [data, setData] = useState(null);
    const [state, setState] = useState("Normal");


useEffect(() => {

      axios.get(api.baseURL + "/").then(response => {
        console.log("Données reçues:", response.data);
        setData(response.data);
      }).catch(error => {
        console.log("Erreur lors de la récupération des données:", error);
      })})


    const getAlertColor = ()=> {
            
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
                    <Text style={styles.text}>{data?.temperature || 0}°C</Text>
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
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30
    },
    textState: {
        padding: 20,
        fontSize: 20,
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