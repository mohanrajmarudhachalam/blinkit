import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
export function CategoryIcon({ imageSource, text }:any){
  return (
    <View>
      {/* <Image source={imageSource} style={style.image} /> */}
      <Image source={{ uri: `data:image/png;base64,${imageSource}`}} style={style.image} />
    </View>
  );
};

const style = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    alignSelf:'center',
    alignItems:'center',
    resizeMode : "contain"
  },
});