import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';

import { StackActions, NavigationActions } from 'react-navigation'

import SERVER_ADDRESS from '../config/ServerConfig'

import styles from '../styles/styles'

export default class Login extends React.Component {

    static navigationOptions = {
        title: 'Login',
        headerTransparent: true,
        headerLeft: null,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
    };

    state = {
        email: '',
        password: '',
        token: 'token',
        loginFocus: false,
        passwordFocus: false,
    }

    login = () => {
        this.setState({isLoading: true});
        user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch(SERVER_ADDRESS + '/auth/token', {
            method: 'POST',
            headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(user)
          })
          .then((response) => response.json())
          .then((responseJSON) => {
            if(typeof responseJSON.token === 'undefined'){
                Toast.show(responseJSON.message);
                return;
            }
            this._storeData(responseJSON.token)
            this.setState({
              isLoading: false,
              token: responseJSON.token,
            }, function(){
            });
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: 'Home' })]
            }))
          })
          .catch((error) =>{
            Toast.show('Given e-mail is wrong. Please register first.');
          });

    }

    _storeData = async (token) => {
        try {
          await AsyncStorage.setItem('bearer_token', token);
        } catch (error) {
          console.log(error);
        }
    };

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={{width: '88%'}}>
                        <Text style={styles.formText}>E-mail:</Text>
                    </View>
                    <TextInput
                        style={this.state.loginFocus ? styles.authTextInputOnFocus : styles.authTextInput}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({email: text})}
                        onFocus={() => this.setState({loginFocus: true})}
                        onEndEditing={() => this.setState({loginFocus: false})}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={{width: '88%'}}>
                        <Text style={styles.formText}>Password:</Text>
                    </View>
                    <TextInput
                        secureTextEntry={true}
                        style={this.state.passwordFocus ? styles.authTextInputOnFocus : styles.authTextInput}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({password: text})}
                        onFocus={() => this.setState({passwordFocus: true})}
                        onEndEditing={() => this.setState({passwordFocus: false})}
                    />
                </View>
                <View style={styles.formContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.login}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: '20%'}}></View>
            </View>
        );
    }
}
