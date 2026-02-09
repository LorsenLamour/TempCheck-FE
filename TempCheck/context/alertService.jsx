import api from "../apiConfig";

export const getAlertHistorique = async () => {
    return api.get("/alertHistorique")
};

export const saveAlert = async (alertData) => {
    return api.post("/saveAlert", alertData)
}