import React, {useState, useContext} from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import estrela from '../assets/estrela.png';
import estrelaCinza from '../assets/estrelaCinza.png';
import { useNavigation } from "@react-navigation/native";
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";


export default function ItemLista({name, price, favorite, _id, aoPressionar}) {
    

    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useContext(LoginContext);

    const navigation = useNavigation();

    let requisicaoFavotirar = {
        productID: _id,
    }

    function favoritarProduto() {
        console.log("favotirar!");
        setLoading(true);
        produtoService.favoritarProduto(token, requisicaoFavotirar).then((response) => {
            if(response.status === 200){
                setLoading(false);
            } else {
                setLoading(false);
            }
        })
    }

    const getImagem = (favorite) => {
        if (favorite) {
            return estrela;
        } 
        return estrelaCinza;
    }

    return <View style={estilos.item} >
            <TouchableOpacity onPress={() => favoritarProduto()}>
                <Image  source={ getImagem(favorite) } style={estilos.estrela}/>
            </TouchableOpacity>
            { isLoading && 
                <ActivityIndicator />
            }
            <Text lineBreakMode="true" style={estilos.nome} 
                onPress={aoPressionar} >
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
  

