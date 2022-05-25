import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';

const HomeActivity = props => {
    const [showData, setShowData] = useState([1,2]);
    const [isRefreshing, setIsRefreshing] = useState(true);
  
    const prepareActions = () => {
      setIsRefreshing(false)
      
    };
  
    useEffect(()=>{
    //   setIsRefreshing(true)
      alert(isRefreshing)
    }, [])
  
  
    const refreshHandler = ()=>{
    //   prepareActions();
    //   setIsRefreshing(false)
    alert("hey")
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
                <Text>{item}</Text>
              );
            }}
          />
          <Text>--</Text>
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
  });
  
  export default HomeActivity;