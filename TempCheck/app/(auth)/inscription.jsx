import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"
import { SafeAreaView } from "react-native-safe-area-context";


export default function Inscription() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");

    const { user, setCurrentUser } = useContext(CurrentUserContext);

    const { theme } = useContext(ThemeContext);
    
    const colors = theme === "light" ? lightColors : darkColors;

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword || !prenom || !nom) {
            Alert.alert("Erreur d'inscription", "Veuillez remplir tous les champs.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erreur d'inscription", "Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("http://10.10.22.227:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nom, 
                    prenom,
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log("REGISTER DATA:", data);

            if (response.ok) {
                Alert.alert("Inscription réussie", "Vous pouvez maintenant vous connecter.");
                router.push("/(auth)/connexion");
            }
            else {
                Alert.alert("Erreur d'inscription", data.message || "Une erreur est survenue lors de l'inscription.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            Alert.alert("Erreur d'inscription", "Une erreur est survenue lors de l'inscription.");
        }
    }
    
    
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.tabNav }}>
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Bienvenue sur TempCheck</Text>
                        <Text style={[styles.subTitle, { color: colors.text }]}>Inscrivez-vous pour avoir accès à l'application</Text>
                    </View>
                    <View style={styles.form}>
                        <Text style={{ color: colors.text }}>Nom d'utilisateur</Text>
                        <TextInput
                            style={styles.input}
                            value={nom}
                            onChangeText={setNom}
                            placeholder="Entrez votre nom d'utilisateur"
                        />
                        <Text style={{ color: colors.text }}>Prénom</Text>
                        <TextInput
                            style={styles.input}
                            value={prenom}
                            onChangeText={setPrenom}
                            placeholder="Entrez votre prénom"
                        />
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
                        <Text style={{ color: colors.text }}>Confirmez le mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirmez votre mot de passe"
                            secureTextEntry
                        />
                        <TouchableOpacity onPress={handleSignUp} style={[styles.button, { backgroundColor: colors.authButton }]}>
                            <Text style={{ color: colors.text }}>S'inscrire</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Vous avez déjà un compte ? {" "}
                            <Text style={styles.link} onPress={() => router.push("/(auth)/connexion")}>
                                Connectez-vous
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