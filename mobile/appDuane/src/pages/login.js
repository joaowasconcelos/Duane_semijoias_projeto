import React, {useEffect, useState} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from "react-native";
import {useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
  EBGaramond_700Bold,
  EBGaramond_800ExtraBold,
  EBGaramond_400Regular_Italic,
  EBGaramond_500Medium_Italic,
  EBGaramond_600SemiBold_Italic,
  EBGaramond_700Bold_Italic,
  EBGaramond_800ExtraBold_Italic,
} from '@expo-google-fonts/eb-garamond';

// import {getStatusBarHeight} from "react-native-status-bar-height";

// import api from "../services/api/api"

export default function Login(){
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        EBGaramond_400Regular,
        EBGaramond_500Medium,
        EBGaramond_600SemiBold,
        EBGaramond_700Bold,
        EBGaramond_800ExtraBold,
        EBGaramond_400Regular_Italic,
        EBGaramond_500Medium_Italic,
        EBGaramond_600SemiBold_Italic,
        EBGaramond_700Bold_Italic,
        EBGaramond_800ExtraBold_Italic,
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }else{

        return(
            <SafeAreaView style={styles.androidSafeArea}>
                <ScrollView>
                    <View style={styles.container}>
                        <Image source={require("../assets/ondas-rosa-header.png")} style={{width: '100%', height: 200, position: 'absolute',top:0}}/>
                        <View>
                            <View>
                                <Image source={require("../assets/Duane.png")} style={{width: 120, height: 120}}/>
                                <Text >Seja Bem-vinda!</Text>
                            </View>

                            <View>
                                <View>
                                    <Text>Email:</Text>
                                    <TextInput></TextInput>
                                </View>
                                <View>
                                    <Text>Senha:</Text>
                                    <TextInput secureTextEntry={true}></TextInput>
                                </View>

                                
                            </View>
                            
                            
                            
                            
                            
                        </View>
                        <Image source={require("../assets/ondas-rosa-footer.png")} style={{width: '100%', height: 210, position: 'absolute', bottom: 0}}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )

    }
    
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: "#FFF2F6",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        position: 'relative',
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})