import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Modal, Alert } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import api from "../../apiConfig"



export default function Home() {

    const [data, setData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {

        axios.get(`http://localhost:5000/api/temperature/`).then(response => {
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
    useEffect(() => {
        setModalVisible(true);
    }, []);

    const { theme } = useContext(ThemeContext);

    const colors = theme === "light" ? lightColors : darkColors;

    const questions = [
        {
            question: "Comment vous sentez-vous aujourd'hui ?",
            options: ["Bien", "Fatigué", "Malade"]
        },
        {
            question: "Avez-vous de la fièvre ?",
            options: ["Oui", "Non"]
        },
        {
            question: "Avez-vous des symptômes respiratoires ?",
            options: ["Oui", "Non"]
        },
        {
            question: "Vous avez quel âge ?",
            options: ["Moins de 18 ans", "18-65 ans", "Plus de 65 ans"]
        }
    ]

    const handleOptionSelect = (option) => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            if (option === "Bien" || option === "Non") {
                // Les réponses doit aller au backend 
                setCurrentQuestionIndex(nextIndex);
            } else if (option === "Fatigué" || option === "Oui") {

                setCurrentQuestionIndex(nextIndex);
            } else if (option === "Malade" || option === "Plus de 65 ans") {

                setModalVisible(false);
                Alert.alert("Attention", "Votre état de santé est très anormal. Veuillez consulter un médecin immédiatement.");
                return;
            }
        }

        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setModalVisible(false);
        }
    };

    const handleSkip = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setModalVisible(false);
        }
    };

    const getAlertColor = () => {

        switch (state) {
            case "Neutre":
                return ["#F1FBA1", "#3AF38D"];
            case "A surveiller":
                return ["#F1FBA1", "#F33A3A"];
            case "Urgent":
                return ["#FA8B8B", "#FF0000"];
            default:
                return ["#F1FBA1", "#3AF38D"];
        }
    };

    return (
        <LinearGradient colors={getAlertColor(state)} style={styles.container}>
            <Text style={styles.textHeader}>Votre température actuelle:</Text>
            <View style={styles.temperatureContainer}>
                <Text style={styles.text}>{recentData?.temperature || 0}°C</Text>
            </View>
            <Text style={styles.textState}>États: {state}</Text>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Questionnaire de santé</Text>
                        <Text style={styles.modalQuestion}>{questions[currentQuestionIndex].question}</Text>
                        <View style={styles.options}>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <Text key={index} onPress={() => handleOptionSelect(option)}>{option}</Text>
                            ))}
                            <Text onPress={() => handleSkip()}>Passer</Text>
                        </View>
                    </View>
                </View>
            </Modal>
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