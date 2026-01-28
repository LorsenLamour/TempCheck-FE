import React from "react";
import { View, Text } from "react-native";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function Settings() {

    const { user, setCurrentUser } = useContext(CurrentUserContext);
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Paramètres</Text>
        </View>
    )
}