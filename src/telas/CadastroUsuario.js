import React, {useState} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button, Input } from 'react-native-elements';
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Styles from "../MainStyle";


export default function CadastroUsuario() {

    const iconeEvelope = <FontAwesomeIcon icon={ faEnvelope } />;
    const iconeCadeado = <FontAwesomeIcon icon= { faLock } />;
    const iconePessoa = <FontAwesomeIcon icon= { faUser } />;
    const iconeTelefone  = <FontAwesomeIcon icon= { faPhone } />;

    const [name, setNome] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

     
     
     
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

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} 
            style={Styles.botaoPrincipal}>
            <Text style={Styles.textoBotaoPrincipal}>CADASTRAR</Text>
        </TouchableOpacity>
    </View>
    
}