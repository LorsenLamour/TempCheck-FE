import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { darkColors, lightColors } from "../../assets/colorPalette/colorsPalette";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ThemeContext } from "../../context/ThemeContext";
import api from "../../apiConfig";
//import list from "../../data/listHistoric.json";
//import TemperatureList from"../../context/alertService"
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Historique() {
    const [data, setData] = useState([]);
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(CurrentUserContext);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get('/temperature');
                    setData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }, [])
    );

    // const list = data
    // Condition couleur type

    const colorAlerts = (data) => {
        const statut = data?.statut
        if (statut === "Neutre") {
            // Vert
            return "#3AF38D"
        } else if (statut === "À surveiller") {
            //Jaune
            return "#F1FBA1"
        } else if (statut === "Urgent") {
            // Orange
            return "#ff0000"
        } else {
            //
            return "#247e59"
        }
    }

    const colors = theme === "light" ? lightColors : darkColors;
    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.textHeader, { color: colors.text }]}>Historique des alertes</Text>
            {data.slice().reverse().map((alert, index) => (
                <View key={index} style={[styles.alerts, { backgroundColor: colorAlerts(alert) }]}>
                    <View style={styles.row}>
                        <Text style={styles.value}>{alert?.statut || 0}</Text>
                        <Text style={styles.value}>{alert?.temperature || 0}°C</Text>
                        <Text style={styles.value}>{alert?.updatedAt || 0}</Text>

                    </View>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#F8F8E1",
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center"
    },
    textState: {
        padding: 20,
        fontSize: 16,
        fontWeight: "bold"
    },
    alerts: {
        borderWidth: 2,
        borderRadius: 12,
        padding: 15,
        marginBottom: 16,
        width: "90%",
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6
    },
    label: {
        fontSize: 14,
        opacity: 0.7
    },
    value: {
        fontSize: 15,
        fontWeight: "600",
        gap: 50,
    }

})