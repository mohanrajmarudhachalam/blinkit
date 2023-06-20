import { StyleSheet, Text, View, Image, Dimensions, Button, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from "react";
import Realm from "realm";
import { useApp } from "@realm/react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginPages } from '../pages/LoginPages';
import { useNavigation } from '@react-navigation/native';
const leftLeafImage = require('../../assets/images/leftleaf.png');
const freshTopImage = require('../../assets/images/freash_top.png')
const rightLeafImage = require('../../assets/images/right_leaf.png')
const titleImage = require('../../assets/images/title.png')
const leftBottomImage = require('../../assets/images/leftbottom.png')
const freshBottomImage = require('../../assets/images/freash_top.png')
const { width, height } = Dimensions.get('window');

export function LoginDashboardScreen(): React.ReactElement {
  /* const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); */
  const navigation = useNavigation<any>();

  /* const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  const app = useApp(); */

  /* const signIn = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  }, [app, email, password]); */

  /*  useEffect(() => {
     signIn();
   }, []); */

  const loginNavigation = () => {
    navigation.navigate('SignIn')
  }

  const signupnNavigation = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.top_image_container_style}>
          <Image source={leftLeafImage}
            style={styles.left_leaf_image_style} />
          <Image source={freshTopImage}
            style={styles.fresh_top_image_style} />
        </View>
        <View style={styles.right_leaf_image_container}>
          <Image source={rightLeafImage}
            style={styles.right_image_style} />
        </View>
        <View >
          <Image source={titleImage}
            style={styles.tittle_image_style} />
        </View>
        <Text style={styles.login_description_style}>Lorem ipsum dolor sit amet, consetetursadipscing
          sadipscing elitr, sed diam nonumy</Text>
      </View>
      <View style={styles.fresh_image_continaer}>
        <Image source={leftBottomImage}
          style={styles.fresh_left_image} />
        <Image source={freshBottomImage}
          style={styles.fresh_top_image} />
      </View>
      <View style={styles.container_button_view}>
        <TouchableOpacity
          onPress={signupnNavigation}
          style={styles.button}>
          <Text style={styles.button_text}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.login_contianer}>
          <TouchableOpacity
            onPress={loginNavigation}
            style={styles.button_login}>
            <Text style={styles.button_text_login}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.company_text_style}>Powered by Wekan</Text>
    </View>
  )
}
export default LoginDashboardScreen
const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#292929'
  },
  button: {
    backgroundColor: '#292929',
    borderColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 3,
    height: 48,
    width: 160,
  },
  button_login: {
    backgroundColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 3,
    height: 48,
    width: 160,
  },
  button_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFC107',
    padding: 12,
    fontFamily: 'Quicksand'
  },
  button_text_login: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#292929',
    padding: 12,
    fontFamily: 'Quicksand'
  },
  top_image_container_style: {
    flexDirection: 'row'
  },
  left_leaf_image_style: {
    width: 100,
    height: height / 4.5,
    marginTop: 10,
    resizeMode: "contain"
  },
  fresh_top_image_style: {
    width: width / 1.3,
    height: 180,
    marginTop: 10,
    resizeMode: "contain"
  },
  right_leaf_image_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  right_image_style: {
    width: 120,
    height: height / 3,
    resizeMode: "contain"
  },
  tittle_image_style: {
    width: width / 1.3,
    height: height / 2.8,
    marginLeft: 24,
    marginTop: -270,
    resizeMode: "contain"
  },
  login_description_style: {
    marginTop: -90,
    marginLeft: 24,
    fontFamily: 'Quicksand',
    color: '#868889'
  },
  fresh_image_continaer: {
    flexDirection: 'row'
  }, fresh_left_image: {
    width: 220,
    height: height / 3,
    marginTop: 5,
    resizeMode: "contain"
  },
  fresh_top_image: {
    width: width / 1.3,
    height: 180,
    marginTop: 10,
    resizeMode: "contain"
  },
  container_button_view: {
    flexDirection: 'row',
    marginLeft: width / 14
  },
  login_contianer: {
    marginLeft: 25
  },
  company_text_style: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: height / 35,
    fontFamily: 'Quicksand',
    color: '#888B8F'
  }
})