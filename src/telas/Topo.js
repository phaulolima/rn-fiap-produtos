import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import VoltarSVG from '../assets/voltar.svg';


export default function Topo(){

    const navigation = useNavigation();

    return <View style={estilos.viewContainer}>
        <Text onPress={() => navigation.goBack()} style={estilos.tituloApp}>FIAP APPP</Text>
        <TouchableOpacity 
          onPress={() => { navigation.goBack() }}
          style={estilos.botaoVoltar}>
          <VoltarSVG style={estilos.voltar} />
        </TouchableOpacity>
    </View>
}


const estilos = StyleSheet.create({
    viewContainer: {
      width: "100%",
      height: "10%",
    },
    tituloApp: {
      fontSize: 24,
      textAlign: "center",
      paddingVertical: "5%",
      fontWeight: "bold",
      color: "rgb(237, 20, 91);"
    },
    botaoVoltar: {
      position: 'absolute',
      padding: 17,
      paddingVertical: "45%",
    },
    voltar: {
      width: 24,
      height: 24,
      color: "rgb(237, 20, 91);",
      
    },
  });