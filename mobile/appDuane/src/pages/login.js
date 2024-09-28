import React, {useEffect, useState} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, ScrollView, TextInput } from "react-native";
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
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }else{

        return(
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Image source={require("../../assets/ondas-rosa-header.png")} style={{width: '100%', height: 200, position: 'absolute',top:0}}/>
                    <View style={{flex:1,}}>
                        <View style={{alignItems: "center", margin: 50}}>
                            <Image source={require("../../assets/Duane.png")} style={{width: 120, height: 120}}/>
                            <Text style={{fontFamily: 'EBGaramond_800ExtraBold', fontSize: 32, color: '#C4914D'}}>Seja Bem-vinda!</Text>
                        </View>

                        <View>
                            <Text style={{fontFamily: 'EBGaramond_800ExtraBold', fontSize: 22, color: '#765555', opacity: 0.7}}>Realize o login com as suas credencias</Text>
                            <View>
                                <Text style={styles.textInputs}>Email:</Text>
                                <TextInput></TextInput>
                            </View>
                            <View>
                                <Text style={styles.textInputs}>Senha:</Text>
                                <TextInput secureTextEntry={true}></TextInput>
                                <Text style={{textAlign: 'center', fontFamily: 'EBGaramond_600SemiBold', fontSize: 15, textDecorationLine: 'underline', color: 'opacity: 0.7'}} onPress={()=>{}}>Esqueceu sua senha?</Text>
                            </View>
                            
                            <TouchableOpacity>
                                <Text>
                                    Entrar
                                </Text>
                            </TouchableOpacity>
                                
                        </View>
                            
                    </View>
                    <Image source={require("../../assets/ondas-rosa-footer.png")} style={{width: '100%', height: 210, position: 'absolute', bottom: 0}}/>
                </View>
                
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
    },
    textInputs:{
        fontSize: 19,
        color: '#AE4B67',
        opacity: 0.5
    }
})