import React, {useState} from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Input } from 'react-native-elements';
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";

import Styles from "../MainStyle";
import usuarioService from "../servicos/UsuarioService";
import LoginContext from "../context/LoginContext";


export default function CadastroUsuario() {

    const iconeEvelope = <FontAwesomeIcon icon={ faEnvelope } />;
    const iconeCadeado = <FontAwesomeIcon icon= { faLock } />;
    const iconePessoa = <FontAwesomeIcon icon= { faUser } />;
    const iconeTelefone  = <FontAwesomeIcon icon= { faPhone } />;

    const navigation = useNavigation();

    const [isLoading, setLoading] = useState(false);

    const [name, setNome] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



    let dadosCadastro = {
        name: name,
        phone: phone,
        email: email,
        password: password
    };

     
    const cadastrarUsuario = () => {
        setLoading(true);
        usuarioService.cadastrarUsuario(dadosCadastro).then((response) => {
            console.log("********", response.status)
            if(response.status === 200){
                setLoading(false);
                navigation.navigate('Login');
            } else {
                setLoading(false);
                Alert.alert("Erro", "Ops!!! 'Não foi possível realizar o seu cadastro!");
            }
        })
    };
     
    return <View style={Styles.viewContainer}>
        <Text style={Styles.tituloSecundario} >Cadastrar usuário</Text>

        <Input
            placeholder="Nome"
            leftIcon={iconePessoa}
            onChangeText={value => setNome(value)}
            keyboardType="default" />
        <Input
            placeholder="Telefone"
            leftIcon={iconeTelefone}
            onChangeText={value => setPhone(value)}
            keyboardType="phone-pad" />
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

        <TouchableOpacity onPress={() => cadastrarUsuario()} 
            style={Styles.botaoPrincipal}>
            <Text style={Styles.textoBotaoPrincipal}>CADASTRAR</Text>
        </TouchableOpacity>
    </View>
    
}