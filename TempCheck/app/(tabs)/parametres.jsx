import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function Settings() {
  const { user } = useContext(CurrentUserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={require("../../assets/images/profil.jpg")}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.username}>{user?.username}</Text>
          <Text style={styles.role}>{user?.role}</Text>
        </View>

        <View
          style={[
            styles.switchWrapper,
            theme === "light" ? styles.light : styles.dark,
          ]}
        >
          <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>
      </View>

      <View style={styles.settings}>
        <Text style={styles.deleteText}>Supprimer le compte</Text>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
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
    backgroundColor: "#E3B7C9",
    width: 450,        
    padding: 20,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    gap: 20,
    marginHorizontal: -20,
    flex: 1,             
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 50,
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
  },
});
