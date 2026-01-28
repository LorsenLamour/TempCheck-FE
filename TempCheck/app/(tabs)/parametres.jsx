import React, { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { View, Text, StyleSheet, Image } from "react-native";


export default function Settings() {

    const { user } = useContext(CurrentUserContext);

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Image 
                    source={require('../../assets/images/profil.jpg')} 
                    style={styles.image} 
                />
                <View style={styles.textContainer}>
                    <Text style={styles.username}>{user?.username}</Text>
                    <Text style={styles.role}>{user?.role}</Text>
                </View>
            </View>
            <View style={styles.settings}>
                <Text>Supprimer le compte</Text>
                <Text>Déconnexion</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 100
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textContainer: {
        justifyContent: 'center',
        marginRight: 200

    },
    username: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    role: {
        fontSize: 16,
        color: 'gray'
    },
    settings: {
        marginTop: 70,
        backgroundColor: '#E3B7C9',
        width: 450,
        height: 600,
        padding: 20,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        gap: 20,
        marginHorizontal: -20
    }
});