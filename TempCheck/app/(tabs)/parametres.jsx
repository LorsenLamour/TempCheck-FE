import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Switch, Alert } from "react-native";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ThemeContext } from "../../context/ThemeContext";
import { router } from "expo-router";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"



export default function Settings() {
  const { user } = useContext(CurrentUserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const colors = theme === "light" ? lightColors : darkColors;

  const handleDeconnexion = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { 
        text: 'Confirmer',
        onPress: () => router.replace("/(auth)/connexion"),
        style: 'destructive'
      },
      { text: 'Annuler', style: 'cancel', onPress: () => console.log("Déconnexion annulée") }
    ]);
  }

  // Fonction temporaire pour la suppression de compte
  const handleDeleteAccount = () => {
    Alert.alert("Supprimer le compte", "Cette action est irréversible. Voulez-vous continuer ?", [
      { 
        text: 'Supprimer',
        onPress: () => console.log("Compte supprimé"),
        style: 'destructive'
      },
      { text: 'Annuler', style: 'cancel', onPress: () => console.log("Suppression annulée") }
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
            <Text style={[styles.username, { color: colors.text }]}>{user?.username}</Text>
            <Text style={[styles.role, { color: colors.text }]}>{user?.role}</Text>
          </View>

          <View style={{ marginLeft: 10 }}>
            <Switch value={theme === "dark"} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={styles.settings}>
          <Text style={[styles.deleteText, { color: colors.text }]} onPress={handleDeleteAccount}>Supprimer le compte</Text>
          <Text style={[styles.logoutText, { color: colors.text, width: 350 }]} onPress={handleDeconnexion}>Déconnexion</Text>
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
  deleteText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 50,
    backgroundColor: "#db8383",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  logoutText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    color: "white",
    textAlign: "center",
    width: 400, 
    marginLeft: 10,         
  },
});
