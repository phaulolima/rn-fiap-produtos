import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import BotaoFavoritar from "./botaoFavoritar";


export default function ItemLista({name, price, favorite, _id, aoPressionar}) {
    

    return <TouchableOpacity style={estilos.card} onPress={aoPressionar}>
            <View style={estilos.topCard}>
                <Text style={estilos.preco}>R$ {price}</Text>
                <View style={estilos.viewFavoritar}>
                   <BotaoFavoritar favorite={favorite} id={_id}/>
                </View>
            </View>
            <Text lineBreakMode="true" style={estilos.nome}> {name} </Text>
        </TouchableOpacity>
}

const estilos =  StyleSheet.create({
    card: {
        // Android
        elevation: 4,
        // iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: '#F6F6F6',
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 6,
        padding: 8
    },
    topCard: {
        flexDirection: "row",
    },
    nome: {
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 5,
        color: "#464646",
    },
    preco: {
        fontSize: 18,
        lineHeight: 26,
        marginLeft: 5,
        color: "#2A9F85",
        fontWeight: "bold",
    },
    viewFavoritar: { 
        alignItems: "flex-end", 
        width: "100%", 
        position: "absolute"
    }
  });