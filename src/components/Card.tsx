import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
export function Card(props:any){
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
      )
}
const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 10,
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        margin:5,
        justifyContent:'center',
        width: 110, 
        height: 110,
      }
})