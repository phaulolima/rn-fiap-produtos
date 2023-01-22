import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function LojasMaps({lojas = [name, address, latitude, longitude]}) {
    
    let [regiao, setRegiao] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.055,
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
              latitudeDelta: 0.0015,
              longitudeDelta: 0.055,
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
          <Marker 
            coordinate={{
              latitude: lojas[0]?.latitude ? lojas[0]?.latitude : 0,
              longitude : lojas[0]?.longitude ? lojas[0]?.longitude : 0,
            }}
          />
          <Marker 
            coordinate={{
              latitude: lojas[1]?.latitude ? lojas[1]?.latitude : 0,
              longitude : lojas[1]?.longitude ? lojas[1]?.longitude : 0,
            }}
          />
          <Marker 
            coordinate={{
              latitude: lojas[2]?.latitude ? lojas[2]?.latitude : 0,
              longitude : lojas[2]?.longitude ? lojas[2]?.longitude : 0,
            }}
          />
          <Marker
            coordinate={{
              latitude: lojas[3]?.latitude ? lojas[3]?.latitude : 0,
              longitude : lojas[3]?.longitude ? lojas[3]?.longitude : 0,
            }}
          />
          <Marker 
            coordinate={{
              latitude: lojas[4]?.latitude ? lojas[4]?.latitude : 0,
              longitude : lojas[4]?.longitude ? lojas[4]?.longitude : 0,
            }}
          />
        </MapView>
    </View> 
}

const styles = StyleSheet.create({
    
   });