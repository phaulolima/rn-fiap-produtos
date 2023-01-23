import React, {useState, useContext} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Input } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons/';
import { useNavigation } from "@react-navigation/native";

import Styles from "../MainStyle";
import usuarioService from "../servicos/UsuarioService";
import LoginContext from "../context/LoginContext";
import { useEffect } from "react";
import Topo from "./Topo";


export default function Login({ route }) {

    if (route) {
        console.log("route.params", route);
    }
    if (route && route.name === "Sair") {
        console.log("Entrou no apagar senha!");
        AsyncStorage.setItem("SENHA_FIAP_LOGIN", "");
    }
    const iconeEvelope = <FontAwesomeIcon icon={ faEnvelope } />;
    const iconeCadeado = <FontAwesomeIcon icon= { faLock } />;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let dadosLogin = {
        email: email,
        password: password
    };

    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useContext(LoginContext);
    const navigation = useNavigation();


    async function logar() {
        setLoading(true);
        const response =  await  usuarioService.logarUsuario(dadosLogin);
        if(response.status === 200){
            AsyncStorage.setItem("EMAIL_FIAP_LOGIN", dadosLogin.email);
            AsyncStorage.setItem("SENHA_FIAP_LOGIN", dadosLogin.password);
            setLoading(false);
            setToken(response.data.token);
            navigation.reset({
                index: 0,
                routes: [{name: "Produtos"}]
                })
        } else {
            setLoading(false);
            Alert.alert("Erro", "Ops!!! 'Usuário' ou 'Senha' inválido(s)!");
        }
    };

    async function loginAutomatico() {
        const emailLogin =  await AsyncStorage.getItem("EMAIL_FIAP_LOGIN");
        if (emailLogin.length > 0) {
            setEmail(emailLogin);
            dadosLogin.email = emailLogin;
        }
        const senhaLogin = await AsyncStorage.getItem("SENHA_FIAP_LOGIN");
        if ((senhaLogin && senhaLogin.length) > 0 && (emailLogin &&emailLogin.length > 0)) {
            setPassword(senhaLogin);
            dadosLogin.password = senhaLogin;
            logar();
        }
    }
  
    useEffect(() => {
        loginAutomatico();
    }, []);

    return ( <>
        <Topo exibeVoltar={false}/>
        <View style={Styles.viewContainer}>
            <Text>Fazer login</Text>
            <Input
                placeholder="E-mail"
                leftIcon={iconeEvelope}
                onChangeText={value => setEmail(value)}
                keyboardType="email-address" 
                value={email}/>
            <Input
                placeholder="Senha"
                leftIcon={iconeCadeado}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true} 
                value={password}/>

                { isLoading && 
                    <ActivityIndicator />
                }
        
                <TouchableOpacity 
                    onPress={() => logar()} 
                    style={Styles.botaoPrincipal}
                    disabled={isLoading}>
                    <Text style={Styles.textoBotaoPrincipal}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} 
                    style={Styles.botaoSecundario}
                    disabled={isLoading}>
                    <Text style={Styles.textoBotaoSecundario}>CRIAR CONTA</Text>
                </TouchableOpacity>
        </View>
        </>
    )     
}




const estilos = StyleSheet.create({});