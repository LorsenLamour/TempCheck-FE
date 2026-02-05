import React, { useContext } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit"
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ThemeContext } from "../../context/ThemeContext";
import { lightColors, darkColors } from "../../assets/colorPalette/colorsPalette"

export default function Dashboard() {

    // const { user } = useContext(CurrentUserContext);
    // const { theme } = useContext(ThemeContext);
    
    // const colors = theme === "light" ? lightColors : darkColors; 

    // const alertes = user?.alerts || [];


    // const alertsPerDay = alertes.reduce((acc, alert) => {
    // acc[alert.date] = (acc[alert.date] || 0) + 1;
    // return acc;
    // }, {});
    // console.log(alertsPerDay)

    // const sortedDates = Object.keys(alertsPerDay).sort(
    // (a, b) => new Date(a) - new Date(b)
    // );
    // console.log(sortedDates)

    // const labels = sortedDates.map(d =>
    // new Date(d).toLocaleDateString("fr-CA", { 
    //     day: "2-digit",
    //     month: "short"
    // })
    // );
    // console.log(labels)

    // const values = sortedDates.map(d => alertsPerDay[d]);
    // console.log(values)

    return (
        <View style={style.container}>
            {/* <View style={style.info}>
                <Image
                    source={require("../../assets/images/profil.jpg")}
                    style={style.image}
                />
                
                <View style={style.textContainer}>
                    <Text style={[style.username, { color: colors.text }]}>{user?.username}</Text>
                    <Text style={[style.role, { color: colors.text }]}>{user?.role}</Text>
                </View>
            </View>
            <View style={style.dashboardContainer}>
                <View style={{ flexDirection: "row", gap: 40, marginBottom: 20}}>
                    <TouchableOpacity style={style.dataBtn}>
                        <Text style={style.dataTxt}>Jour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.dataBtn}>
                        <Text style={style.dataTxt}>Semaine</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.dataBtn}>
                        <Text style={style.dataTxt}>Mois</Text>
                    </TouchableOpacity>
                </View>
                <LineChart
                    data={{
                        labels,
                        datasets: [{ data: values }]
                    }}
                    width={Dimensions.get("window").width - 40}
                    height={420}
                    chartConfig={{
                        backgroundColor: "#9db9b8",
                        backgroundGradientFrom: "#9db9b8",
                        backgroundGradientTo: "#9db9b8",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#2659ff" },
                    }}
                    bezier
                    />

            </View> */}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
  },
    info: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
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
  dashboardContainer: {
    flex: 1,
    marginTop: 50
  },
  dataBtn: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 20,
    width: 100
  },
  dataTxt: {
    textAlign: "center"
  }
})