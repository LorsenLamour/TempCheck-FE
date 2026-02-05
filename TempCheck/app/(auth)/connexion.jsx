import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import TestData from "../../data/testUser.json";
import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"
import { SafeAreaView } from "react-native-safe-area-context";


export default function Connexion() {

    const { setCurrentUser } = useContext(CurrentUserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { theme } = useContext(ThemeContext);
    
    const colors = theme === "light" ? lightColors : darkColors;


        const handleSubmit = () => {
            const foundUser = TestData.find(user => user.email === email && user.password === password);

            if (!foundUser) {
                Alert.alert("Erreur de connexion", "Email ou mot de passe incorrect.");
                return;
            }
            
            setCurrentUser(foundUser);
            router.replace("/(tabs)");
        }
        /**
         * Plus tard : Mettre en place une vraie connexion avec backend
         */
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.tabNav }}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>Bienvenue sur TempCheck</Text>
                    <Text style={[styles.subTitle, { color: colors.text }]}>Connectez-vous à votre compte</Text>
                </View>
                <View style={styles.form}>
                    <Text style={{ color: colors.text }}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Entrez votre email"
                    />
                    <Text style={{ color: colors.text }}>Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Entrez votre mot de passe"
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: colors.authButton }]}>
                        <Text style={{ color: colors.text }}>Se connecter</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, { color: colors.text }]}>Vous n'avez pas de compte ? {" "}
                        <Text style={styles.link} onPress={() => router.push("/(auth)/inscription")}>
                            Inscrivez-vous
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
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