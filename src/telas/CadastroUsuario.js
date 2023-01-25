import React, {useState} from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Input } from 'react-native-elements';
import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import Styles from "../MainStyle";
import usuarioService from "../servicos/UsuarioService";
import Topo from "./Topo";


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

     
    async function cadastrarUsuario() {
        setLoading(true);
        await usuarioService.cadastrarUsuario(dadosCadastro)
        .then(response => {
            setLoading(false)
            navigation.navigate('Login')
        })
        .catch(error => {
            setLoading(false)
            Alert.alert("Ocorreu um erro: ", error.message)
        })
    };

    async function validarCadastrar() {

       const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

       try {
        const schema = Yup.object().shape({
            password: Yup.string().required("A senha é obrigatória!"),
            email: Yup.string().required("O e-mail é obrigatório!").email("Este e-mail não é válido!"),
            phone: Yup.string().required("O telefone é obrigatório!").matches(phoneRegExp, "O telefone não é válido!"),
            name: Yup.string().required("O nome é obrigatório!")
        })

        await schema.validate({name, phone, email, password});
        cadastrarUsuario();
        
       } catch (error) {
           console.log(error);
            if (error instanceof Yup.ValidationError){
                Alert.alert(error.message);
            }
       }
    };
     
    return <>
        <Topo exibeVoltar={true}/>
        <View style={Styles.viewContainer}>
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

            <TouchableOpacity 
                onPress={() => validarCadastrar()} 
                style={Styles.botaoPrincipal}>
                <Text style={Styles.textoBotaoPrincipal}>CADASTRAR</Text>
            </TouchableOpacity>
        </View>
    
    
    </>
        
    
}