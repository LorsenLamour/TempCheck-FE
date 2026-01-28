import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import list from "../../data/listHistoric.json"

export default function Historique() {
    return (
            
                <ScrollView style={styles.container}>
                <Text style={styles.textHeader}>Historique des alertes</Text>
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