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
                setLoading(false);
                setToken(response.data.token);
                navigation.navigate('Produtos');
            } else {
                setLoading(false);
                Alert.alert("Erro", "Ops!!! 'Usuário' ou 'Senha' inválido(s)!");
            }
        })
    };

    return (
        <View style={Styles.viewContainer}>
            <Text>Fazer login</Text>
            <Input
                placeholder="E-mail"
                leftIcon={iconeEvelope}
                onChangeText={value => setEmail(value)}
                keyboardType="email-address" />
            <Input
                placeholder="Senha"
                leftIcon={iconeCadeado}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true} />

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
    )
}


const estilos = StyleSheet.create({});