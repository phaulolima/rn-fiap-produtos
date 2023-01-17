import React from 'react';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  viewContainer: {
    paddingTop: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },


  tituloSecundario: {
    width: "100%",
    position: "relative",
    textAlign: "left",
    fontSize: 24,
    lineHeight: 26,
    color: "rgb(237, 20, 91)",
    fontWeight: "bold",
    padding: 12,
  },

  botaoPrincipal: {
    marginTop: 16,
    backgroundColor: "#2A9F85",
    paddingVertical: 16,
    borderRadius: 8
  },

  textoBotaoPrincipal: {
      textAlign: "center",
      color: "#ffffff",
      fontSize: 16,
      lineHeight: 26,
      fontWeight: "bold"
  },

  botaoSecundario: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 8,
    borderColor: "#2A9F85",
    borderStyle: "solid",
    borderWidth: 2
  },

  textoBotaoSecundario: {
      textAlign: "center",
      color: "#2A9F85",
      fontSize: 16,
      lineHeight: 26,
      fontWeight: "bold"
  }

  });

export default Styles