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
    const [ estadoFavorito, setEstadoFavorito ] = useState(favorite);

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
                setEstadoFavorito(!estadoFavorito);
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

    return <View style={estilos.card} >

            <View style={estilos.topCard}>
                <Text style={estilos.preco}>R$ {price}</Text>
                <View style={{ alignItems: "flex-end", width: "100%", position: "absolute"}}>
                    { isLoading && 
                        <ActivityIndicator style={estilos.activityIndicator}/>
                    }
                    <TouchableOpacity onPress={() => favoritarProduto()} style={estilos.containerEstrela}>
                        { !isLoading && <Image source={ getImagem(estadoFavorito) } style={estilos.estrela}/>}
                    </TouchableOpacity>
                </View>
            </View>

            <Text lineBreakMode="true" style={estilos.nome} 
                onPress={aoPressionar} >
                {name} </Text>
            
        </View>
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
    estrela: {
        width: 24,
        height: 24,
    },
    containerEstrela: {
        width: "8%",
    },
    activityIndicator:{
        position: "absolute",
        alignItems: "center",
       
    }
  });
  

