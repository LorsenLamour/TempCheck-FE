import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import list from "../../data/listHistoric.json"
import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"

export default function Historique() {

    const { theme } = useContext(ThemeContext);
    
    const colors = theme === "light" ? lightColors : darkColors;
    return (
                <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.textHeader, { color: colors.text }]}>Historique des alertes</Text>
                    {list.map(data =>{
                        return(
                            <View key={data.key} style={styles.itemBox}>

                                <Text style={styles.data}>{data.name} {data.temperature} {data.state}</Text> 
                            
                             </View>
                        )
                    })} 
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
    data: {
        fontSize: 15,
        fontWeight: "bold",
        margin: 5,  
              
    },
    itemBox: {
        borderRadius: 10,
        borderColor: "#000000",
        borderWidth: 3,
        margin: 10,
        backgroundColor: "#F1FBA1",
    
       
    },
    
})