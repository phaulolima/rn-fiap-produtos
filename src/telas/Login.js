import React, {useState, useContext} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button, Input } from 'react-native-elements';
import Styles from "../MainStyle";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons/';
import usuarioService from "../servicos/UsuarioService";
import { useNavigation } from "@react-navigation/native";

import LoginContext from "../context/LoginContext";


export default function Login(){

    const iconeEvelope = <FontAwesomeIcon icon={ faEnvelope } />;
    const iconeCadeado = <FontAwesomeIcon icon= { faLock } />;

    const [email, setEmail] = useState("phaulolima@gmail.com");
    const [password, setPassword] = useState("12345678");

    let dadosLogin = {
        email: email,
        password: password
    };

    const [isLoading, setLoading] = useState(false);

    const [token, setToken] = useContext(LoginContext);

    const navigation = useNavigation();


    const logar = () => {
        setLoading(true);
        usuarioService.logarUsuario(dadosLogin).then((response) => {
            if(response.status === 200){
                console.log("-------- Passou no logar!");
                console.log("-- STATUS RESPONSE " + response.status);
                setLoading(false);
   
                console.log("********************** teste: ", token);
                setToken(response.data.token);
                navigation.navigate('Produtos');
            } else {
                setLoading(false);
                Alert.alert("Erro", "Ops!!! 'Usuário' ou 'Senha' inválido(s)!");
            }
        })
    };

    return (
        <View style={estilos.viewContainer}>
            <Text>Fazer login</Text>
            <Input
                placeholder="E-mail"
                leftIcon={iconeEvelope}
                onChangeText={value => setEmail(value)}
                keyboardType="email-address" />
            <Input
                placeholder="Sua senha"
                leftIcon={iconeCadeado}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true} />

                { isLoading && 
                    <ActivityIndicator />
                }
        
                <TouchableOpacity 
                    onPress={() => logar()} 
                    style={estilos.botao}
                    disabled={isLoading}>
                    <Text style={estilos.textoBotao}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => usuarioService.alerta()} 
                    style={estilos.botao}
                    disabled={isLoading}>
                    <Text style={estilos.textoBotao}>CADASTRAR</Text>
                </TouchableOpacity>
        </View>
    )
}


const estilos = StyleSheet.create({

    viewContainer: {
        paddingTop: 50,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    specificContainer: {
      backgroundColor: "#fff"
    },
    button: {
      width: "100%",
      marginTop: 50,
      alignContent: "center"
    },
    botao: {
        marginTop: 16,
        backgroundColor: "#2A9F85",
        paddingVertical: 16,
        borderRadius: 6
    },
    textoBotao: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: 16,
        lineHeight: 26,
        fontWeight: "bold"
    }
  });