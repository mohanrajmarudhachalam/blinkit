import React from "react"
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ListRenderItem, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
FontAwesome.loadFont();
export function EmptyCartpage(): React.ReactElement {
    const navigation = useNavigation<any>();
    const navigateProduct = () => {
        navigation.navigate('Home')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.empty_cart_message_container}>
                    <TouchableOpacity onPress={navigateProduct}>
                        <FontAwesome name='angle-left' size={30} style={styles.fa_left_arrow_style} />
                    </TouchableOpacity>
                    <View style={styles.header_text_container}>
                        <Text style={styles.header_text_style}>Order Details</Text>
                    </View>
                </View>
                <View style={styles.cart_message}>
                  <Text style={styles.msgtext}>Your cart is empty</Text>
                </View>
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252525',
    },
    cart_message:{
        justifyContent: 'center', 
        position: 'relative',
        height: 500,
        alignItems: 'center',
    },
    msgtext:{
        fontFamily: 'Quicksand-Bold', color: '#B0B0B0', fontSize: 16,  alignItems: 'center', 
    },
    empty_cart_message_container:{
        flexDirection: 'row'
    },
    fa_left_arrow_style:{
        alignItems: 'center', color: '#F2F2F2', marginLeft: 25
    },
    header_text_container:{
        alignItems: 'center', justifyContent: 'center', width: '80%' 
    },
    header_text_style:{
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 16 
    }

})