import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ActivityIndicator } from "react-native"; import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import api from "../../apiConfig"
import { PI_URL } from "../../apiConfig";

import { CurrentUserContext } from "../../context/CurrentUserContext";


export default function Home() {

    const [data, setData] = useState(null);
    const { user } = useContext(CurrentUserContext);


    const [modalVisible, setModalVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [temp, setTemp] = useState(null);

    const questions = [
        "Avez-vous de la fièvre ?",
        "Avez-vous des frissons ?",
        "Avez-vous des douleurs musculaires ?"
    ];

    useEffect(() => {

        api.get(`/temperature/`).then(response => {
            console.log("Données reçues:", response.data);
            setData(response.data);
        }).catch(error => {
            console.error("Erreur lors de la récupération des données:", error);
        })
    }, []
    )
    const dataTemp = data
    const recentData = dataTemp?.[dataTemp.length - 1]

    //const [state, setState] = useState(null);
    const state = recentData?.statut
    console.log("statut", state)

    const { theme } = useContext(ThemeContext);

    const colors = theme === "light" ? lightColors : darkColors;

    const getAlertColor = () => {

        switch (state) {
            case "Neutre":
                return ["#F1FBA1", "#3AF38D"];
            case "À surveiller":
                return ["#FFA500", "#FFA500"];
            case "Urgent":
                return ["#FA8B8B", "#FF0000"];
            default:
                return ["#F1FBA1", "#3AF38D"];
        }
    };

    const prendreTemperature = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${PI_URL}/test`, { timeout: 10000 });
            if (response.data.success) {
                setTemp(response.data.temperature);
                setStep(1);
                setModalVisible(true);
            } else {
                Alert.alert("Erreur", "Impossible de lire la température");
            }
        } catch (error) {
            Alert.alert("Erreur", "Capteur de température non détecté ou temps de réponse dépassé");
        } finally {
            setIsLoading(false);
        }
    };

    const repondre = async (reponse) => {
        const newAnswers = { ...answers, [step]: reponse };

        if (step < 3) {
            setAnswers(newAnswers);
            setStep(step + 1);
        } else {
            setIsLoading(true);
            try {
                const payload = {
                    temperature: temp,
                    question1: newAnswers[1] || false,
                    question2: newAnswers[2] || false,
                    question3: newAnswers[3] || false,
                    user: user?._id
                };

                const response = await api.post("/temperature/", payload);
                if (response.status === 201) {
                    Alert.alert("Température enregistrée ");
                    setModalVisible(false);
                    setStep(0);
                    setAnswers({});
                    const refresh = await api.get(`/temperature/`);
                    setData(refresh.data);
                }
            } catch (error) {
                Alert.alert("Erreur", "Impossible d'enregistrer");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <LinearGradient colors={getAlertColor(state)} style={styles.container}>
                <Text style={styles.textHeader}>Votre température actuelle:</Text>
                <View style={styles.temperatureContainer}>
                    <Text style={styles.text}>{recentData?.temperature || 0}°C</Text>
                </View>
                <Text style={styles.textState}>État: {state || "Aucune"}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={prendreTemperature}
                    disabled={isLoading}
                >
                    {isLoading ?
                        <ActivityIndicator color="#fff" /> :
                        <Text style={styles.buttonText}>Nouveau test</Text>
                    }
                </TouchableOpacity>
            </LinearGradient>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Questionnaire</Text>
                        <Text style={styles.tempDisplay}>Température: {temp}°C</Text>
                        <Text style={styles.question}>{questions[step - 1]}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={[styles.btn, styles.btnOui]} onPress={() => repondre(true)}>
                                <Text style={styles.btnText}>Oui</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, styles.btnNon]} onPress={() => repondre(false)}>
                                <Text style={styles.btnText}>Non</Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.progress}>Question {step}/3</Text>
                    </View>
                </View>
            </Modal>
        </>
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
    },
    button: {
        marginTop: 40,
        backgroundColor: "#2196F3",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        elevation: 3
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        width: "85%"
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15
    },
    tempDisplay: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2196F3",
        marginBottom: 25
    },
    question: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 30
    },
    buttons: {
        flexDirection: "row",
        gap: 20,
        marginBottom: 20
    },
    btn: {
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
        minWidth: 100,
        alignItems: "center"
    },
    btnOui: {
        backgroundColor: "#4CAF50"
    },
    btnNon: {
        backgroundColor: "#f44336"
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    progress: {
        fontSize: 14,
        color: "#666"
    }
})