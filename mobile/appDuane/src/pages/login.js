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

    const navigateHome = () => {
        navigation.navigate('Home');
    }

    let [fontsLoaded] = useFonts({
        EBGaramond_400Regular,
        EBGaramond_500Medium,
        EBGaramond_600SemiBold,
        EBGaramond_700Bold,
        EBGaramond_800ExtraBold,
    });

    if (!fontsLoaded) {
        
    }else{

        return(
            <SafeAreaView style={styles.androidSafeArea}>
                <View style={styles.container}>
                    <Image source={require("../../assets/ondas-rosa-header.png")} style={styles.imgHeader}/>
                    <View style={{flex:1}}>
                        <View style={styles.containerLogoTitle}>
                            <Image source={require("../../assets/Duane.png")} style={styles.logoImg}/>
                            <Text style={styles.textTitle}>Seja Bem-vindo(a)!</Text>
                        </View>

                        <View style={styles.containerElements}>
                            <Text style={styles.textElement}>Realize o login com as suas credencias</Text>
                            <View style={styles.containerInputs}>
                                <Text style={styles.textInputs}>Email:</Text>
                                <TextInput style={styles.Inputs} onChangeText={()=>{}}></TextInput>
                            </View>
                            <View style={styles.containerInputs}>
                                <Text style={styles.textInputs}>Senha:</Text>
                                <TextInput secureTextEntry={true} style={styles.Inputs} onChangeText={()=>{}}></TextInput>
                                <Text style={styles.textForgotPass} onPress={()=>{}}>Esqueceu sua senha?</Text>
                            </View>
                            
                            <TouchableOpacity style={styles.btn} onPress={navigateHome()}>
                                <Text style={styles.textBtn}>
                                    Entrar
                                </Text>
                            </TouchableOpacity>
                                
                        </View>
                            
                    </View>
                    <Image source={require("../../assets/ondas-rosa-footer.png")} style={styles.imgFooter}/>
                </View>
                
            </SafeAreaView>
        )

    }
    
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        position: 'relative',
    },
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFDEE7",
    },
    textInputs:{
        fontSize: 19,
        color: '#AE4B67',
        opacity: 0.5,
        textAlign: 'left'
    },
    containerElements:{
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Inputs:{
        width: '100%',
        height: 40,
        fontSize: 22,
        fontFamily: 'EBGaramond_400Regular',
        borderRadius: 5,
        backgroundColor: '#FFFF',
        padding: 5,
    },
    btn:{
        width: '60%',
        backgroundColor: '#FFFFFF',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderColor: '#9B5377',
        borderWidth: 1
    },
    textBtn:{
        fontFamily: 'EBGaramond_800ExtraBold', 
        fontSize: 24, 
        color: '#633636', 
        opacity: 0.7
    },
    textForgotPass:{
        textAlign: 'center', 
        fontFamily: 'EBGaramond_400Regular', 
        fontSize: 19, 
        textDecorationLine: 'underline', 
        color: 'opacity: 0.7', 
        color: '#C4914D', 
        marginTop: 20
    },
    imgHeader:{
        width: '100%', 
        height: 200, 
        position: 'absolute',
        top:0
    },
    imgFooter:{
        width: '100%', 
        height: 210, 
        position: 'absolute', 
        bottom: 0
    },
    textElement:{
        fontFamily: 'EBGaramond_800ExtraBold', 
        fontSize: 26, 
        color: '#765555', 
        opacity: 0.7,
        textAlign: 'center'
    },
    textTitle:{
        fontFamily: 'EBGaramond_800ExtraBold', 
        fontSize: 34, 
        color: '#C4914D'
    },
    logoImg:{
        width: 120, 
        height: 120
    },
    containerLogoTitle:{
        alignItems: "center", 
        margin: 50
    },
    containerInputs:{
        width: '100%', 
        marginTop: 10,
    }
})