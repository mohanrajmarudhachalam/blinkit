import React from 'react';
import { Category } from '../database/CategorySchema';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { useNavigation } from '@react-navigation/native';
import { BSON } from "realm";

export interface category {
    _id: BSON.ObjectId;
    name: string;
    category_image: string;
    backcolor: string;
    owner_id: string;
    textcolor: string;
}


export function CategoryListItem(props: category) {
  const navigation = useNavigation<any>();
  const { _id, name, category_image, backcolor, textcolor } = props;
  const navigateCateooryList = () => {
    navigation.navigate("Categorylist", { categoryname:name, category_id:_id })
  }
  return (
    <View>
      <TouchableOpacity onPress={navigateCateooryList} >
        <View style={{
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          shadowOpacity: 0.26,
          elevation: 8,
          backgroundColor: backcolor,
          padding: 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          margin: 5,
          justifyContent: 'center',
          width: 110,
          height: 110,
        }}>
          <Icon imageSource={category_image} />
          <Text style={{
            fontSize: 10,
            fontFamily: 'Quicksand-Bold',
            fontWeight: "bold",
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
            color: textcolor
          }}>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CategoryListItem;
