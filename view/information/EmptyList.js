import React from 'react'
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
const uc_figure = require("../assets/empty_figure.png")

const EmptyList = ({message})=>{

    return(
        <View style={styles.container}>
            <Image
                source={uc_figure}
                style={styles.img_uc}
            />
            <Text style={styles.txt_uc}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: "100%"
    },
    img_uc:{
        width: Dimensions.get("window").width - 100,
        height: Dimensions.get("window").width - 100,
        margin: 50
    },
    txt_uc:{
        width: Dimensions.get("window").width,
        textAlign: "center",
        fontSize: 20,
        color: "gray"
    }
})

export default EmptyList