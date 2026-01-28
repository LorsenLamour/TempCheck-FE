import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, Pressable} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

export default function Connexion() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        Alert.alert("Connexion réussie !");
        event.preventDefault();
    }
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Bienvenue sur TempCheck</Text>
                <Text style={styles.subTitle}>Connectez-vous à votre compte</Text>
            </View>
            <View style={styles.form}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Entrez votre email"
                />
                <Text>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Entrez votre mot de passe"
                    secureTextEntry
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text>Se connecter</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Vous n'avez pas de compte ? {" "}
                    <Text style={styles.link} onPress={() => router.push("/(auth)/inscription")}>
                        Inscrivez-vous
                    </Text>
                </Text>
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
    form: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 200
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40
    },
    subTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 200
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    text: {
        marginTop: 20,
        textAlign: 'center'
    }
})