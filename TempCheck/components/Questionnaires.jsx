import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal, Alert } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { lightColors, darkColors } from "../assets/colorPalette/colorsPalette"
import { router } from "expo-router";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";


export default function Questionnaires() {
    const { user } = useContext(CurrentUserContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [form, setForm] = useState({
        question1: null,
        question2: null,
        question3: null
    });

    useEffect(() => {
        setModalVisible(true)
    }, [])

        const { theme } = useContext(ThemeContext);
    
        const colors = theme === "light" ? lightColors : darkColors;
    
        const questions = [
            {   key: "question1",
                question: "Sentez-vous bien aujourd'hui ?",
                options: ["Oui", "Non"]
            },
            {   key: "question2",
                question: "Avez-vous de la fièvre ?",
                options: ["Oui", "Non"]
            },
            {   key: "question3",
                question: "Êtes-vous agé(e) de moins de 18 ans ?",
                options: ["Oui", "Non"]
            }
        ]
    
        const sendAnswers = async (finalForm) => {
                try {
                    const datas = {
                        temperature: 33.0,
                        user: user?._id,
                        question1: finalForm.question1,
                        question2: finalForm.question2,
                        question3: finalForm.question3,

                    }
                    const response = await axios.post(
                        "http://10.10.22.227:5000/api/temperature",
                        datas
                    );
                    console.log("Données envoyées", response.data);
                } catch (error) {
                    console.log("Erreur lors de l'envoi : ", error)
                }
        }


        const handleOptionSelect = async (option) => {
            const currentQuestion = questions[currentQuestionIndex];
            const value = option === "Oui"; 

            const updatedForm = { ...form, [currentQuestion.key]: value};
            setForm(updatedForm);

            const nextIndex = currentQuestionIndex + 1;

            if (nextIndex < questions.length) {
                setCurrentQuestionIndex(nextIndex);
                return;
            }

            await sendAnswers(updatedForm)

            setModalVisible(false);
            router.replace("/(tabs)")
        }
    
        const handleSkip = () => {
                const nextIndex = currentQuestionIndex + 1;
                if (nextIndex < questions.length) {
                    setCurrentQuestionIndex(nextIndex);
                } else {
                    setModalVisible(false);
                    router.replace("/(tabs)")
            }
        };

    return(
        <View style={styles.container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 30,
        gap: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    modalQuestion: {
        fontSize: 18,
        marginBottom: 20
    }
})