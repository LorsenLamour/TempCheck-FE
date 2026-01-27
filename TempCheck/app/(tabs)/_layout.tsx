import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: "Accueil" }} />
        <Tabs.Screen name="parametres" options={{ title: "Paramètres" }} />
        <Tabs.Screen name="historique" options={{ title: "Historique "}} />
        <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
     </Tabs>
  );
}