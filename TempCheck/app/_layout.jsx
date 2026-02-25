import { Stack } from "expo-router";
import { CurrentUserProvider, CurrentUserContext } from "../context/CurrentUserContext";
import { ThemeProvider } from "../context/ThemeContext";
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

function RootNavigation() {
    const { user, isLoading } = useContext(CurrentUserContext);
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false}}>
            {user ? (
                <Stack.Screen name="(tabs)"/>
            ) : (
                <Stack.Screen name="(auth)"/>
            )}
         </Stack>
    ) 
}

export default function RootLayout() {
    return(
        <ThemeProvider>
            <CurrentUserProvider>
                <RootNavigation />
            </CurrentUserProvider>
        </ThemeProvider>
    )
}