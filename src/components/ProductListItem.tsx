import React, { useState, useCallback } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, Button, Dimensions, Pressable } from 'react-native';
import { CategoryProductIcon } from './CategoryProductIcon';
import { Path, G, Svg, Rect } from 'react-native-svg';
import { ProductCategory } from '../database/ProductCategorySchema';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useUser } from "@realm/react";
import { realmContext } from '../database/RealmContext';
const { useRealm, useQuery } = realmContext;
import { CartProduct } from '../database/CartSchema';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../redux/basketSlice'
FontAwesome.loadFont();
const { width, height } = Dimensions.get('window');
import { BSON } from "realm";
export interface productDetails {
    _id: BSON.ObjectId;
    name: string;
    product_image: string;
    oldprice: number;
    newprice: number;
    offerDetails: string;
    category_id: string;
    subcategory_id: string;
    counts: string;
    owner_id: string;
    quantity: number;
}
export function ProductListItem(props: productDetails) {
    const dispatch = useDispatch();
    const { _id, name, product_image, counts, oldprice, newprice, offerDetails, quantity = 0, owner_id } = props;
    const [additems, setAddItems] = useState(0);
    const [selected, setSelected] = useState(false);
    const cartdata = useSelector((state: any) => state.cart.cart.filter((item: any) => item._id === _id));
    return (
        <View>
            <View style={styles.product_list_contianer}>
                <View>
                    <View style={{ flexDirection: 'column' }}>
                        <Svg width="29" height="29" viewBox="0 0 29 29" fill="none" style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 5 }}>
                            <Path
                                fill="#EB5757"
                                d="M12.6172 0.917844C13.6514 -0.135585 15.3486 -0.135584 16.3828 0.917845L17.3205 1.87301C17.9242 2.48796 18.7902 2.76933 19.6401 2.62668L20.9602 2.40511C22.416 2.16075 23.7891 3.15837 24.0066 4.6185L24.2038 5.94242C24.3308 6.79478 24.866 7.53142 25.6374 7.91556L26.8356 8.51222C28.157 9.17027 28.6815 10.7844 27.9992 12.0935L27.3806 13.2805C26.9823 14.0447 26.9823 14.9553 27.3806 15.7195L27.9992 16.9065C28.6815 18.2156 28.157 19.8297 26.8356 20.4878L25.6374 21.0844C24.866 21.4686 24.3308 22.2052 24.2038 23.0576L24.0066 24.3815C23.7891 25.8416 22.416 26.8392 20.9602 26.5949L19.6401 26.3733C18.7902 26.2307 17.9242 26.512 17.3205 27.127L16.3828 28.0822C15.3486 29.1356 13.6514 29.1356 12.6172 28.0822L11.6795 27.127C11.0758 26.512 10.2098 26.2307 9.3599 26.3733L8.03984 26.5949C6.58397 26.8392 5.21087 25.8416 4.99338 24.3815L4.79618 23.0576C4.66922 22.2052 4.13402 21.4686 3.36261 21.0844L2.16442 20.4878C0.842971 19.8297 0.318492 18.2156 1.00078 16.9065L1.61943 15.7195C2.01772 14.9553 2.01772 14.0447 1.61943 13.2805L1.00078 12.0935C0.318492 10.7844 0.842972 9.17026 2.16442 8.51222L3.36261 7.91556C4.13402 7.53142 4.66922 6.79478 4.79618 5.94242L4.99338 4.61849C5.21087 3.15837 6.58397 2.16075 8.03984 2.40512L9.3599 2.62668C10.2098 2.76933 11.0758 2.48796 11.6795 1.87301L12.6172 0.917844Z"
                            />
                            <View>
                                <Text style={styles.offer_details_text_style}>{offerDetails} {'\n'}off</Text>
                            </View>

                        </Svg>
                        <CategoryProductIcon imageSource={product_image} />
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.count_text_style}>{counts}</Text>
                    </View>
                    <View style={styles.price_contianer}>
                        <View style={styles.price_contianer_secondary}>
                            <View style={styles.new_price_container}>
                                <Text style={styles.curreny_text_container}>$</Text>
                                <Text style={styles.new_price_text_style}>{newprice}</Text>
                            </View>
                            <View style={styles.oldprice_contianer}>
                                <Text style={styles.old_price_currency_text}>$</Text>
                                <Text style={styles.old_price_text_style}>{oldprice}</Text>
                            </View>

                        </View>
                        <View style={styles.pressable_container}>
                            <Pressable onPress={() => {
                                if (additems === 1) {
                                    dispatch(removeFromCart(props))
                                    setSelected(false)
                                    setAddItems(0);
                                } else {
                                    setAddItems((c) => c - 1);
                                    dispatch(decrementQuantity(props))

                                }
                            }}>
                                {selected ? (
                                    <>
                                        <View style={styles.cartShape}>
                                            <View style={styles.cart_container}>
                                                <Pressable onPress={() => {
                                                    if (additems === 1) {
                                                        dispatch(removeFromCart(props))
                                                        setSelected(false)
                                                        setAddItems(0);
                                                    } else {
                                                        setAddItems((c) => c - 1);
                                                        dispatch(decrementQuantity(props))

                                                    }
                                                }}>
                                                    <Text style={styles.decrement_text_style}>-</Text>
                                                </Pressable>
                                                <Text style={styles.add_items_text_style}>{additems}</Text>
                                                <Pressable onPress={() => {
                                                    setAddItems((c) => c + 1);
                                                    dispatch(incrementQuantity(props))
                                                }}>
                                                    <Text style={styles.increment_text_style}>+</Text>
                                                </Pressable>
                                            </View>

                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Pressable onPress={() => {
                                            setSelected(true);
                                            if (additems == 0) {
                                                setAddItems((quantity) => quantity + 1);
                                            }
                                            dispatch(addToCart({ _id, name, product_image, newprice, oldprice, counts, quantity }));
                                        }}>
                                            <View style={styles.CircleShape}>
                                               {/*  <Text style={styles.plus_text_style}>+</Text> */}
                                               <FontAwesome
                                                    name="plus"
                                                    size={20}
                                                    style={{
                                                        alignSelf: 'center',
                                                        color:"#FFFFFF",
                                                        textAlign:'center',
                                                        marginTop:5.5,
                                                        marginLeft:5,
                                                        marginRight:5
                                                    }}
                            />
                                            </View>
                                        </Pressable>

                                    </>
                                )

                                }
                            </Pressable>
                        </View>
                    </View>
                </View>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({

    nameText: {
        fontSize: 12,
        fontFamily: 'Quicksand-Bold',
        marginLeft: 10,
        color: '#fff'
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
    product_list_contianer: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: '#2F2F2F',
        padding: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
        margin: 5,
        justifyContent: 'center',
        borderColor: '#CCCCCC',
        width: 140,
        height: height / 3.6,
        borderRightWidth: 0.2,
        borderLeftWidth: 0.2,
        borderTopWidth: 1.5
    },
    count_text_style: {
        fontFamily: 'Quicksand-Bold', alignItems: 'center', alignSelf: 'center', alignContent: 'center', marginTop: 5, fontSize: 8, color: 'white'
    },
    price_contianer: {
        flexDirection: 'row', marginTop: 5
    },
    offer_details_text_style: {
        fontFamily: 'Quicksand-Bold', alignItems: 'center', alignSelf: 'center', alignContent: 'center', marginTop: 5, fontSize: 8, color: 'white'
    },
    price_contianer_secondary: {
        flexDirection: 'column', marginTop: 10
    },
    new_price_container: {
        flexDirection: 'row'
    },
    curreny_text_container: {
        fontFamily: 'Quicksand-Bold', color: 'white', marginTop: 10, marginLeft: 10, alignItems: 'center',
    },
    new_price_text_style: {
        fontFamily: 'Quicksand-Bold', color: 'white', marginTop: 10, marginLeft: 2, alignItems: 'center',
    },
    oldprice_contianer: {
        flexDirection: 'row'
    },
    old_price_currency_text: {
        fontFamily: 'Quicksand', color: 'white', marginTop: 5, marginLeft: 10, alignItems: 'center',
    },
    old_price_text_style: {
        fontFamily: 'Quicksand', color: 'white', marginTop: 5, marginLeft: 2, alignItems: 'center', textDecorationLine: "line-through"
    },
    pressable_container: {
        alignItems: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, marginTop: 15, marginLeft: 10
    },
    cart_container: {
        marginTop: 0, flexDirection: 'row'
    },
    decrement_text_style: {
        alignItems: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, marginLeft: 10, fontSize: 20, color: 'white', fontFamily: 'Quicksand'
    },
    add_items_text_style: {
        marginLeft: 10, fontSize: 18, color: 'white', fontFamily: 'Quicksand'
    },
    increment_text_style: {
        alignItems: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, marginLeft: 10, fontSize: 20, color: 'white', fontFamily: 'Quicksand'
    },
    plus_text_style: {
        alignItems: 'center', alignSelf: 'center', alignContent: 'center', flex: 1, margin: 1, fontSize: 20, color: 'white', fontFamily: 'Quicksand-Bold'
    }

});

export default ProductListItem;