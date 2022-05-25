import React, {useEffect, useState, useRef} from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import EmptyList from './information/EmptyList';
import Helper from '../Helper';
import { changeDevicePin } from '../controller/DeviceController';

const DeviceSettingsActivity = props => {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const confirmDialog = (title, message, okName, cancelName, handler) =>
    Alert.alert(
        title,
        message,
        [
        {text: okName, onPress: () => handler()},
        {
            text: cancelName,
            onPress: () => {},
            style: 'destructive',
        },
        ],
    );

  useEffect(()=>{

  },[])

  const goChangePIN = ()=>{
    if(newPin == "" || oldPin == "" || confirmNewPin == ""){
        alert("Please fill out the old and new pin!")
    }
    else if(newPin != confirmNewPin){
        alert("Please check the New Pin")
    }
    else{
        let id = props.route.params.id
        confirmDialog("Confirm", "Are you sure want to change PIN?", "Change", "Cancel", ()=>{
            changeDevicePin(id, oldPin, newPin).then((success)=>{
                if(success){
                    alert("Success change Door #"+id+" Pin")
                }
                else{
                    alert("Old pin is wrong")
                }
                setOldPin("")
                setNewPin("")
                setConfirmNewPin("")
            })
        })
    }
    
  }

  return (
    <View style={styles.root}>
        <TextInput style={styles.ti} 
            placeholder="Old Pin" 
            placeholderTextColor="#EAEAEA"
            keyboardType="numeric"
            secureTextEntry 
            onChangeText={(input)=>setOldPin(input)}
            value={oldPin}/>
        <TextInput 
            style={styles.ti} 
            placeholder="New Pin" 
            placeholderTextColor="#EAEAEA"
            keyboardType="numeric"
            secureTextEntry
            onChangeText={(input)=>setNewPin(input)}
            value={newPin}/>
        <TextInput 
            style={styles.ti} 
            placeholder="Confirm New Pin" 
            placeholderTextColor="#EAEAEA"
            keyboardType="numeric"
            secureTextEntry
            onChangeText={(input)=>setConfirmNewPin(input)}
            value={confirmNewPin}/>
        <Text style={styles.tErrConfirm}>
            {newPin!=confirmNewPin && confirmNewPin!="" ? "Not Match" : ""}
        </Text>
        <TouchableOpacity 
            style={styles.bc}
            onPress={()=>goChangePIN()} >
            <Text style={styles.tb}>Change PIN</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    root:{
        flex: 1,
    },
    ti: {
        backgroundColor: "white",
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: .2,
        elevation: 1,
        height: 50,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        color: "black"
    },
    bc: {
        backgroundColor: Helper.color.appAccentDark,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: .2,
        elevation: 1,
        height: 50,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    tErrConfirm:{
        color:"red",
        fontSize: Helper.font.normalSize,
        margin: 12
    },
    tb: {
        color: "white",
        fontSize: Helper.font.normalSize,
        fontWeight: "bold"
    }
});

export default DeviceSettingsActivity;
