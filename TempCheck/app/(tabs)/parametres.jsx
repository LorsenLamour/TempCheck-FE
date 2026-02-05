import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Switch, Alert, TouchableOpacity } from "react-native";
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

          <View>
            <TouchableOpacity>
              <Text style={[{ backgroundColor: "#a3c4d7", padding: 20, borderRadius: 25, fontWeight: "600"}]}>Modifier le profil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.settings}>
          <View>
            <Text style={[ styles.title, { color: colors.text}]}>Préférences</Text>
            <View style={styles.preferences}>
              <Text style={[styles.text, {color: colors.text}]}>Dark mode</Text>
              <Switch value={theme === "dark"} onValueChange={toggleTheme} />
            </View>
            <View style={styles.preferences}>
              <Text style={[styles.text, {color: colors.text}]}>Capteur ON/OFF</Text>
              <Switch/>
            </View>
          </View>
          <View>
            <Text style={[ styles.title, { color: colors.text}]}>Notifications</Text>
            <View style={styles.preferences}>
              <Text style={[styles.text, {color: colors.text}]}>Notifications activation</Text>
              <Switch/>
            </View>
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
    gap: 100
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
