import React, {useEffect, useState, useRef} from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import EmptyList from './information/EmptyList';
import Helper from '../Helper';
import Footage from "./assets/cam_footage.jpeg"
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import { getDeviceLogs } from '../controller/DeviceLogController';


const DeviceLogActivity = props => {
    const [showData, setShowData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const prepareLogs = () => {
        getDeviceLogs(props.route.params.id).then((deviceLogs)=>{
          setShowData(deviceLogs)
          setIsRefreshing(false)
        })
        
    };

    useState(()=>{
        setIsRefreshing(true)
        prepareLogs()
    }, [])


    const refreshHandler = ()=>{
        setIsRefreshing(true)
        prepareLogs();
    }

    const ItemUI = ({item})=>{
        const [visible, setVisible] = useState(false)
        return(
            <TouchableOpacity 
            style={styles.itemContainer}
            onPress={()=>setVisible(true)}>
                <View style={styles.imageContainer}>
                    <Image style={styles.itemImage} source={{uri:item.picturePath, headers:{Accept:"*/*"}}}/>
                </View>
                <View style={styles.itemInfoContainer}>
                    <View style={styles.itemInfoContainerCol}>
                        {item.success == 1 ? 
                          <Ionicons name="checkmark" size={Helper.font.bigSize} style={{color:"darkgreen"}}/> :
                          <Ionicons name="close" size={Helper.font.bigSize} style={{color:"red"}}/>}
                        {item.success == 1 ? 
                          <Text style={styles.tInfo}>Success</Text> :
                          <Text style={styles.tInfo}>Failed</Text>}
                    </View>
                    <View style={styles.itemInfoContainerCol}>
                        <Ionicons name="calendar-outline" size={Helper.font.bigSize}/>
                        <Text style={styles.tInfo}>{Helper.readableDate(new Date(item.createdAt.split(" ")[0]))}</Text>
                    </View>
                    <View style={styles.itemInfoContainerCol}>
                        <Ionicons name="time-outline" size={Helper.font.bigSize}/>
                        <Text style={styles.tInfo}>{item.createdAt.split(" ")[1]}</Text>
                    </View>
                </View>

                <Modal
                    visible={visible}
                    transparent={false}
                    backdropColor = {'black'}
                    backdropOpacity = {1}
                    onRequestClose={() => setVisible(false)}>
                    <SafeAreaView style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={()=>setVisible(false)}>
                            <Ionicons name="close" size={Helper.font.bigSize} style={{color:"black"}}/>
                        </TouchableOpacity>
                        <Image style={styles.itemImageFS} source={{uri:item.picturePath}}/>
                        
                    </SafeAreaView>
                    
                </Modal>
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
              <ItemUI item={item}/>
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
    flex: 1
  },
  imageContainer:{
    flex: 1,
    overflow: "hidden",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },    
  itemImage:{
    height: 200,
    width: Dimensions.get('window').width,
    resizeMode: "cover",
    alignSelf:"center"
  },
  itemImageFS:{
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf:"center",
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
    backgroundColor: "white",
    padding: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemInfoContainerCol:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  tInfo:{
    color: "black",
    fontSize: Helper.font.normalSize,
    marginLeft: 10
  },
  modalContainer:{
      paddingTop: 50,
      flex: 1,
      backgroundColor:"black",
      justifyContent: "center",
      alignItems: "flex-end",
      paddingBottom: 100
  },
  closeButton:{
      backgroundColor:"white",
      margin: 10,
      width: 30,
      height: 30,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center"
  }
});

export default DeviceLogActivity;
