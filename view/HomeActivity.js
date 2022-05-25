import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import EmptyList from './information/EmptyList';
import DoorLockIcon from "./assets/door_lock_icon.png"
import Helper from '../Helper';
import { getDevices } from '../controller/DeviceController';

const HomeActivity = ({navigation}) => {
  const [showData, setShowData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const prepareDevices = () => {
    getDevices().then((devices)=>{
      setShowData(devices)
      setIsRefreshing(false)
    })
    
  };

  useEffect(()=>{
    setIsRefreshing(true)
    prepareDevices();
  }, [])

  const goItemDetail = (id)=>{
    navigation.navigate("Device", {name: "Door #"+id, id: id})
  }

  const refreshHandler = ()=>{
    setIsRefreshing(true)
    prepareDevices();
    
  }

  const ItemUI = ({item})=>{
      return(
          <TouchableOpacity 
            style={styles.itemContainer}
            onPress={()=>goItemDetail(item.deviceId)}>
              <Image style={styles.itemImage} source={DoorLockIcon}/>
              <View style={styles.itemInfoContainer}>
                <Text style={styles.tInfo}>Door {"#"+item.deviceId}</Text>
              </View>
          </TouchableOpacity>
      )
  }


  return (
    <View style={styles.root}>
        <FlatList
          style={styles.list}
          data={showData}
          ListEmptyComponent={<EmptyList message={'Empty'} />}
          refreshing={isRefreshing}
          onRefresh={() => refreshHandler()}
          renderItem={({item, index}) => {
            return (
              <ItemUI item={item} />
            );
          }}
        />
        
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemImage:{
    height: 200,
    resizeMode: "center",
    alignSelf:"center"
  },
  itemContainer:{
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: .5,
    elevation: 1,
    flex: 1,
    
  },
  itemInfoContainer:{
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 20,
      flex: 1
  },
  tInfo:{
      color: "white",
      fontSize: Helper.font.bigSize,
      fontWeight: "bold"
  }
});

export default HomeActivity;
