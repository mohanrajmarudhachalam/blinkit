import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ListRenderItem, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Input, Button, Divider } from 'react-native-elements';
import {
    addToCart,
    cleanCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from '../redux/basketSlice'
const { width, height } = Dimensions.get('window');
import { useDispatch, useSelector, } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartListItem from '../components/CartListItem'
import CartBeforeCheckout from '../components/CartBeforeCheckout';
import IShoppingItems from '../redux/types/IShoppingItems'
const { useRealm, useQuery } = realmContext;
import { realmContext } from '../database/RealmContext';
import { DealsOfDay } from '../database/DealsofDaySchema'
import { useRoute } from "@react-navigation/native"
import { LogBox } from 'react-native';
FontAwesome.loadFont();



export function CartPage(): React.ReactElement {
    const dispatch = useDispatch();

    const route = useRoute<any>()
    const navigation = useNavigation<any>();
    const { categoryname, category_id } = route.params;
    const realm = useRealm();
    const dealsDay = useQuery(DealsOfDay);
    const dealsitems = dealsDay.sorted("_id");

    //
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead']);
        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 0)']);

    }, [])

    const cart = useSelector((state: any) => state.cart.cart);
    const total = cart.map((item: any) => item.newprice * item.quantity)
        .reduce((curr: any, prev: any) => curr + prev, 0);
    const navigateProduct = () => {
        navigation.navigate("Categorylist", { categoryname, category_id })
    }
    const itemTotal = cart.length
    const grandTotal = total + 1;

    useEffect(() => {
        if (total === 0) {
            navigation.navigate('Empty')
        }
    })


    const navigateHome = async () => {
        navigation.navigate("OrderTrack")
        dispatch(cleanCart)
    }
    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(realm.objects(DealsOfDay));
        });
    }, [realm])

    const todaydealrenderItem: ListRenderItem<DealsOfDay> = useCallback(({ item }) => (
        <CartBeforeCheckout
            _id={item._id}
            name={item.name}
            deals_image={item.deals_image}
            counts={item.counts}
            newprice={item.newprice}
            offerDetails={item.offerDetails}
            oldprice={item.oldprice}
            owner_id={item.owner_id}
        />
    ), []);
    const renderItem: ListRenderItem<IShoppingItems> = useCallback(({ item }) => (
        <CartListItem _id={item._id} name={item.name} product_image={item.product_image} counts={item.counts} oldprice={item.oldprice} newprice={item.newprice} quantity={item.quantity} offerDetails={item.offerDetails} owner_id={item.owner_id} />
    ), [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.secondary_container}>
                <TouchableOpacity onPress={navigateProduct}>
                    <FontAwesome name='angle-left' size={30} style={styles.back_arrow_icon_style} />
                </TouchableOpacity>
                <View style={styles.tittle_container_style}>
                    <Text style={styles.text_style_tittle}>Order Details</Text>
                </View>
            </View>
            <Divider style={styles.divider_1_style} />
            <ScrollView>
                <View>
                    <View style={styles.cart_container_view}>
                        <View style={styles.cart_contianer_2_view}>
                            <View style={styles.row_container}>
                                <FontAwesome
                                    name="map-marker"
                                    size={20}
                                    style={styles.map_marker_icon_style}
                                    color="#888B8F" />
                                <View>
                                    <Text style={styles.address_text_style}>Delivery at Home - Nesapakkam,. K.K.{'\n'} Nagar West, Chennai - 600095</Text>
                                </View>
                            </View>
                            <View style={styles.row_container}>
                                <FontAwesome
                                    name="clock-o"
                                    size={20}
                                    style={styles.clock_icon_style}
                                    color="#888B8F" />
                                <View>
                                    <Text style={styles.delivery_time_text_style}>Delivery in 45 minutes</Text>
                                </View>
                            </View>


                        </View>
                        <View style={styles.chanage_container_style}>
                            <Text style={styles.change_text_style}>Change</Text>
                        </View>

                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View>
                        <View style={styles.cart_list_container_style}>
                            <Text style={styles.your_cart_text_style}>Your Cart</Text>
                        </View>
                        <FlatList data={cart}
                            renderItem={renderItem}
                        />
                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View>
                        <View style={styles.cart_list_container_style}>
                            <Text style={styles.before_check_out_style}>Before you checkout</Text>
                        </View>
                        <View style={styles.todays_deals_listContainer}>
                            <FlatList
                                data={dealsitems}
                                renderItem={todaydealrenderItem}
                                style={styles.sub_cate_container}
                                contentContainerStyle={styles.list}
                                horizontal={true}
                            />
                        </View>

                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View>
                        <View style={styles.cart_list_container_style}>
                            <Text style={styles.coupon_tittle_text_style}>Apply Coupon</Text>
                        </View>
                        <View style={styles.coupon_contianer_view}>
                            <Image
                                source={require('../../assets/images/Vector.png')}
                                style={styles.vector_image_style}
                            />
                            <Text style={styles.coupon_details_text_style}>Amet minim mollit non deserunt ullamco{'\n'} est sit aliquan</Text>
                            <FontAwesome
                                name="angle-right"
                                size={20}
                                style={styles.coupon_right_arrow}
                                color="#828282" />
                        </View>
                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View >
                        <View style={styles.bill_details_contianer}>
                            <Text style={styles.bill_details_text_style}>Bill Details</Text>
                        </View>
                        <View style={styles.item_total_contianer}>
                            <Text style={styles.item_total_text_tittle}>Item Total</Text>
                            <Text style={styles.item_total_count_text_style}>{itemTotal}</Text>
                        </View>
                        <View style={styles.item_total_contianer}>
                            <Text style={styles.delivery_fees_text_style}>Delivery Fee | Kms</Text>
                            <Text style={styles.delivery_fees_text_amount_style}>$0.00</Text>
                        </View>
                        <View style={styles.delivery_partner_details_container}>
                            <Text style={styles.delivery_description_text_style}>This fee compensates your Delivery Partner fairly</Text>
                        </View>

                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View>
                        <View style={styles.tax_contianer_style}>
                            <Text style={styles.tax_charges_tittle}>Taxes and Charges</Text>
                            <Text style={styles.tax_charges_amount_style}>$1.00</Text>
                        </View>
                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View>
                        <View style={styles.total_pay_container}>
                            <Text style={styles.total_pay_tittle_text_style}>Total Pay</Text>
                            <Text style={styles.total_pay_amount_style}>{grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                    <Divider style={styles.divider_1_style} />
                    <View>
                        <View style={styles.cart_list_container_style}>
                            <Text style={styles.cancelation_policy_tittle}>Cancellation Policy</Text>
                        </View>
                        <View style={styles.cancel_policy_container}>
                            <FontAwesome
                                name="clock-o"
                                size={20}
                                style={styles.clock_style}
                                color="#888B8F" />
                            <View>
                                <Text style={styles.cancel_text_style}>100% cancellation fee  will be applicable {'\n'} if you decide to cacel the order anytime after order{'\n'} placemeny</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <Divider style={styles.divider_1_style} />
            <View>
                <View style={styles.payment_method_contianer}>
                    <Text style={styles.payment_method_tittle}>Payment Method</Text>
                    <View style={styles.payment_button_style}>
                        <TouchableOpacity onPress={navigateHome}>
                            <View style={styles.payment_secondary_container}>
                                <View style={styles.payment_amount_area_container}>
                                    <Text style={styles.payment_amount_total}>${grandTotal.toFixed(2)}</Text>
                                    <View style={styles.total_amount_contianer}>
                                        <Text style={styles.total_amount_textStyle}>TOTAL AMOUNT</Text>
                                    </View>
                                </View>

                                <FontAwesome
                                    name="angle-right"
                                    size={25}
                                    style={styles.angle_right_icons}
                                    color="#292929"
                                />
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    angle_right_icons: {
        left: -10,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    total_amount_textStyle: {
        color: '#000000', fontSize: 8, justifyContent: 'center', marginLeft: 5, alignItems: 'center', fontFamily: 'Quicksand-Bold'
    },
    total_amount_contianer: {
        flexDirection: 'row'
    },
    payment_amount_total: {
        color: '#000', fontFamily: 'Quicksand-Bold', fontSize: 12, marginLeft: 5
    },
    payment_amount_area_container: {
        flexDirection: 'column', marginLeft: 10
    },
    payment_secondary_container: {
        flexDirection: 'row', alignItems: 'center', height: '100%', justifyContent: 'space-between'
    },
    payment_button_style: {
        marginLeft: 15, marginRight: 15, backgroundColor: '#FFC107', height: 55, width: 170, borderRadius: 5
    },
    payment_method_tittle: {
        fontFamily: 'Quicksand-Bold', color: '#888B8F', marginLeft: 10, fontSize: 14, alignItems: 'center'
    },
    cancel_policy_container: {
        flexDirection: 'row', marginTop: 10, marginLeft: 10
    },
    cancelation_policy_tittle: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginLeft: 10
    },
    payment_method_contianer: {
        flexDirection: 'row', marginLeft: 30, marginTop: 15, justifyContent: 'space-between'
    },
    total_pay_amount_style: {
        fontFamily: 'Quicksand-Bold', color: '#F6CF48', fontSize: 14, alignItems: 'center', marginRight: 20
    },
    total_pay_tittle_text_style: {
        fontFamily: 'Quicksand-Bold', color: '#F6CF48', marginLeft: 10, fontSize: 14, alignItems: 'center'
    },
    total_pay_container: {
        flexDirection: 'row', marginLeft: 30, marginTop: 15, justifyContent: 'space-between'
    },
    container: {
        backgroundColor: '#252525',
        flex: 1
    },
    sub_cate_container: {
        flex: 1,
        flexDirection: 'row',
    },
    list: {
        justifyContent: 'space-around',
    },
    secondary_container: {
        flexDirection: 'row'
    },
    back_arrow_icon_style: {
        alignItems: 'center', color: '#F2F2F2', marginLeft: 25
    },
    tittle_container_style: {
        alignItems: 'center', justifyContent: 'center', width: '80%'
    },
    text_style_tittle: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 16
    },
    divider_1_style: {
        backgroundColor: '#F5F5F5', marginTop: 15, width: width / 1.15, marginLeft: 30,
    },
    cart_container_view: {
        flexDirection: 'row'
    },
    cart_contianer_2_view: {
        flexDirection: 'column'
    },
    row_container: {
        flexDirection: 'row', marginTop: 10
    },
    address_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 12, marginLeft: 10, flexWrap: 'wrap', flex: 1, flexShrink: 1
    },
    clock_icon_style: {
        height: 40,
        width: 40,
        left: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    delivery_time_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 12, marginTop: 3, alignItems: 'center', marginLeft: 15
    },
    chanage_container_style: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: '25%',
        marginTop: 10
    },
    change_text_style: {
        fontFamily: 'Quicksand-Bold', color: '#D0BAFA', fontSize: 12, alignItems: 'center', marginLeft: 15
    },
    map_marker_icon_style: {
        height: 40,
        width: 40,
        left: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cart_list_container_style: {
        marginTop: 10, marginLeft: 30
    },
    coupon_container: {
        flexDirection: 'row', marginLeft: 35, marginTop: 15
    },
    your_cart_text_style: {
        fontFamily: 'Quicksand-Bold', color: '#B0B0B0', fontSize: 16, alignItems: 'center', marginLeft: 10
    },
    before_check_out_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginLeft: 10
    },
    todays_deals_listContainer: {
        marginLeft: width / 20
    },
    coupon_tittle_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginLeft: 10
    },
    coupon_contianer_view: {
        flexDirection: 'row', marginLeft: 35, marginTop: 15
    },
    vector_image_style: {
        alignSelf: 'flex-start', height: 20, width: 20, justifyContent: 'center', marginTop: 10
    },
    coupon_details_text_style: {
        fontFamily: 'Quicksand', marginLeft: 10, color: '#B0B0B0', fontSize: 14, alignItems: 'center'
    },
    clock_style: {
        height: 40,
        width: 40,
        left: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cancel_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 12, marginTop: 3, alignItems: 'center', marginLeft: 15
    },
    coupon_right_arrow: {
        height: 40,
        width: 40,
        left: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bill_details_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginLeft: 10
    },
    bill_details_contianer: {
        marginTop: 15, marginLeft: 30
    },
    item_total_contianer: {
        flexDirection: 'row', marginLeft: 30, marginTop: 15, justifyContent: 'space-between'
    },
    item_total_text_tittle: {
        fontFamily: 'Quicksand', color: '#B0B0B0', marginLeft: 10, fontSize: 12, alignItems: 'center'
    },
    item_total_count_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginRight: 20
    },
    delivery_fees_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', marginLeft: 10, fontSize: 12, alignItems: 'center'
    },
    delivery_fees_text_amount_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginRight: 20
    },
    delivery_partner_details_container: {
        marginLeft: 30, marginTop: 5
    },
    delivery_description_text_style: {
        fontFamily: 'Quicksand-Light', fontWeight: 'bold', fontStyle: 'italic', color: '#4F4F4F', marginLeft: 10, fontSize: 12, alignItems: 'center'
    },
    tax_contianer_style: {
        flexDirection: 'row', marginLeft: 30, marginTop: 15, justifyContent: 'space-between'
    },
    tax_charges_tittle: {
        fontFamily: 'Quicksand', color: '#2F80ED', marginLeft: 10, fontSize: 12, alignItems: 'center'
    },
    tax_charges_amount_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginRight: 20
    },
    cancelation_text_style: {
        fontFamily: 'Quicksand', color: '#B0B0B0', fontSize: 14, alignItems: 'center', marginLeft: 10
    }
})