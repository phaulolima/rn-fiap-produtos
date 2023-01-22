import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';



export default function LojasMaps({lojas = [name, address, latitude, longitude]}) {
    
    let [regiao, setRegiao] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });

    
    useEffect(() => {
      Geolocation.getCurrentPosition(
        posicao => {
          console.log(posicao);
          console.log("Latitude: ", posicao.coords.latitude);
          console.log('Longitude: ', posicao.coords.longitude)
          setRegiao({
            latitude: posicao.coords.latitude,
            longitude: posicao.coords.longitude,
            latitudeDelta: 0.014,
            longitudeDelta: 0.014,
          })
        }
      );
    },[]
    );

    return <View>
        <Text>{lojas[1]?.name}</Text>
        <MapView 
          style={{width: '100%', height: '67%'}}          
          region={regiao}
          showsUserLocation>
        </MapView>

    </View> 
    

}

const styles = StyleSheet.create({
    
   });