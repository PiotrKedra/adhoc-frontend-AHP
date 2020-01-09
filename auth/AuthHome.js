import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity  } from 'react-native';

import styles from '../styles/styles'

export default class AuthHome extends React.Component {

    static navigationOptions = {
       header: null,
    };

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Welcome to Ad-Hoc</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const a = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef4fa',
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontFamily: 'sans-serif-condensed', 
        fontSize: 28,
        fontWeight: '500',
        color: '#111111',
        paddingBottom: 10
    },
    buttonText: {
        textAlign: 'center', 
        fontFamily: 'sans-serif-condensed', 
        fontSize: 16,
        fontWeight: '400',
        color: '#fdfeff',
    },
    button: {
        backgroundColor: '#398ad7',
        width: 250,
        borderRadius: 9,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        margin: 3
    },
    registerButton: {
        backgroundColor: '#abceee',
        width: 250,
        borderRadius: 9,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        margin: 3
    },
    registerButtonText: {
        textAlign: 'center', 
        fontFamily: 'sans-serif-condensed', 
        fontSize: 16,
        fontWeight: '400',
        color: '#111111'
    },
});
