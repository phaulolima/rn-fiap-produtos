import React, {useContext} from "react";
import { SafeAreaView, View, StyleSheet, Image, Text, Linking} from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import UsuarioContext from '../context/UsuarioContext';
import usuarioIcone from '../assets/user-profile.png'

const Usuario = (props) => {

  const [usuario, setUsuario] = useContext(UsuarioContext);

  return ( <SafeAreaView style={{flex: 1}}>
      <Image
        source={usuarioIcone}
        style={estilos.sideMenuProfileIcon}
      />
      <Text style={estilos.saudacaoUsuario}>Olá, {usuario}</Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        FIAP - React Native
      </Text>
    </SafeAreaView>
  );
};

export default Usuario;

const estilos = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    margin: "5%"
  },
  saudacaoUsuario: {
    textAlign: "center",
    marginBottom: "5%"
  }
});