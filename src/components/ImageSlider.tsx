import { View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'

export function ImageSlider() {
    const images = [
        "https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?w=2000&t=st=1675153503~exp=1675154103~hmac=6c4bf0083127710fd316a7d66f0398f5568ae1182730579edd139a01dafb5201",
        "https://img.freepik.com/free-psd/summer-sale-70-discount_23-2148476960.jpg?w=2000&t=st=1675153639~exp=1675154239~hmac=1d306519ac048d43808a92d5a64ef16f6fa3f80f1cc0ebc9429708ac52389fff",
        "https://img.freepik.com/free-photo/fast-fashion-vs-slow-sustainable-fashion_23-2149133967.jpg?size=626&ext=jpg&ga=GA1.2.2080437104.1671446189&semt=sph",
        "https://img.freepik.com/free-photo/beautiful-men-fashion-shirt_1203-7650.jpg?w=2000&t=st=1675153785~exp=1675154385~hmac=2f6e0db9fbdef77cb9708558792352cc73d38e99ea5cfe50360357b7d07024c6",
    ];

    const { width } = Dimensions.get('window');
    const height = width * 0.6;

    const [active, setActive] = useState(0);

    const onScrollChange = ({ nativeEvent }: any) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== active) {
            setActive(slide);
        }
    };
    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={onScrollChange}
                showsHorizontalScrollIndicator={false}
                style={{ width, height }}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ width, height, resizeMode: 'cover' }}
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((i, k) => (
                    <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                        •
                    </Text>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginRight: 10,
        radius: 10
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -15,
        alignSelf: 'center',
    },
    dot: {
        color: '#888',
        fontSize: 50,
    },
    activeDot: {
        color: '#FFF',
        fontSize: 50,
    },
})