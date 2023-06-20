import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


export function CategoryProductIcon({ imageSource, text }:any){
  return (
    <View>
   
     <Image source={{ uri: `data:image/png;base64,${imageSource}`}} style={style.image} />

    </View>
  );
};

const style = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    alignSelf:'center',
    alignItems:'center',
    resizeMode : "contain"
  },
});