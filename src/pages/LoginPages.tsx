import React, { useCallback, useState, useEffect } from "react";
import Realm from "realm";
import { useApp } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Alert, Image, Dimensions, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { LogBox } from 'react-native';

Icon.loadFont();
FontAwesome.loadFont();

export function LoginPages(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  const app = useApp();

  const signIn = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  }, [app, email, password]);

  useEffect(() => {
    signIn();
  }, []);

  useEffect(() => {
    //LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead']);
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection'])
  }, [])

  const onPressSignIn = useCallback(async () => {
    try {
      await signIn();
    } catch (error: any) {
      Alert.alert(`Failed to sign in: ${error?.message}`);
    }
  }, [signIn]);


  const backnavigation = () => {
    navigation.navigate('Dashboard')
  }
  const findAccNavigation = () => {
    navigation.navigate('FindAccount');
  }
  const signUpNavigation = () => {
    navigation.navigate('Signup');
  }


  return (
    <ScrollView style={styles.container}>
    <View style={styles.top_images_view_style}>
      <Image source={require('../../assets/images/logintop.png')}
        style={styles.top_image_right_side_style} />
      <Image source={require('../../assets/images/freash_top.png')}
        style={styles.top_left_side_style} />
    </View>
    <View style={styles.login_title_view}>
      <Text style={styles.text_style_login}>Login</Text>
      <TouchableOpacity onPress={backnavigation}>
        <Image source={require('../../assets/images/backbtn.png')} style={styles.image_style_back_btn} />
      </TouchableOpacity>
    </View>
    <View style={styles.style_signup_des}>
      <Text style={styles.login_des_text_style}>Hi, Please fill the information to complete the login.</Text>
    </View>
    <View style={styles.email_view_contianer}>
      <Text style={styles.email_address_title_text_style}>Email Address</Text>
      <TextInput style={styles.text_input_email}
        placeholder={' Enter Email Address'}
        placeholderTextColor={'#888B8F'}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
    </View>
    <View style={styles.email_view_contianer}>
      <Text style={styles.password_title_text_style}>Password</Text>
      <View style={styles.password_secondary_contianer}>
        <TextInput style={styles.password_text_input}
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
    <View style={styles.btn_view_contianer}>
      <Button
        title="Continue"
        titleStyle={{
          fontFamily: 'Quicksand-Bold',
          fontSize: 16,
          color: '#292929',
        }}
        onPress={onPressSignIn}
        buttonStyle={styles.btn_style_view}
        icon={
          <FontAwesome
            name="angle-right"
            size={30}
            style={styles.left_arrow_style}
            color="#292929"
          />
        }
      />
    </View>
    <View style={styles.forgot_view_contianer}>
      <Text style={styles.forgotton_text_style}>Forgotten your login details?</Text>
      <TouchableOpacity
        onPress={findAccNavigation}>
        <Text style={styles.get_help_text_style}>Get help with logging in.</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.or_view}>
      <Text style={styles.or_text_style}>Or</Text>
    </View>
    <View>
      <TouchableOpacity
        style={styles.button}>
        <View style={styles.gplus_container}>
          <Image source={require('../../assets/images/gplus.png')}
            style={styles.gplus_image_style} />
          <Text style={styles.button_text}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
    <Divider style={styles.divider_style} />
      <View style={styles.havnot_view}>
        <Text style={styles.havenot_text_style}>Don’t have an account?</Text>
        <TouchableOpacity onPress={signUpNavigation}>
          <Text style={styles.signup_text_style}>Sign up</Text>
        </TouchableOpacity>
      </View>
  </ScrollView>
    
  )
}
const styles = StyleSheet.create({
  signup_text_style: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    color: '#828282',
    fontSize: 14
  },
  havenot_text_style: {
    fontFamily: 'Quicksand',
    color: '#888B8F',
    fontSize: 13
  },
  havnot_view: {
    flexDirection: 'row',
    marginTop: height/115,
    justifyContent: 'center'
  },
  divider_style: {
    backgroundColor: '#383838',
    marginTop: height/15,
    width: width / 1.15,
    marginLeft: 30
  },
  gplus_image_style: {
    width: 22,
    height: 22,
    marginTop: 10,
    marginLeft: 0,
    resizeMode: "contain",
  },
  gplus_container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  or_text_style: {
    fontFamily: 'Quicksand',
    color: '#888B8F',
    fontSize: 13,
    textAlign: 'center'
  },
  or_view: {
    marginTop: height / 35
  },
  get_help_text_style: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Quicksand',
    color: '#BDBDBD',
    fontSize: 14
  },
  forgotton_text_style: {
    fontFamily: 'Quicksand',
    color: '#888B8F',
    fontSize: 13
  },
  forgot_view_contianer: {
    flexDirection: 'row',
    marginTop: height / 20,
    marginLeft: width / 15
  },
  left_arrow_style: {
    left: width / 1.29,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn_style_view: {
    backgroundColor: '#FFC107',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 15,
    marginLeft: 29,
    marginRight: 12,
    height: 50,
    width: width / 1.15
  },
  btn_view_contianer: {
    marginTop: height / 50
  },
  password_text_input: {
    backgroundColor: "#333333",
    borderColor: '#888B8F',
    borderRadius: 2,
    borderWidth: 0,
    marginRight: 30,
    width: width / 1.50,
    height: 45,
    color: '#888B8F'
  },
  password_secondary_contianer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#333333",
    borderColor: '#888B8F',
    borderRadius: 2,
    borderWidth: 1,
    marginRight: width / 20,
  },
  password_title_text_style: {
    fontFamily: 'Quicksand', color: '#F6F7F7', fontSize: 16, fontWeight: 'bold'
  },
  text_input_email: {
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
  email_address_title_text_style: {
    fontFamily: 'Quicksand',
    color: '#F6F7F7',
    fontSize: 16,
    fontWeight: 'bold'
  },
  email_view_contianer: {
    marginTop: height / 30,
    marginLeft: width / 15
  },
  login_des_text_style: {
    fontFamily: 'Quicksand',
    color: '#888B8F',
    fontSize: 16
  },
  style_signup_des: {
    marginTop: height / 25,
    marginLeft: width / 15
  },
  image_style_back_btn: {
    width: 60,
    height: 60,
    marginTop: -30,
    resizeMode: "contain",
    justifyContent: 'flex-end'
  },
  text_style_login: {
    flex: 1,
    marginLeft: 30,
    fontFamily: 'Quicksand-Bold',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#F6F7F7',
    marginTop: -20
  },
  login_title_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -50,
    marginRight: 20
  },
  top_left_side_style: {
    width: width / 1.4,
    height: 170,
    marginTop: 0,
    resizeMode: "contain"
  },
  top_image_right_side_style: {
    width: 150,
    height: height / 6,
    marginTop: 0,
    resizeMode: "contain"
  },
  top_images_view_style: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#292929'
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: '#000000'
  },
  logo: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: 160,
    height: 52
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
})