import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function LojasMaps({lojas = [name, address, latitude, longitude]}) {
    
    let [regiao, setRegiao] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.055,
        longitudeDelta: 0.055,
    });

    
    useEffect(() => {
        Geolocation.getCurrentPosition(
          posicao => {
            console.log(posicao);
            console.log("Latitude: ", posicao.coords.latitude);
            console.log('Longitude: ', posicao.coords.longitude);
            //console.log('Lojas:', lojas);
            setRegiao({
              latitude: posicao.coords.latitude,
              longitude: posicao.coords.longitude,
              latitudeDelta: 0.055,
              longitudeDelta: 0.055,
            })
          }
        );
    },[]
    );

    function MarkerRepeat() {
      let arrayMarker = [];
      for (let index = 0; index < lojas.length; index++) {
        arrayMarker.push(
          <Marker 
            title={lojas[index]?.name}
            key={lojas[index]?.name}
            coordinate={{
              latitude: lojas[index]?.latitude ? lojas[index]?.latitude : 0,
              longitude : lojas[index]?.longitude ? lojas[index]?.longitude : 0,
            }}
          />
        );
      }
      return arrayMarker;
    }

    function LojasRepeat() {
      let arrayLojas = [];
      for (let index = 0; index < lojas.length; index++) {
        arrayLojas.push(
          <Text style={estilos.nomeLoja}> - {lojas[index]?.name}</Text>
        );
      }
      return arrayLojas;
    }

    return <View>
        <LojasRepeat/>
        <MapView 
          style={{width: '100%', height: '67%'}}          
          region={regiao}
          showsUserLocation>
        <MarkerRepeat/>
        </MapView>
    </View> 
}

const estilos = StyleSheet.create({
    nomeLoja: {
      padding: 5,
      color: "rgb(237, 20, 91);"
    }
   });