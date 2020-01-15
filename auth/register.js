import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-simple-toast';

import styles from '../styles/styles'

import SERVER_ADDRESS from '../config/ServerConfig'

export default class Register extends React.Component {

    static navigationOptions = {
        title: 'Register',
        headerTransparent: true,
        headerLeft: null,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
    };

    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        nameFocus: false,
        emailFocus: false,
        passwordFocus: false,
        password2Focus: false,
    }

    register = () => {
        user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        fetch(SERVER_ADDRESS + '/auth', {
            method: 'POST',
            headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify(user)
          })
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log(responseJSON);
            if(responseJSON.id){
                Toast.show(responseJSON.message);
                this.props.navigation.navigate('Login');
            }else{
                Toast.show(responseJSON.message);
            }
          })
          .catch((error) =>{
            console.error(error);
          });

    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={{width: '88%'}}>
                        <Text style={styles.formText}>Address e-mail</Text>
                    </View>
                    <TextInput
                        style={this.state.emailFocus ? styles.authTextInputOnFocus : styles.authTextInput}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({email: text})}
                        onFocus={() => this.setState({emailFocus: true})}
                        onEndEditing={() => this.setState({emailFocus: false})}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={{width: '88%'}}>
                        <Text style={styles.formText}>Nick name</Text>
                    </View>
                    <TextInput
                        style={this.state.nameFocus ? styles.authTextInputOnFocus : styles.authTextInput}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({name: text})}
                        onFocus={() => this.setState({nameFocus: true})}
                        onEndEditing={() => this.setState({nameFocus: false})}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={{width: '88%'}}>
                        <Text style={styles.formText}>Password</Text>
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
                    <View style={{width: '88%'}}>
                        <Text style={styles.formText}>Repeat password</Text>
                    </View>
                    <TextInput
                        secureTextEntry={true}
                        style={this.state.password2Focus ? styles.authTextInputOnFocus : styles.authTextInput}
                        value={this.state.password2}
                        onChangeText={(text) => this.setState({password2: text})}
                        onFocus={() => this.setState({password2Focus: true})}
                        onEndEditing={() => this.setState({password2Focus: false})}
                    />
                </View>
                <View style={styles.formContainer}>
                    <TouchableOpacity style={styles.button} onPress={this.register}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}