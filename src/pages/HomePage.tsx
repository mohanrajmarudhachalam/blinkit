import { StyleSheet, Text, ListRenderItem, Dimensions, View, SafeAreaView, ScrollView, Image, FlatList, TextInput, PermissionsAndroid, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import GradientText from '../components/GradientText';
FontAwesome.loadFont();
import CategoryListItem from "../components/CategoryListItem"
import TodaysDealsitem from '../components/DealsofDayItem';
import { useUser } from "@realm/react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const { useRealm, useQuery } = realmContext;
import { realmContext } from '../database/RealmContext';
import { Category } from '../database/CategorySchema'
import { DealsOfDay } from '../database/DealsofDaySchema'
import Geolocation from 'react-native-geolocation-service';
import { LogBox } from 'react-native';
import { FlatListSlider } from 'react-native-flatlist-slider';
// Local images 
const basketLogo = require('../../assets/images/logo_baset.png');
const timeIcon = require('../../assets/images/timer_icon.png');
const homeVegicon = require('../../assets/images/vegtables_banner.png')
const homeSlider_1 =require('../../assets/images/home_1.png')
const homeSlider_2 =require('../../assets/images/home_2.png')
const homeSlider_3=require('../../assets/images/home_3.png')
const homeSlider_4=require('../../assets/images/home_4.png')
interface ILocation {
  latitude: number;
  longitude: number;
}
const images: any = [
  {
    banner: homeSlider_1,
  },
  {
    banner: homeSlider_2,
  },
  {
    banner: homeSlider_3,
  },
  {
    banner: homeSlider_4,
  }
]
export function HomePage(): React.ReactElement {
  const navigation = useNavigation<any>();
  const realm = useRealm();
  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  const [categoryItems, setCategoryItems] = React.useState<Category[]>([]);
  const dealsDay = useQuery(DealsOfDay);
  const dealsitems = dealsDay.sorted("_id");

  const result = useQuery(Category);
  const items = result.sorted("_id");

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead']);
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 0)'])
  }, [])

  /* useEffect(() => {
    const categoryItemsDetails = async () => {
      try {
        const categoryItems = await JSON.parse(JSON.stringify(useQuery(Category)));
        setCategoryItems(categoryItems)
      } catch (e) {

      }
    }
    categoryItemsDetails()
  }, []) */


  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(DealsOfDay));
    });
  }, [realm])

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Category));
    });
  }, [realm]);

  useEffect(() => {
    getUserGeoLocation()
  })

  const navigateProfilepage = () => {
    navigation.navigate('Profile')
  }
  const getLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      const fineLocationGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (fineLocationGranted) {
        return true;
      }

      const coarseLocationGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      if (coarseLocationGranted) {
        return true;
      }

      const fineLocationPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (fineLocationPermissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      const coarseLocationPermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      if (coarseLocationPermissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    }

    if (Platform.OS === 'ios') {
      const locationPermissionStatus = await Geolocation.requestAuthorization(
        'whenInUse',
      );

      const locationGranted = locationPermissionStatus === 'granted' || locationPermissionStatus === 'restricted';

      if (locationGranted) {
        return true;
      }
    }

    // user has denied location permission
    return false;
  };

  const getUserGeoLocation = async (): Promise<GeoPosition> => {
    const authorizedToGetLocation = await getLocationPermission();
    if (authorizedToGetLocation) {
      return new Promise<GeoPosition>((resolve, reject) => {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
          });
          //console.log(latitude,longitude);
          /* Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
              //console.log(json);
              var addressComponent = json.results[0].address_components;
              console.log(addressComponent);
          })
          .catch(error => console.warn(error)); */

        },
          error => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
      });
    }

    throw new Error('Location permission not granted.');
  };


  const todaydealrenderItem: ListRenderItem<DealsOfDay> = useCallback(({ item }) => (
    <TodaysDealsitem
      _id={item._id}
      name={item.name}
      deals_image={item.deals_image}
      counts={item.counts}
      newprice={item.newprice}
      offerDetails={item.offerDetails}
      owner_id={item.owner_id}
      oldprice={item.oldprice} />
  ), []);


  const categoryListItem: ListRenderItem<Category> = useCallback(({ item }) =>
    <CategoryListItem
      _id={item._id}
      name={item.name}
      category_image={item.category_image}
      backcolor={item.backcolor}
      textcolor={item.textcolor}
      owner_id={item.owner_id} />
    , [])

  return (
    <SafeAreaView style={styles.maincontainer}>
      <View style={styles.location_top_contaner}>
        <View style={styles.place_contaner}>
          <View style={styles.location_layout}>
            <FontAwesome
              name="map-marker"
              size={30}
              style={styles.map_font_awesome}
              color="#FCF8F8"
            />
            <View style={styles.location_name_contaner}>
              {location ? (
                <>
                  {/*  <Text>Latitude: {location.latitude}</Text>
                    <Text>Latitude: {location.longitude}</Text> */}

                  <Text style={styles.locationdetails}>SM Towers</Text>
                  <Text style={styles.locationaddressdetails}>saravana Matrix Tower Rajiv Gandhi Salai,chennai</Text>

                </>
              ) : (
                <>
                  <Text style={styles.locationdetails}>SM Towers</Text>
                  <Text style={styles.locationaddressdetails}>saravana Matrix Tower Rajiv Gandhi Salai,chennai</Text>

                </>
              )}
            </View>
            <View style={styles.user_contaner}>
              <TouchableOpacity onPress={navigateProfilepage} >
                <View
                  style={styles.user_view_layout} >
                  <FontAwesome
                    name="user"
                    size={30}
                    style={styles.user_fontawesome}
                    color="#F3B1B0"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.serach_view_layout}>
          <FontAwesome
            name="search"
            size={15}
            color={'#888B8F'}
            style={styles.font_awesome_search}
          />
          <TextInput
            style={styles.search_input}
            returnKeyType="done"
            placeholder={'Search for brand or items'}
            placeholderTextColor={'#888B8F'}
          />

          <View style={styles.verticleLine}></View>
          <FontAwesome
            name="microphone"
            size={15}
            color={'#888B8F'}
            style={styles.search_fontawesome}
          />
        </View>
        <View style={{ paddingBottom: 15 }}>
          <View style={styles.delivery_time_container}>
            <View style={styles.title_container}>
              <Image
                source={basketLogo}
                style={styles.imagecon}
              />
              <GradientText style={styles.logintitle}>Basket </GradientText>
            </View>
          </View>
          <View style={styles.delivery_layout}>
            <Text style={styles.delivery_text}>Delivering in</Text>
            <View style={styles.timer_contianer}>
              <Image
                source={timeIcon}
                style={styles.timer_image_contianer}
              />
              <GradientText style={styles.time_container}>25-30 mins</GradientText>
            </View>
          </View>
        </View>

      </View>
      <ScrollView style={styles.scrollview_contaner}>
        <View>

          <View style={styles.slider_style}>
            <FlatListSlider
              data={images}
              height={160}
              width={width / 1.11}
              timer={5000}
              animation
              onPress={() => console.log}
              contentContainerStyle={{ position: 'relative', margin: 0 }}
              imageKey={'banner'} local />

          </View>



          <Text style={styles.shopcategory_text}>Shop by Category</Text>

          <View style={styles.list_contianer}>
            <FlatList
              data={items}
              renderItem={categoryListItem}
              style={styles.sub_cate_container}
              contentContainerStyle={styles.list}
              numColumns={3}
            />
          </View>

          <Image
            source={homeVegicon}
            style={styles.image_banner_style}
          />

          <View style={styles.detals_of_day_contianer}>
            <Text style={styles.text_tittle_style}>Deal of the Day</Text>
            <Text style={styles.see_all_text_style}>See all</Text>
          </View>
          <View style={styles.list_contianer}>
            <FlatList
              data={dealsitems}
              renderItem={todaydealrenderItem}
              style={styles.sub_cate_container}
              contentContainerStyle={styles.list}
              numColumns={2}
            />

          </View>

        </View>
      </ScrollView>


    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  slider_style: {
    margin: 15
  },
  list_contianer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  maincontainer: {
    backgroundColor: '#252525',
    flex: 1
  },
  divider_1_style: {
    backgroundColor: '#F5F5F5',
    marginTop: 15, 
    width: width / 1.15, 
    marginLeft: 30,
  },

  map_font_awesome: {
    height: 40,
    width: 40,
    left: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  location_top_contaner: {
    width: width,
    backgroundColor: '#292929',
    borderBottomStartRadius: 35,
    borderBottomEndRadius: 35,
    borderRightWidth: 0.17,
    borderLeftWidth: 0.17,
    borderBottomWidth: 0.5,
    borderColor: '#F5EFEF',
  },
  scrollview_contaner: {
    marginTop: 10
  },
  shopcategory_text: {
    fontFamily: 'Quicksand-Bold',
    margin: 25,
    color: '#F6F7F7'
  },
  place_contaner: {
    flexDirection: 'row',
    marginTop: 20,
  },
  location_layout: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  location_name_contaner: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  user_contaner: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginLeft: width / 5.5
  },
  user_view_layout: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    borderWidth: (50 * 5) / 100,
    backgroundColor: '#ffebe4',
  },
  user_fontawesome: {
    height: 30,
    width: 30,
    left: 7,
    alignItems: 'center',
  },
  discount_slider: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  locationdetails: {
    color: '#F6F7F7',
    fontSize: 13,
    fontFamily: 'Quicksand-Bold'
  },
  locationaddressdetails: {
    color: '#888B8F',
    fontSize: 9,
    marginTop: 2,
    fontFamily: 'Quicksand'
  },
  serach_view_layout: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderWidth: 0.5,
    borderColor: '#888B8F',
    height: 40,
    borderRadius: 5,
    marginLeft: width / 20,
    marginRight: width / 15,
    marginTop: 10,

  },
  search_fontawesome: {
    alignSelf: 'center',
    marginLeft: 15
  },
  search_input: {
    width: '75%',
    marginLeft: 25,
    color: '#888B8F'
  },
  font_awesome_search: {
    alignSelf: 'center',
    marginLeft: 5
  },
  circle_user: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  logintitle: {
    fontSize: 24,
    marginLeft: 5,
    fontFamily: 'Quicksand-Bold',
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 40,
    marginLeft: 20
  },
  imagecon: {
    height: '60%',
    weight: '110%',
  },
  delivery_layout: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  time_container: {
    fontSize: 18,
    marginRight: 15,
    fontFamily: 'Quicksand-Bold',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 14
  },
  delivery_text: {
    alignSelf: 'flex-end',
    marginRight: 20,
    fontFamily: 'Quicksand-Bold',
    fontSize: 11,
    marginBottom: -15,
    color: '#888B8F'
  },
  timer_contianer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 0
  },
  timer_image_contianer: {
    alignSelf: 'center',
    marginTop: 15,
    marginLeft: 15
  },
  delivery_time_container: {
    flexDirection: 'row',
    marginTop: -5
  },
  input_search: {
    height: 40,
    width: 350,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 30,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#F6F7F7',
    borderColor: '#888B8F',
    backgroundColor: '#333333',
    fontFamily: 'Quicksand-Bold',
    alignSelf: 'center',
    alignContent: 'center'
  },
  inputplaceholderstyle: {
    color: '#888B8F',
    fontFamily: 'Quicksand-Bold',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10
  },
  imageStyle: {
    padding: 10,
    margin: 0,
    height: 25,
    width: 25,
    alignItems: 'center',
    alignSelf: 'center',
    color: '#888B8F'
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  sub_cate_container: {
    flex: 1,
  },
  list: {
    justifyContent: 'space-around',
  },
  subcategory_tittle: {
    fontSize: 13,
    fontFamily: 'Quicksand-Bold',
    marginLeft: 10
  },
  image_banner_style: {
    alignItems: 'center', 
    alignSelf: 'center',
    marginTop: 20
  },
  detals_of_day_contianer: {
    flexDirection: 'row'
  },
  text_tittle_style: {
    fontFamily: 'Quicksand-Bold', 
    margin: 25, 
    color: '#F6F7F7'
  },
  see_all_text_style: {
    fontFamily: 'Quicksand-Bold',
    color: '#FFC107',
    alignItems: 'center', marginLeft: 160,
    margin: 25, alignSelf: 'flex-end'
  }
})