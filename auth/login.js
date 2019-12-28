import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';


export default class Login extends React.Component {

    state = {
        SERVER_ADDRESS: 'http://192.168.1.144:8080',
        email: '',
        password: '',
        token: 'token',
        isLoading: false
    }

    login = () => {
        this.setState({isLoading: true});
        user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch(this.state.SERVER_ADDRESS + '/auth/token', {
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
            this.props.navigation.navigate('Home');
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
                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder='Your email'
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder='Password'
                />
                <Button style={{margin: 50}} title="Login" onPress={this.login}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 30,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#b0d5d0',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    }
});
