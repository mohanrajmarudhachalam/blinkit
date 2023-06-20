import React, { useCallback, useState, useEffect } from "react"
import Realm from "realm";
import { useApp } from "@realm/react";
import { StyleSheet, Text, View, Alert, Image, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button, Divider } from 'react-native-elements';
const loginTop= require('../../assets/images/logintop.png')
const freshTop= require('../../assets/images/freash_top.png')
const backBtn= require('../../assets/images/backbtn.png')
const googlePlusIcon= require('../../assets/images/gplus.png')
Icon.loadFont();
FontAwesome.loadFont();
const { width, height } = Dimensions.get('window');

const data = [
    { label: '+1', value: '1' },
    { label: '+91', value: '2' },
];

export function SignupPage(): React.ReactElement {
    const [phone, setPhoneno] = React.useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [phoneCode, setPhoneCode] = useState('');
    const [value, setValue] = useState('');

    const [passwordHidden, setPasswordHidden] = useState(true);
    const [isInSignUpMode, setIsInSignUpMode] = useState(true);

    const app = useApp();

    const navigation = useNavigation<any>();

    const signIn = useCallback(async () => {
        const creds = Realm.Credentials.emailPassword(email, password);
        await app.logIn(creds);
    }, [app, email, password]);

    useEffect(() => {
        signIn();
    }, []);

    const onPressSignUp = useCallback(async () => {
        try {
            await app.emailPasswordAuth.registerUser({ email, password });
            navigation.navigate('SignIn')
        } catch (error: any) {
            Alert.alert(`Failed to sign up: ${error?.message}`);
        }
    }, [app, email, password]);

    const backnavigation = () => {
        navigation.navigate('Dashboard')
    }
    const signInNavigation = () => {
        navigation.navigate('SignIn')
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.top_image_contianer}>
                <Image source={loginTop}
                    style={styles.login_top_image} />
                <Image source={freshTop}
                    style={styles.fresh_top_image} />
            </View>
            <View style={styles.header_tittle_contianer}>
                <Text style={styles.sign_up_text_style}>Sign up</Text>
                <TouchableOpacity onPress={backnavigation}>
                    <Image source={backBtn} style={{ width: 60, height: 60, marginTop: -30, resizeMode: "contain", justifyContent: 'flex-end' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.sub_tittle_container_view}>
                <Text style={styles.signup_sub_tittle_text_style}>Hi, Please fill the information to complete
                    the sign up.</Text>
            </View>
            <View style={styles.sub_tittle_container_view}>
                <Text style={styles.email_tittle_style}>Email Address</Text>
                <TextInput style={styles.email_text_input_style}
                    placeholder={' Enter Email Address'}
                    placeholderTextColor={'#888B8F'}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.sub_tittle_container_view}>
                <Text style={styles.password_tittle_text_style}>Password</Text>
                <View style={styles.password_contianer_style}>
                    <TextInput style={styles.password_text_style}
                        placeholder={' Enter Password'}
                        placeholderTextColor={'#888B8F'}
                        onChangeText={setPassword}
                        secureTextEntry={passwordHidden}
                    />
                    <Icon
                        name={passwordHidden ? 'eye-off-outline' : 'eye-outline'}
                        size={25}
                        color="#888B8F"
                        style={{ marginLeft: 10 }}
                        onPress={() => setPasswordHidden(!passwordHidden)}
                    />

                </View>
            </View>
            <View style={styles.sub_tittle_container_view}>
                <Text style={styles.mobile_text_style}>Mobile Number</Text>
                <View
                    style={styles.mobile_no_contianer}>
                    <Dropdown
                        style={[
                            styles.input_country,
                            isFocus && { borderColor: '#888B8F' },
                        ]}
                        placeholderStyle={{
                            fontFamily: 'Quicksand',
                            color: '#F6F7F7',
                        }}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? '+1' : '+1'}
                        searchPlaceholder="+1"
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            setPhoneCode(item.label);
                        }}
                    />
                    <TextInput style={styles.mobile_no_text_input_style}
                        placeholder={' (000)000-000'}
                        placeholderTextColor={'#888B8F'}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="numeric"
                        returnKeyType="done"
                    />
                </View>

                <View style={styles.bottom_container_view}>
                    <Button
                        title="Continue"
                        titleStyle={styles.continue_btn_tittle_style}
                        onPress={onPressSignUp}
                        buttonStyle={styles.continue_btn_style}
                        icon={
                            <FontAwesome
                                name="angle-right"
                                size={30}
                                style={styles.left_arrow_icon_style}
                                color="#292929"
                            />
                        }
                    />
                </View>

                <View style={styles.agree_container_view_style}>
                    <Text style={styles.continue_agree_text_style}>By continuing you agree to our</Text>
                    <View style={styles.policy_text_style}>
                        <Text style={styles.policy_container}>
                            {' '}
                            Privacy Policy •
                        </Text>
                        <Text style={styles.policy_container}>
                            {' '}
                            Terms of services{' '}
                        </Text>

                    </View>

                </View>

            </View>
            <View style={styles.or_view_contianer}>
                <Text style={styles.or_text_style}>Or</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}>
                    <View style={styles.google_signin_contianer}>
                        <Image source={googlePlusIcon}
                            style={styles.google_image_style} />
                        <Text style={styles.button_text}>Connect with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.connect_google_contianer}>
                <Text style={styles.have_account_text_style}>Have an account?</Text>
                <TouchableOpacity onPress={signInNavigation}>
                    <Text style={styles.login_text_style}>Log in</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#292929' },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    input_country: {
        height: 45,
        width: 80,
        marginTop: 10,
        marginRight: 15,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#F6F7F7',
        borderColor: '#888B8F',
        backgroundColor: '#333333',
        fontFamily: 'Quicksand-Bold',
    },
    selectedTextStyle: {
        color: '#888B8F',
        fontFamily: 'Quicksand-Bold',
    },
    inputplaceholderstyle: {
        color: '#888B8F',
        fontFamily: 'Quicksand-Bold',
    },
    policy_container: {
        fontFamily: 'Quicksand-Medium',
        color: '#888B8F',
        fontSize: 10,
    },
    button: {
        backgroundColor: '#292929',
        borderColor: '#888B8F',
        borderWidth: 1,
        borderRadius: 3,
        height: 48,
        marginTop: 18,
        width: width / 1.15,
        marginLeft: 30
    },
    button_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#CCCCCC',
        padding: 12,
        fontFamily: 'Quicksand',
        justifyContent: 'center'
    },
    top_image_contianer: {
        flexDirection: 'row'
    },
    login_top_image: {
        width: 150, height: height / 6, marginTop: 0, resizeMode: "contain"
    },
    fresh_top_image: {
        width: width / 1.4, height: 170, marginTop: 0, resizeMode: "contain"
    },
    header_tittle_contianer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: -50, marginRight: 20
    },
    sign_up_text_style: {
        flex: 1, marginLeft: 30, fontFamily: 'Quicksand-Bold', fontWeight: 'bold', fontSize: 35, color: '#F6F7F7', marginTop: 15
    },
    sub_tittle_container_view: {
        marginTop: 20, marginLeft: 30
    },
    email_tittle_style: {
        fontFamily: 'Quicksand', color: '#F6F7F7', fontSize: 16, fontWeight: 'bold'
    },
    email_text_input_style: {
        backgroundColor: "#333333",
        borderColor: '#888B8F',
        borderRadius: 2,
        borderWidth: 1,
        marginTop: 10,
        marginRight: 30,
        width: width / 1.13,
        height: 45,
        color: '#888B8F',
    },
    signup_sub_tittle_text_style: {
        fontFamily: 'Quicksand', color: '#888B8F', fontSize: 16
    },
    password_tittle_text_style: {
        fontFamily: 'Quicksand', color: '#F6F7F7', fontSize: 16, fontWeight: 'bold'
    },
    password_contianer_style: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#333333",
        borderColor: '#888B8F',
        borderRadius: 2,
        borderWidth: 1,
        marginRight: 20,
    },
    password_text_style: {
        backgroundColor: "#333333",
        borderColor: '#888B8F',
        borderRadius: 2,
        borderWidth: 0,
        marginRight: 30,
        width: width / 1.50,
        height: 45,
        color: '#888B8F'
    },
    mobile_text_style: {
        fontFamily: 'Quicksand', color: '#F6F7F7', fontSize: 16, fontWeight: 'bold'
    },
    mobile_no_contianer: {
        flexDirection: 'row'
    },
    mobile_no_text_input_style: {
        backgroundColor: "#333333",
        borderColor: '#888B8F',
        borderRadius: 2,
        borderWidth: 1,
        marginTop: 10,
        marginRight: 30,
        width: width / 1.6,
        height: 45,
        color: '#888B8F',
    },
    bottom_container_view:
    {
        marginTop: height / 21,
    },
    continue_btn_tittle_style: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 16,
        color: '#292929',
    },
    continue_btn_style: {
        backgroundColor: '#FFC107',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginTop: 10,
        marginRight: 12,
        height: 50,
        width: width / 1.15
    },
    left_arrow_icon_style: {
        left: width / 1.29,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    agree_container_view_style: {
        marginTop: height / 35, justifyContent: 'center'
    },
    continue_agree_text_style: {
        fontFamily: 'Quicksand', color: '#888B8F', fontSize: 13, textAlign: 'center'
    },
    policy_text_style: {
        flexDirection: 'row', marginLeft: 0, marginTop: 10, justifyContent: 'center'
    },
    or_view_contianer: {
        marginTop: height / 50
    },
    or_text_style: {
        fontFamily: 'Quicksand', color: '#888B8F', fontSize: 13, textAlign: 'center'
    },
    google_signin_contianer: {
        flexDirection: 'row', justifyContent: 'center'
    },
    google_image_style: {
        width: 22, height: 22, marginTop: 10, marginLeft: 0, resizeMode: "contain",
    },
    connect_google_contianer: {
        flexDirection: 'row', marginTop: 15, justifyContent: 'center'
    },
    have_account_text_style: {
        fontFamily: 'Quicksand', color: '#888B8F', fontSize: 13
    },
    login_text_style: {
        marginLeft: 5, fontWeight: 'bold', fontFamily: 'Quicksand', color: '#828282', fontSize: 14
    }
})