import { Redirect } from "expo-router";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Index() {
    const { currentUser } = useContext(CurrentUserContext);

    return currentUser ?
        <Redirect href="/(tabs)" />
        : 
        <Redirect href="/(auth)/connexion" />;
}