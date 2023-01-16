import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import Config from "../Config"

class UsuarioService{
    

    async cadastrarUsuario(data){
        return axios({
            url: Config.API_URL + "storeProducts/signup",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST
        }).then((response) => {
            console.log('Response 200 - Cadastrar usuário: ', response);
            return Promise.resolve(response)
        }).catch((error) => {
            console.log('Response error: ', error);
            return Promise.reject(error)
        })
    }

    async logarUsuario(data){
        console.log("Dados de login do usuário:", data);
        return axios({
            url: Config.API_URL + "storeProducts/login",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST,
        }).then((response) => {
            console.log("-------- Passou no sucesso login!");
            AsyncStorage.setItem("TOKEN", response.data.token);
            AsyncStorage.setItem("NOME_USUARIO", response.data.name);
            console.log("--- Nome do usuário logado: ", response.data.name);
            const nomeUsuario = AsyncStorage.getItem("NOME_USUARIO");
            console.log("-----***** => ", nomeUsuario);
            return Promise.resolve(response)
        }).catch((error) => {
            console.log('Erro login: ', error);
            return Promise.reject(error)
        })
    }
 
}

const usuarioService = new UsuarioService()
export default usuarioService

