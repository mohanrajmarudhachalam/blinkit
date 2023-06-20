import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { Path, G, Svg, Rect } from 'react-native-svg';
import App from '../../App';
const data = [
    {
        title: 'Buy Premium fruits & Vegetables ',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
        image: require('../../assets/images/fruits.png'),
        backColor: '#fcffd9'
    },
    {
        title: 'Get Discounts On All Products',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
        image: require('../../assets/images/groceries.png'),
        backColor: '#fff5e1'
    },
    {
        title: 'Premium Food At Your Doorstep',
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
        image: require('../../assets/images/unsplash.png'),
        backColor: '#ebffd7'
    },
];

export function Onboarding({navigation}: {navigation: any}):React.ReactElement {
  
    const renderItem = ({ item }:{item:any}) => {
        return (
            <View style={styles.slide} backgroundColor={item.backColor} >
                <Image source={item.image} style={styles.image} />
                <Svg height="60%" width="100%" viewBox="0 0 375 364">
                    <Path
                        fill="#292929"
                        d="M0 34.5247C0 34.5247 60 112.205 187.5 34.5247C315 -43.1559 375 34.5247 375 34.5247V454H0V34.5247Z"
                    />
                    <View>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                </Svg>
            </View>
        );
    };
    const keyExtractor = (item: { title: any; }) => item.title;

    const renderNextButton = () => {
        return (
            <View style={styles.rightTextWrapper}>
                <Text style={styles.rightText}>Next</Text>
            </View>
        );
    };
    const renderDoneButton = () => {
        return (
            <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
                <View style={styles.doneButtonWrapper}>
                    <Text style={styles.doneButtonText}>Next</Text>
                </View>
            </TouchableOpacity>

        );
    };
    const renderPrevButton = () => {
        return (
            <TouchableOpacity
                onPress={() => navigation.replace('Dashboard')}
                >
                <View style={styles.leftTextWrapper}>
                    <Text style={styles.leftText}>Skip</Text>
                </View>
            </TouchableOpacity>

        );
    };
    const handleDone = () => {
        <TouchableOpacity
            onPress={() => navigation.replace('HomeScreen')}
        />
    };
    return (
        <View style={styles.container}>
            <AppIntroSlider
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                data={data}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                renderSkipButton={renderPrevButton}
                showSkipButton
                onDone={handleDone}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFE0',
        flex: 1,

    },
    slide: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    image: {
        marginVertical: 50,
        height: '40%',
        width: '130%',
        resizeMode: 'contain',
        top: 150
    },
    title: {
        fontSize: 24,
        color: '#F6F7F7',
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        marginHorizontal: 60,
        marginTop: 140
    },
    text: {
        fontSize: 14,
        color: '#868889',
        textAlign: 'center',
        fontFamily: 'Quicksand-SemiBold',
        marginHorizontal: 60,
        marginTop: 20,
    },
    dotStyle: {
        backgroundColor: '#676767',
    },
    activeDotStyle: {
        backgroundColor: '#F6F7F7',
    },
    rightTextWrapper: {
        width: 40,
        height: 40,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    rightText: {
        color: '#F6F7F7',
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 14,
    },
    leftTextWrapper: {
        width: 40,
        height: 40,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    leftText: {
        color: '#888B8F',
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 14,
    },
    doneButtonWrapper: {
        flex: 1,
        paddingLeft: 35,
        paddingRight: 50,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: -40,
    },
    doneButtonText: {
        fontSize: 14,
        fontFamily: 'Quicksand-SemiBold',
        textAlign: 'center',
        color: '#F6F7F7',
    },
});