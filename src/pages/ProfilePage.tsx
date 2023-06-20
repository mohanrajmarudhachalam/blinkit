import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, SectionList, Dimensions, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useUser } from "@realm/react";
import { Input, Button, Divider } from 'react-native-elements';
const { useRealm, useQuery } = realmContext;
import { realmContext } from '../database/RealmContext';
const itemSubscriptionName = 'items';
const ownItemsSubscriptionName = 'ownItems';
const backBtn = require('../../assets/images/backbtn.png')
const { width, height } = Dimensions.get('window');
import Orders from '../../assets/svgs/orders.svg'
import Passwords from '../../assets/svgs/lock.svg';
import Addressbook from '../../assets/svgs/address.svg';
import Payments from '../../assets/svgs/payment.svg';
import Wallet from '../../assets/svgs/wallet.svg';
import Terms from '../../assets/svgs/terms.svg';
import About from '../../assets/svgs/about.svg';
import Close from '../../assets/svgs/close_btn.svg';
import NaviagateIcon from '../../assets/svgs/pr_navi.svg';
import GradientText from '../components/GradientProfile';


const profileData = [
  {
    title: 'Your Information',
    data: [
      {
        key: 1,
        name: 'Your Orders',
        image: Orders,
        navigat: NaviagateIcon
      },
      {
        key: 2,
        name: 'Change Password',
        image: Passwords,
        navigat: NaviagateIcon
      },
      {
        key: 3,
        name: 'Address Book',
        image: Addressbook,
        navigat: NaviagateIcon
      }
    ]
  },
  {
    title: 'Other Information',
    data: [
      {
        key: 4,
        name: 'Payments Methods',
        image: Payments,
        navigat: NaviagateIcon,
      },
      {
        key: 5,
        name: 'Wallet',
        image: Wallet,
        navigat: NaviagateIcon
      }
    ]
  },
  {
    title: 'Legal',
    data: [
      {
        key: 6,
        name: 'Privacy Policy',
        image: Passwords,
        navigat: NaviagateIcon
      },
      {
        key: 7,
        name: 'Terms of Use',
        image: Terms,
        navigat: NaviagateIcon
      },
      {
        key: 8,
        name: 'About Us',
        image: About,
        navigat: NaviagateIcon
      }
    ]
  }
]
export function ProfilePage({ navigation }: { navigation: any }) {
  const [results, setResults] = useState(profileData)
  const navigateHome = () => {
    navigation.navigate('Home')
  }
  const navigateLogin = () => {
    navigation.navigate('SignIn')
  }
  return (
    <SafeAreaView style={styles.main_contianer}>
      <View>
        <View style={styles.profile_header_contianer}>
          <View style={styles.name_contianer}>
            <View style={styles.profile_name_contianer}>
              <Text style={{ color: '#FFFFFF', fontFamily: 'Nunito-Bold', fontSize: 18 }}>Jane Cooper</Text>
              <View style={styles.phonecontainer}>
                <Text style={{ color: '#888B8F', fontFamily: 'Nunito' }}>+1 (480) 555-0103</Text>
                <GradientText style={styles.editTextStyle}>Edit </GradientText>
              </View>
            </View>
            <Pressable onPress={navigateHome}>
              <Close height={40} width={40} style={{ resizeMode: "contain", justifyContent: 'flex-end', marginTop: 10 }} />
            </Pressable>
          </View>
        </View>
        <Divider style={styles.divider_1_style} />
        <ScrollView>
          <View style={styles.container}>
            <SectionList
              sections={results}
              renderSectionHeader={({ section }) => {
                return (
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{section.title}</Text>
                  </View>
                )
              }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.container}>
                    <View style={{ flexDirection: 'column', flex: 1, }}>
                      <View style={{flexDirection:'row'}}>
                        <item.image />
                        <View style={styles.content}>
                          <View style={styles.contentHeader}>
                            <Text style={styles.name}>{item.name}</Text>
                            <item.navigat />
                          </View>
                        </View>
                      </View>
                     {item.key===8?<></>:<Divider style={styles.divider_1_style} />}  
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <Pressable onPress={navigateLogin}>
            <GradientText style={styles.logoutTextStyle}>Logout </GradientText>
          </Pressable>
        </ScrollView>

      </View>
    </SafeAreaView>

  )
}



export default ProfilePage

const styles = StyleSheet.create({
  profile_name_contianer: {
    marginLeft: width / 15,
    marginTop: 5
  },
  phonecontainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  name_contianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: width / 15

  },
  main_contianer: {
    flex: 1,
    backgroundColor: '#202020'
  },
  profile_header_contianer: {
    flexDirection: 'column'
  },
  divider_1_style: {
    backgroundColor: '#F5F5F5',
    marginTop: 15,
    height: 0.001
  },
  root: {
    marginTop: 20,
    padding: 10,
  },
  titleContainer: {
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontWeight: 'bold'
  },
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  content: {
    marginLeft: 16,
    flex: 1,
    height: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#888B8F',
  },
  name: {
    fontSize: 14,
    color: '#888B8F'
  },
  editTextStyle: {
    fontFamily: 'Nunito',
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 0,
    marginLeft: 15,
    color: '#C92B2B',
    fontWeight: 'bold'

  },
  logoutTextStyle: {
    fontFamily: 'Nunito',
    fontSize: 12,
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginTop: 60,
    color: '#C92B2B',
    fontWeight: 'bold',
    marginLeft: 25,
    textDecorationLine: 'underline',
  }
});