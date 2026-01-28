import { Stack } from "expo-router";
import { CurrentUserProvider } from "../context/CurrentUserContext";
export default function RootLayout() {
    return(
        <CurrentUserProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)"/>
                <Stack.Screen name="(tabs)"/>
            </Stack>
        </CurrentUserProvider>
    )
}