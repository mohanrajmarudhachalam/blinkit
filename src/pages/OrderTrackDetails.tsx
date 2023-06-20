import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, ListRenderItem, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { useRoute } from "@react-navigation/native"
import { Input, Button, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import GradientText from '../components/GradientText';
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapViewDirections from 'react-native-maps-directions';
const bikeImage = require('../../assets/images/delivery_bike.png')
FontAwesome.loadFont();
const { width, height } = Dimensions.get('window');
type ILocation = {
    latitude: number;
    longitude: number;
};
export function OrderTrackDetails(): React.ReactElement {
    const navigation = useNavigation<any>();
    const [position, setPosition] = React.useState<ILocation>({
        latitude: 12.937870,
        longitude: 80.235046,
    });
    const [origin, setOrigin] = React.useState({
        latitude: 12.949749,
        longitude: 80.238141,
    });

    const [destination, setDestination] = React.useState({
        latitude: 12.953797,
        longitude: 80.241806,
    });

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude)
        },
            error => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
    })
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity >
                            <FontAwesome name='angle-left' size={30} style={{ alignItems: 'center', color: '#F2F2F2', marginLeft: 25 }} />
                        </TouchableOpacity>
                        <View style={styles.order_header_container}>
                            <Text style={styles.order_header_text}>Order #10667889898</Text>
                        </View>
                    </View>
                    <Divider style={styles.divider} />
                    <View>
                        <View style={{
                            height: 100,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            backgroundColor: '#202020',
                            zIndex: 10
                        }}>

                            <GradientText style={styles.order_text}>Order placed at 12:34 PM </GradientText>
                            <View style={styles.order_time_container}>
                                <FontAwesome
                                    name="clock-o"
                                    size={20}
                                    style={{
                                        height: 40,
                                        width: 40,
                                        alignContent: 'center',
                                        marginTop: 15,
                                        marginLeft: 5
                                    }}
                                    color="#FFFFFF" />
                                <Text style={styles.order_time_text}>On time - Delivery in 45 mins</Text>
                                {/*  <Text style={styles.order_time_text}></Text> */}
                            </View>
                        </View>
                        <MapView
                            style={styles.map_container}
                            initialRegion={{
                                latitude: origin.latitude,
                                longitude: origin.longitude,
                                latitudeDelta: 0.008,
                                longitudeDelta: 0.008,
                            }}
                        >
                            <Marker
                                draggable
                                coordinate={origin}
                                image={bikeImage}
                                onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                            />
                            <Marker
                                draggable
                                coordinate={destination}
                                onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
                            />
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={'AIzaSyDFlYusKYHmm3YHbYbKR6GwwaACPu3Afpc'}
                                strokeColor="black"
                                strokeWidth={5}
                            />
                        </MapView>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.deliverypartcontaner}>
                                <View style={{ flexDirection: 'row', }}>

                                    <Image source={require('../../assets/images/deliverypartner.png')} style={{ height: 40, width: 40, marginLeft: 20 }} />
                                    <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'Quicksand-Bold', color: '#F6F7F7', marginBottom: 10 }}>I’m Babu, your delivery partner</Text>
                                        <Text style={{ fontFamily: 'Quicksand', color: '#888B8F', fontSize: 10 }}>I have completed 100+ five star deliveries</Text>
                                    </View>
                                    <Image source={require('../../assets/images/phone.png')} style={{ height: 40, width: 40, marginRight: 20, marginLeft: 35, marginTop: 5 }} />

                                </View>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                                <Image source={require('../../assets/images/basketicon.png')} style={{ height: 40, width: 40, marginLeft: 20 }} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontFamily: 'Quicksand-Bold', color: '#F6F7F7', marginBottom: 10 }}>Order Summary</Text>
                                    <Text style={{ fontFamily: 'Quicksand', color: '#888B8F', fontSize: 10 }}>Order id - #10667889898</Text>
                                </View>
                                <Text style={{ marginLeft: width / 5, color: '#D0BAFA', marginTop: 10 }}>View Summary</Text>

                            </View>
                            <Divider style={styles.divider} />
                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginBottom: 10 }}>
                                <Image source={require('../../assets/images/customer.png')} style={{ height: 40, width: 40, marginLeft: 20 }} />
                                <View style={{ marginLeft: -160 }}>
                                    <Text style={{ fontFamily: 'Quicksand-Bold', color: '#F6F7F7', marginBottom: 10 }}>Gopi, 8667566XXX</Text>
                                    <Text style={{ fontFamily: 'Quicksand', color: '#2F80ED', fontSize: 12 }}>Add alternate number</Text>
                                </View>
                                <FontAwesome
                                    name="angle-right"
                                    size={25}
                                    style={{
                                        marginLeft: -25,
                                        marginRight: 30,
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',

                                    }}
                                    color="#F6F7F7"
                                />

                            </View>
                            <Divider style={styles.divider} />
                            <View style={{ flexDirection: 'column', marginTop: 20, marginBottom: 5 }}>
                                <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                    <FontAwesome
                                        name="map-marker"
                                        size={20}
                                        style={{
                                            height: 40,
                                            width: 40,
                                            left: 30,
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                        }}
                                        color="#888B8F" />
                                    <View>
                                        <Text style={{ fontFamily: 'Quicksand', color: '#BDBDBD', fontSize: 12, marginLeft: 20, flexWrap: 'wrap', flex: 1, flexShrink: 1 }}>Delivery at Home - Nesapakkam,. K.K.{'\n'} Nagar West, Chennai - 600095</Text>
                                    </View>
                                    <Text style={{ marginLeft: width / 12, color: '#D0BAFA', marginTop: 10 }}>Change</Text>

                                </View>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 5 }}>
                                <View style={{ flexDirection: 'column', marginLeft: width / 12 }}>
                                    <Text style={{ fontFamily: 'Quicksand-Bold', color: '#F6F7F7', marginBottom: 10, fontSize: 16 }} >Need help with your order?</Text>
                                    <Text style={{ fontFamily: 'Quicksand', color: '#888B8F', fontSize: 12 }}>Our support is always available</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                                    <Image source={require('../../assets/images/whatsapp.png')} style={{ height: 40, width: 40, marginRight: 20, }} />
                                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                        <Image source={require('../../assets/images/phone.png')} style={{ height: 40, width: 40, marginRight: 20, }} />

                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                      

                    </View>

                </View>
            </View>


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
    },
    order_header_container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    order_header_text: {
        fontFamily: 'Quicksand',
        color: '#B0B0B0',
        marginTop: 5,
        fontSize: 12
    },
    divider: {
        backgroundColor: '#F5F5F5',
        marginTop: 10,
        width: width / 1.15,
        marginLeft: 30,
        height: 0.1
    },
    map_container: {
        marginTop: -10,
        width: '100%',
        height: '28%',

    },
    order_text: {
        fontSize: 18,
        marginRight: 0,
        fontFamily: 'Quicksand-Bold',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15
    },
    order_time_text: {
        fontFamily: 'Quicksand',
        color: '#FFFFFF',
        fontSize: 12,
        alignSelf: 'center',
        marginTop: -5,
        marginLeft: -15
    },
    order_time_container: {
        backgroundColor: '#2b2b2b',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15,
        alignItems: 'center',
        padding: 5,
        height: 35
    },
    deliverypartcontaner: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        marginTop: 10, marginBottom: 10


    }

})