import React, {useState, useContext} from "react";
import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import estrela from '../assets/estrela.png';
import estrelaCinza from '../assets/estrelaCinza.png';
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";



export default function BotaoFavoritar({favorite, id}) {

    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useContext(LoginContext);
    const [ estadoFavorito, setEstadoFavorito ] = useState(favorite);

    let requisicaoFavotirar = {
        productID: id,
    }

    function favoritarProduto() {
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
        if (favorite || favorite === undefined) {
            return estrela;
        } 
        return estrelaCinza;
    }

    return  <>
        { isLoading && 
            <ActivityIndicator style={estilos.activityIndicator}/>
        }
        <TouchableOpacity onPress={() => favoritarProduto()} style={estilos.containerEstrela}>
            { !isLoading && <Image source={ getImagem(estadoFavorito) } style={estilos.estrela}/>}
        </TouchableOpacity>
    </>
}

const estilos =  StyleSheet.create({
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