import React, { useEffect, useContext, useState } from "react";
import { View, Text } from "react-native";
import produtoService from "../servicos/ProdutoService";


export default function DetalhesProduto({ route }) {

    const [token, setToken] = useContext(LoginContext);
    const [detalheProduto, setDetalheProduto] = useState({});


    

    async function detalharProduto() {
        const resultListar =  await produtoService.detalharProduto(token, idProduto);
            if (resultListar.status === 200) {
                setDetalheProduto(resultListar.data);
                console.log("=======> DetalheProduto: ", detalheProduto);
            } 
    }

    useEffect(() => {
        detalharProduto();
    }, []);

    return <View>
        <Text>Tela Detalhes do Produto</Text>
        <Text>{route.params.idProduto}</Text>
        DetalhesProduto
    </View>
}