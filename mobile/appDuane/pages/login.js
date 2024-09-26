import React, {useEffect, useState} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import {useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import {getStatusBarHeight} from "react-native-status-bar-height";

// import api from "../services/api/api"

export default function Login(){
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.androidSafeArea}>
            <View style={styles.container}>
                <Image source={require("../assets/ondas-rosa-header.png")} style={{width: '100%', height: 200}}/>
                <View>
                    <View>
                        <Image source={require("../assets/Duane.png")} style={{width: 80, height: 80}}/>
                    </View>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                    <Text >Bem-vindo </Text>
                </View>
                <Image source={require("../assets/ondas-rosa-footer.png")} style={{width: '100%', height: 200}}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: "#FFF2F6",
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})