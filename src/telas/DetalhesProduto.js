import React, { useEffect, useContext, useState } from "react";
import { View, Text } from "react-native";
import produtoService from "../servicos/ProdutoService";
import LoginContext from "../context/LoginContext";



export default function DetalhesProduto({ route }) {

    const [token, setToken] = useContext(LoginContext);
    const [detalheProduto, setDetalheProduto] = useState({});

    console.log("route: ", route.params);

    const produtoSelecionado = route.params;


    async function detalharProduto() {
        const resultListar =  await produtoService.detalharProduto(token, produtoSelecionado._id);
            if (resultListar.status === 200) {
                setDetalheProduto(resultListar.data.product);
                console.log("=======> DetalheProduto: ", resultListar.data.product);
            } 
    }

    useEffect(() => {
        detalharProduto();
    }, []);

    return <View>
        <Text>{detalheProduto.name}</Text>
    </View>
}