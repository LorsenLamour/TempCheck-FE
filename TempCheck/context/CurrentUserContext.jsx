import React, { createContext, useState, useMemo, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CurrentUserContext = createContext({ 
    user: null, 
    setCurrentUser: () => {},
    isLoading: true
});

export function CurrentUserProvider({ children }){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'utilisateur:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    const setCurrentUser = useCallback((newUser) => {
        setUser((newUser));
    }, []);

    const value = useMemo(() => ({ 
        user, setCurrentUser, isLoading 
    }), [user, setCurrentUser, isLoading]);

    return (
        <CurrentUserContext.Provider value={value}>
        {children}
        </CurrentUserContext.Provider>
    )
}