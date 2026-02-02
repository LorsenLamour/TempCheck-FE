import { Stack } from "expo-router";
import { CurrentUserProvider } from "../context/CurrentUserContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
    return(
        <ThemeProvider>
            <CurrentUserProvider>
                    <Stack screenOptions={{ headerShown: false}}>
                        <Stack.Screen name="(auth)"/>
                        <Stack.Screen name="(tabs)"/>
                    </Stack>
            </CurrentUserProvider>
        </ThemeProvider>
    )
}