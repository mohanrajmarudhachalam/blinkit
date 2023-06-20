import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ListRenderItem, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useCallback, useState } from 'react'
import { useRoute } from "@react-navigation/native"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { realmContext } from '../database/RealmContext';
const { useRealm, useQuery } = realmContext;
import { CategoryIcon } from '../components/CategoryIcon';
import ProductListItem from '../components/ProductListItem';
import { ProductCategory } from '../database/ProductCategorySchema';
import { Subcategory } from "../database/SubCategorySchema";
import CartPreview from '../components/CartPreview';
import { FlatListSlider } from 'react-native-flatlist-slider';

import { useSelector } from "react-redux";
FontAwesome.loadFont();
const { width, height } = Dimensions.get('window');
import { LogBox } from 'react-native';
import { BSON } from "realm";

export interface subcategory {
    _id: BSON.ObjectId;
    name: string;
    sub_category_image: string;
    category_id: string;
    owner_id: string;
}
const images: any = [
    {
        banner: require('../../assets/images/product_1.png'),
        desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
        banner: require('../../assets/images/product_2.png'),
        desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
        banner: require('../../assets/images/product_3.png'),
        desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
        banner: require('../../assets/images/product_4.png'),
        desc: 'Silent Waters in the mountains in midst of Himilayas',
    }
]
export function CategoryList(): React.ReactElement {
    const route = useRoute<any>()
    const { categoryname, category_id } = route.params;
    const navigation = useNavigation<any>();
    const realm = useRealm();
    const [subCategoryItems, setsubCategoryItems] = React.useState<Subcategory[]>([]);
    const [product_category, setProduct_category] = React.useState<ProductCategory[]>([]);
    const menuItems = useQuery(Subcategory);
    const productionItems = useQuery(ProductCategory);

    const subCategegoryItems = useQuery(Subcategory).filtered(`category_id=="${category_id}"`)
    console.log(subCategegoryItems)
    useEffect(() => {
        const subCategoryMenuItems = async () => {
            try {
                const subMenuItems = await JSON.parse(JSON.stringify(menuItems.filtered(`category_id=="${category_id}"`)))
                setsubCategoryItems(subMenuItems);
                console.log(subMenuItems)
            }
            catch (e) {
                console.log(e)
            }
        }
        subCategoryMenuItems();

    }, [])


    const cart = useSelector((state: any) => state.cart.cart);
    const total = cart.map((item: any) => item.newprice * item.quantity).reduce((curr: any, prev: any) => curr + prev, 0);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead']);
        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 0)']);

    }, [])

    useEffect(() => {
        const productCategoryItems = async () => {
            try {

                const productCategory = await JSON.parse(JSON.stringify(productionItems.filtered(`category_id=="${category_id}"`)));
                setProduct_category(productCategory)
                console.log(productCategory)
            } catch (e) {
                console.log(e)
            }
        }
        productCategoryItems()

    }, []);

    useEffect(() => {
        realm.subscriptions.update((subs) => {
            subs.add(realm.objects(Subcategory))
        });
    });
    useEffect(() => {
        realm.subscriptions.update((subs) => {
            subs.add(realm.objects(ProductCategory))
        });
    });

    const navigatieScreen = () => {
        navigation.navigate('Home')
    }

    const cartPageNaviagtion = () => {
        navigation.navigate('Cart', { categoryname, category_id })
    }

    function SubCategoryItem(props: subcategory) {
        const { _id, name, sub_category_image, owner_id } = props;
        const realm = useRealm();

        const filteredItem = async () => {
            try {
                const filterProduct = JSON.parse(JSON.stringify(realm.objects(ProductCategory).filtered(`subcategory_id=="${_id}"`)));
                setProduct_category(filterProduct);
            } catch (e) {
                console.log(e);
            }

        }

        return (
            <View>
                <TouchableOpacity onPress={filteredItem}>
                    <View style={styles.sub_category_filter_view}>
                        <View style={{ flexDirection: 'column' }}>
                            <CategoryIcon imageSource={sub_category_image} />
                            <Text style={styles.nameText}>{name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    const renderItem: ListRenderItem<Subcategory> = useCallback(({ item }) => (
        <SubCategoryItem _id={item._id} name={item.name} sub_category_image={item.sub_category_image} owner_id={item.owner_id} category_id={item.category_id} />
    ), [])
    const productListItem: ListRenderItem<ProductCategory> = useCallback(({ item }) => (
        <ProductListItem _id={item._id} name={item.name} product_image={item.product_image} counts={item.counts} oldprice={item.oldprice} newprice={item.newprice} offerDetails={item.offerDetails} category_id={item.category_id} subcategory_id={item.subcategory_id} owner_id={item.owner_id} quantity={item.quantity} />
    ), [])

    return (
        <SafeAreaView style={styles.container}>
            <>
                <View>
                    <View style={styles.page_tittle_view}>
                        <TouchableOpacity onPress={navigatieScreen}>
                            <FontAwesome name='angle-left' size={30} style={styles.back_arrow_style} />
                        </TouchableOpacity>
                        <View style={styles.page_tittle_text_header_view}>
                            <Text style={styles.category_name_text}>{categoryname}</Text>
                            <Text style={styles.total_item_count_text}>358 items</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.divider_style} />
                    <View style={styles.category_page_contianer_main}>
                        <View style={styles.category_list_view_style}>
                            <FlatList data={subCategoryItems}
                                scrollEnabled={false}
                                renderItem={renderItem}
                            />
                        </View>

                        <View style={styles.vertical_divider} />

                        <ScrollView>

                            {/* <Image
                                source={require('../../assets/images/frame_category.png')}
                                style={styles.image_slider_view}
                            /> */}

                            <View style={{ margin: 15 }}>
                                <FlatListSlider
                                    data={images}
                                    height={110}
                                    width={width / 1.41}
                                    timer={5000}
                                    animation
                                    onPress={() => console.log}
                                    contentContainerStyle={{ position: 'relative', margin: 0 }}
                                    imageKey={'banner'} local />

                            </View>


                            <View style={styles.total_item_count_view}>
                                <Text style={styles.total_items_count_text_style}>37 items</Text>
                                <Text style={styles.sub_tittle_text_style}>in Top Picks</Text>
                            </View>
                            <View style={styles.product_list_style} >
                                <FlatList
                                    scrollEnabled={false}
                                    data={product_category}
                                    renderItem={productListItem}
                                    numColumns={2}
                                />

                            </View>

                        </ScrollView>

                    </View>

                </View>
                <View style={styles.view_cart_main_contianer}>
                    {total === 0 ? (
                        <>

                        </>
                    ) : (
                        <>
                            {/* <CartPreview/> */}
                            <View style={styles.footerWrap} >
                                <View style={styles.view_cart_secondary_container}>
                                    <View style={styles.view_cart_total_contianer}>
                                        <View style={styles.item_total_amount_view}>
                                            <Text style={styles.item_total_title}>ITEM TOTAL</Text>
                                            <View style={styles.cart_view_amount_section}>
                                                <Text style={styles.total_amount_section_text_style}> ${total.toFixed(1)}</Text>
                                                <Text style={styles.tax_area_text_view}>Plus taxes</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={cartPageNaviagtion}>
                                            <View style={styles.cart_navigation_view}>
                                                <Text style={styles.cart_tittle_style}>View Cart</Text>
                                                <FontAwesome
                                                    name="angle-right"
                                                    size={25}
                                                    style={styles.arrow_icon_style}
                                                    color="#292929"
                                                />

                                            </View>
                                        </TouchableOpacity>

                                    </View>


                                </View>
                            </View>
                        </>
                    )}
                </View>


            </>
        </SafeAreaView>
    )
}

export default CategoryList


const styles = StyleSheet.create({
    arrow_icon_style: {
        left: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cart_tittle_style: {
        color: '#000', fontFamily: 'Quicksand-Bold', fontSize: 12, justifyContent: 'flex-end'
    },
    cart_navigation_view: {
        flexDirection: 'row', alignItems: 'center', marginLeft: width / 2.45
    },
    tax_area_text_view: {
        fontFamily: 'Quicksand-Bold', fontSize: 12, marginLeft: 5
    },
    total_amount_section_text_style: {
        color: '#000000', fontSize: 12, justifyContent: 'center', alignItems: 'center', fontFamily: 'Quicksand-Bold',
    },
    cart_view_amount_section: {
        flexDirection: 'row'
    },
    item_total_title: {
        color: '#000', fontFamily: 'Quicksand-Bold', fontSize: 10, marginLeft: 5
    },
    item_total_amount_view: {
        flexDirection: 'column', marginLeft: 10
    },
    view_cart_total_contianer: {
        flexDirection: 'row', alignItems: 'center', height: '100%', flex: 1,
    },
    view_cart_secondary_container: {
        marginLeft: 5, marginRight: -5, backgroundColor: '#FFC107', height: 55, borderRadius: 5
    },
    view_cart_main_contianer: {
        position: 'absolute', justifyContent: 'flex-end', bottom: 20, right: 10, left: 10
    },
    product_list_style: {
        marginLeft: 10, marginTop: 15, flexDirection: 'column', flex: 1
    },
    sub_tittle_text_style: {
        fontFamily: 'Quicksand', color: '#F6F7F7', marginLeft: 5
    },
    total_items_count_text_style: {
        fontFamily: 'Quicksand-Bold', color: '#F6F7F7',
    },
    total_item_count_view: {
        marginLeft: 20, marginTop: 15, flexDirection: 'row'
    },
    image_slider_view: {
        alignItems: 'flex-end', alignSelf: 'flex-end', marginTop: 15, marginRight: 10
    },
    vertical_divider: {
        height: '100%', width: 0.3, backgroundColor: '#909090', marginTop: 15
    },
    category_list_view_style: {
        flexDirection: 'column', backgroundColor: '#252525'
    },
    category_page_contianer_main: {
        flexDirection: 'row'
    },
    divider_style: {
        height: 0.2, width: '100%', backgroundColor: '#909090', marginTop: 15, flex: 1
    },
    total_item_count_text: {
        fontFamily: 'Quicksand', color: '#888B8F', fontSize: 12
    },
    category_name_text: {
        fontFamily: 'Quicksand', color: '#F6F7F7', fontSize: 16
    },
    page_tittle_text_header_view: {
        marginLeft: 25
    },
    back_arrow_style: {
        alignItems: 'center', color: '#F2F2F2', marginLeft: 25
    },
    page_tittle_view: {
        flexDirection: 'row', backgroundColor: '#292929'
    },
    sub_category_filter_view: {
        elevation: 5,
        padding: 0,
        margin: 5,
        justifyContent: 'center',
        width: 65,
        height: 95,
    },
    container: {
        backgroundColor: '#292929',
        flex: 1,
    },
    nameText: {
        fontSize: 11,
        fontFamily: 'Quicksand',
        marginLeft: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 5,
        color: '#fff'

    },
    footerWrap: {
        height: 100,
        backgroundColor: 'transparent',
        zIndex: 100
    },

})