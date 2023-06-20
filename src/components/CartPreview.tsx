import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();
const { width, height } = Dimensions.get('window');
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';


const CartPreview = () => {
  const navigation = useNavigation<any>();
  const cart = useSelector((state:any) => state.cart.cart);
  const total = cart
  .map((item:any) => item.newprice * item.quantity)
  .reduce((curr:any, prev:any) => curr + prev, 0);
  const cartPageNaviagtion =()=>{
    navigation.navigate('Cart')
  }
  return (
    <View style={styles.footerWrap} >
      <View style={{ marginLeft: 15, marginRight: 15, backgroundColor: '#FFC107', height: 55, borderRadius: 5 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center',height: '100%', flex: 1,}}>
          <View style={{ flexDirection: 'column',marginLeft:10}}>
            <Text style={{ color: '#000',  fontFamily: 'Quicksand-Bold',fontSize:10,marginLeft:5 }}>ITEM TOTAL</Text>
            <View style={{ flexDirection:'row'}}>
            <Text style={{ color: '#000000', fontSize: 12,justifyContent: 'center', alignItems: 'center' , fontFamily: 'Quicksand-Bold', }}> ${total.toFixed(1)}</Text>
            <Text style={{fontFamily: 'Quicksand-Bold',fontSize: 12,marginLeft:5}}>Plus taxes</Text>
            </View>
          </View>
          <TouchableOpacity onPress={cartPageNaviagtion}>
          <View style={{ flexDirection:'row',alignItems: 'center',marginLeft:width/2.45}}>
            <Text style={{ color: '#000',  fontFamily: 'Quicksand-Bold',fontSize:12,justifyContent:'flex-end'}}>View Cart</Text>
            <FontAwesome
                                name="angle-right"
                                size={25}
                                style={{
                                    left: 15,
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',

                                }}
                                color="#292929"
                            />

          </View>
          </TouchableOpacity>

        </View>


      </View>
    </View>
  )
}

export default CartPreview

const styles = StyleSheet.create({
  footerWrap: {
    height: 100,
    backgroundColor: 'transparent'
  },
})