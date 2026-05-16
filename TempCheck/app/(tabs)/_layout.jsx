import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette";
import { ThemeContext } from "../../context/ThemeContext";

import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { theme } = useContext(ThemeContext);
  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.tabNav },
        headerTitleStyle: { color: colors.text },
        tabBarStyle: {
          backgroundColor: colors.tabNav,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#060e0f",
        tabBarInactiveTintColor: "rgb(255, 253, 253)",
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="parametres" 
        options={{ 
          title: "Paramètres",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="historique" 
        options={{ 
          title: "Historique",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="dashboard" 
        options={{ 
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
