import React from 'react'
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
const uc_figure = require("../assets/under_construction_figure.png")

const UnderConstruction = (props)=>{

    return(
        <View>
            <Image
                source={uc_figure}
                style={styles.img_uc}
            />
            <Text style={styles.txt_uc}>Under Construction</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img_uc:{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width
    },
    txt_uc:{
        width: Dimensions.get("window").width,
        textAlign: "center",
        fontSize: 20,
        color: "gray"
    }
})

export default UnderConstruction