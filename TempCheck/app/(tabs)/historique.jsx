import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import list from "../../data/testUser.json"
import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function Historique() {

    const { theme } = useContext(ThemeContext);
    const { user } = useContext(CurrentUserContext);

    const allAlerts = list.filter(u =>
        u.email === user.email ||
        user.membres?.includes(u.email)
    )
    .flatMap(u => 
        u.alerts.map(alert => ({
            ...alert,
            username: u.username,
            age: u.age
        }))
    )

    // Condition couleur type

    const colorAlerts = (alert) => {
        const temp = alert.temperature
        if (temp <= 37.5){
            return "#3AF38D"
        } else if (temp <= 38.5){
            return "#F1FBA1"
        } else if (temp <= 40){
            return "#f3b238"
        } else {
            return "#FBA1A1"
        }
    }

    const colors = theme === "light" ? lightColors : darkColors;
    return (
                <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.textHeader, { color: colors.text }]}>Historique des alertes</Text>
                    {allAlerts.map((alert, index) => (
                        <View key={index} style={[styles.alerts, {backgroundColor: colorAlerts(alert)}]}>
                            <View style={styles.row}>
                                <Text style={styles.value}>{alert.age} ans</Text>
                                <Text style={styles.value}>{alert.temperature}°C</Text>
                                <Text style={styles.value}>{alert.date}</Text>

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
        textAlign:"center"
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