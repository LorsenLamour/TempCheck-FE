import axios from "axios";
import { useEffect, useState } from "react";
 
const TemperatureList = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/temperature/")
      .then((response) => {
        console.log("Données reçues:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }, []);
 
  return (
    <div>
        {data?.temperature || 0}
    
    </div>
  );
};
 
export default TemperatureList;


