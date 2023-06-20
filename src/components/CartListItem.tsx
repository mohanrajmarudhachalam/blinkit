import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, Button, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
    addToCart,
    cleanCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from '../redux/basketSlice'
const { width, height } = Dimensions.get('window');
import { CardIcon } from './CardIcon';
export interface IShoppingItems {
    _id: string;
    name: string;
    product_image: string;
    newprice: number;
    oldprice: string;
    offerDetails: string;
    counts: string;
    quantity: number;
    owner_id: string,
}
export function CartListItem(props: IShoppingItems) {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();
    const [isCartButton, setIsCartButton] = useState(false);
    const { _id, name, product_image, counts, oldprice, newprice, offerDetails, quantity = 0, owner_id } = props;
    const cart = useSelector((state: any) => state.cart.cart);
    const total = cart.map((item: any) => item.newprice * item.quantity)
        .reduce((curr: any, prev: any) => curr + prev, 0);

    const decremen = () => {

        dispatch(decrementQuantity(props));
    }

    const incremen = () => {
        dispatch(incrementQuantity(props));
    }
    const CartViewButton = () => {
        return (
            <View style={styles.cartShape}>
                <View style={styles.cartListContainer}>
                    <TouchableOpacity onPress={decremen}>
                        <Text style={styles.text_decrement_style}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.text_quantity_style}>{quantity}</Text>
                    <TouchableOpacity onPress={incremen}>
                        <Text style={styles.text_increment_style}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (

        <View style={styles.cart_style_container}>
            <View style={styles.cart_secondary_style_container}>
                <View style={styles.style_cart_view_container}>
                    <CardIcon imageSource={product_image} style={{ alignSelf: 'center' }} />
                </View>
                <View style={styles.style_view_secondary_container}>
                    <View style={styles.counts_main_view_container}>
                        <View style={styles.counts_seconds_contianer}>
                            <Text style={styles.nameText}>{name}</Text>
                            <Text style={styles.qty_text_style}>{counts}</Text>
                        </View>
                        <View style={styles.curreny_main_contaner}>
                            <View style={styles.currency_secondary_contaner}>
                                <Text style={styles.currency_text_style_main}>$</Text>
                                <Text style={styles.newprice_text_style}>{newprice}</Text>
                            </View>
                            <View style={styles.oldprice_container}>
                                <Text style={styles.old_price_currency_text_style}>$</Text>
                                <Text style={styles.old_price_style_text_style}>{oldprice}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.cart_view_contianer}>
                    <CartViewButton />
                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({

    nameText: {
        fontSize: 14,
        fontFamily: 'Quicksand-Bold',
        marginLeft: 10,
        color: '#fff',
        flexWrap: 'wrap'
    },
    CircleShape: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: '#6FCF97',
        marginLeft: 15
    },

    cartShape: {
        width: 70,
        height: 25,
        borderRadius: 15,
        backgroundColor: '#6FCF97',
        marginLeft: -5,
        flexDirection: 'row'
    },

    itemViewShape: {
        width: width,
        height: 25,
        borderRadius: 15,
        margin: 10,
        backgroundColor: '#FFC107',
        flexDirection: 'row'
    },
    cartListContainer: {
        marginTop: 0, flexDirection: 'row'
    },
    text_decrement_style: {
        alignItems: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, marginLeft: 10, fontSize: 20, color: 'white', fontFamily: 'Quicksand'
    },
    text_quantity_style: {
        marginLeft: 10, fontSize: 18, color: 'white', fontFamily: 'Quicksand'
    },
    text_increment_style: {
        alignItems: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, marginLeft: 10, fontSize: 20, color: 'white', fontFamily: 'Quicksand'
    },
    cart_style_container: {
        flex: 1, marginLeft: 20
    },
    cart_secondary_style_container: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    style_cart_view_container: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26, elevation: 5,
        backgroundColor: '#2F2F2F',
        padding: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        margin: 5,
        justifyContent: 'center',
        borderColor: '#CCCCCC',
        width: 80,
        height: 80,
        borderRightWidth: 0.2,
        borderLeftWidth: 0.2,
        borderTopWidth: 1.5
    },
    style_view_secondary_container: {
        marginTop: 10, width: '50%'
    },
    counts_main_view_container: {
        flexDirection: 'column'
    },
    counts_seconds_contianer: {
        flexDirection: 'column'
    },
    qty_text_style: {
        fontFamily: 'Quicksand', color: 'white', marginLeft: 10, alignItems: 'center', marginTop: 5
    },
    curreny_main_contaner: {
        flexDirection: 'row'
    },
    currency_secondary_contaner: {
        flexDirection: 'row'
    },
    currency_text_style_main: {
        fontFamily: 'Quicksand-Bold', color: '#FFC107', marginTop: 10, marginLeft: 10, alignItems: 'center', fontSize: 12
    },
    newprice_text_style: {
        fontFamily: 'Quicksand-Bold', color: '#FFC107', marginTop: 10, marginLeft: 2, alignItems: 'center', fontSize: 16
    },
    oldprice_container: {
        flexDirection: 'row', marginTop: 12
    },
    old_price_currency_text_style: {
        fontFamily: 'Quicksand', color: '#FFFFFF', marginLeft: 5, alignItems: 'center', fontSize: 12
    },
    old_price_style_text_style: {
        fontFamily: 'Quicksand', color: '#FFFFFF', marginLeft: 2, alignItems: 'center', fontSize: 12, textDecorationLine: "line-through"
    },
    cart_view_contianer: {
        justifyContent: 'center', marginRight: 10
    }
});
export default CartListItem;