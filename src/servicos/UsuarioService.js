import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import Config from "../Config"

class UsuarioService{
    

    async cadastrarUsuario(data){
        return axios({
            url: Config.API_URL + "storeProducts/signup",
            method: "PUT",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async logarUsuario(data){
        return axios({
            url: Config.API_URL + "storeProducts/login",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST,
        }).then((response) => {
            AsyncStorage.setItem("TOKEN", response.data.token);
            AsyncStorage.setItem("NOME_USUARIO", response.data.name);
            const nomeUsuario = AsyncStorage.getItem("NOME_USUARIO");
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
 
}

const usuarioService = new UsuarioService()
export default usuarioService

