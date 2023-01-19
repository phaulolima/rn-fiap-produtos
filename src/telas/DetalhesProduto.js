import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";
import estrela from "../assets/estrela.png";
import estrelaCinza from "../assets/estrelaCinza.png";
import Styles from "../MainStyle";
import BotaoFavoritar from "../componentes/botaoFavoritar";
import FormatCurrency from "../componentes/formatCurrency";


export default function DetalhesProduto({ route }) {


    function getImagem (favorite) {
        if (favorite) {
            return estrela;
        } 
        return estrelaCinza;
    }
    /* Não mudar essa constante de ordem com as demais */
    const {_id, favorite, name, price} = route.params;

    const [token, setToken] = useContext(LoginContext);
    const [detalheProduto, setDetalheProduto] = useState({});
    const [ estadoFavorito, setEstadoFavorito ] = useState(favorite);



    async function detalharProduto() {
        const resultListar =  await produtoService.detalharProduto(token, _id);
            if (resultListar.status === 200) {
                setDetalheProduto(resultListar.data.product);
            } 
    }

    useEffect(() => {
        console.log(estadoFavorito);
        if (estadoFavorito === undefined) {
            setEstadoFavorito(true);
        }
        detalharProduto();
    }, []);

    return <View style={estilos.container}>
        <View style={estilos.header}>
            <Text style={Styles.tituloSecundario}>Detalhes do Produto</Text>
            <View style={estilos.estrela}>
                <BotaoFavoritar favorite={favorite} id={_id}/>
            </View>
        </View>
        <Text style={estilos.nome} lineBreakMode="true">{name}</Text>

        <View style={estilos.precoView}>
            <Text>MENOR PREÇO ENCONTRADO</Text>
            <FormatCurrency amount={price} style={estilos.preco}/>
        </View>
    </View>
}

const estilos =  StyleSheet.create({

    container: {
        padding: 5
    },
    item: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC",
        paddingVertical: 16,
        marginHorizontal: 16,
        alignItems: "center",
    },
    nome: {
        fontSize: 18,
        lineHeight: 26,
        marginLeft: 11,
        marginTop: 15,
        color: "#464646",
        width: "95%",
        fontWeight: "bold"
      },
    preco: {
        fontSize: 24,
        lineHeight: 26,
        marginLeft: 11,
        color: "#2A9F85",
        fontWeight: "bold",
        lineHeight: 40
    },
    precoView: {
        marginTop: 20,
        padding: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DCDCDC",
        borderRadius: 20
    },

    estrela: {
        width: 24,
        height: 24,
        flexDirection: "row-reverse",
        marginBottom: "4%",
        marginLeft: "10%"
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-end"
    }
  });
  

