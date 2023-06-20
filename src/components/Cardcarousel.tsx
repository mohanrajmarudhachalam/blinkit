import { StyleSheet, Text, View,FlatList, Dimensions, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
const {height, width} = Dimensions.get('window');
const Cardcarousel = () => {
    const [data, SetData] = useState([5]);
    const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        height: height/6,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex(0);
        }}
        horizontal
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: width - 50,
                height: height / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                disabled={true}
                style={{
                  width: '90%',
                  height: '90%',
                  backgroundColor: 'green',
                  borderRadius: 10,
                }}></TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {data.map((item, index) => {
        return (
          <View
            style={{
              width: currentIndex == index ? 50 : 8,
              height: currentIndex == index ? 10 : 8,
              borderRadius: currentIndex == index ? 5 : 4,
              backgroundColor: currentIndex == index ? 'green' : 'gray',
              marginLeft: 5,
              marginTop:5
            }}></View>
        );
      })}
    </View>
  </View>
  );
}

export default Cardcarousel

const styles = StyleSheet.create({})