import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="inscription"/>
            <Stack.Screen name="connexion"/>
        </Stack>
    )
}