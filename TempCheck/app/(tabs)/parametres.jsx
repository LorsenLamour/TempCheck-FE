import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Switch, Alert } from "react-native";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ThemeContext } from "../../context/ThemeContext";
import { router } from "expo-router";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"
import api from "../../apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const { user, setCurrentUser } = useContext(CurrentUserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const colors = theme === "light" ? lightColors : darkColors;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const res = await api.get(`/users/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }

    fetchData();
  }, []);

  const handleDeconnexion = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { 
        text: 'Se déconnecter',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          setCurrentUser(null);
          router.replace("/(auth)/connexion");
        },
      },
      { text: 'Annuler', style: 'cancel'}
    ]);
  }

  // Fonction temporaire pour la suppression de compte
  const handleDeleteAccount = () => {

    if (!user?._id) {
      Alert.alert("Erreur", "Aucun utilisateur connecté.");
      return;
    }
    
    Alert.alert("Supprimer le compte", "Cette action est irréversible. Voulez-vous continuer ?", [
      { 
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("token");

            await api.delete(`/users/deleteUser/${user._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            setCurrentUser(null);

            router.replace("/(auth)/connexion");
          } catch (error) {
            console.error("Erreur lors de la suppression du compte:", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la suppression du compte. Veuillez réessayer.");
          }
        },
      },
      { text: 'Annuler', style: 'cancel'}
    ]);
  }

  return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.info}>
          <Image
            source={require("../../assets/images/profil.jpg")}
            style={styles.image}
          />

          <View style={styles.textContainer}>
            <Text style={[styles.username, { color: colors.text }]}>{data? `${data.prenom}` : ""}</Text>
          </View>
        </View>

        <View style={styles.settings}>
          <View>
            <Text style={[ styles.title, { color: colors.text}]}>Préférences</Text>
            <View style={styles.preferences}>
              <Text style={[styles.text, {color: colors.text}]}>Dark mode</Text>
              <Switch value={theme === "dark"} onValueChange={toggleTheme} />
            </View>
          </View>
          <View>
            <Text style={[ styles.title, { color: colors.text}]}>Notifications</Text>
          </View>
          <View style={styles.others}>
            <Text style={[ styles.title, { color: colors.text}]}>Autres</Text>
            <Text style={[styles.text, { color: "red" }]} onPress={handleDeleteAccount}>Supprimer le compte</Text>
            <Text style={[styles.text, { color: colors.text, width: 250, backgroundColor: "red", padding: 20, borderRadius: 25, alignSelf: "center", textAlign: "center" }]} onPress={handleDeconnexion}>Déconnexion</Text>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,         
    justifyContent: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    color: "gray",
  },

  /* Switch */
  switchWrapper: {
    padding: 10,
    borderRadius: 20,
  },
  light: { backgroundColor: "#FFFFFF" },
  dark: { backgroundColor: "#111111" },

  settings: {
    marginTop: 70,
    gap: 20,
    marginHorizontal: 10,
    flex: 1, 
  },
  preferences: {
    flexDirection: "row",
    marginTop: 30,
    gap: 200
  },
  others: {
    marginTop: 30,
  },
  text: {
    margin: 20,
    fontWeight: "600"
  },
  title: {
    fontSize: 15,
    color: "#c8c8c8",
    fontWeight: "500"
  }
});
