import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import estrela from '../assets/estrela.png';
import estrelaCinza from '../assets/estrelaCinza.png';
import { useNavigation } from "@react-navigation/native";



export default function ItemLista({ item: {name, price, favorite }}) {
    
    const getImagem = (favorite) => {
        if (favorite) {
            return estrela;
        } 
        return estrelaCinza;
    }

    return <View style={estilos.item} >
            <Image source={ getImagem(favorite) } style={estilos.estrela}/>
            <Text lineBreakMode="true" style={estilos.nome} 
                onPress={ () => alert("Detalhar")} >
                {name} </Text>
            <Text style={estilos.preco}>R$ {price}</Text>
        </View>
}


const estilos =  StyleSheet.create({
    item: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC",
        paddingVertical: 16,
        marginHorizontal: 16,
        alignItems: "center",
    },
    nome: {
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 11,
        color: "#464646",
        width: "67%"
      },
    preco: {
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 11,
        color: "#2A9F85",
        fontWeight: "bold",
    },
    estrela: {
        width: 24,
        height: 24,
       
    },
  });
  

