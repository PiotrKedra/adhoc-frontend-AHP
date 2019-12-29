import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';


export default class Register extends React.Component {

    state = {
        SERVER_ADDRESS: 'http://192.168.1.108:8080',
        name: '',
        email: '',
        password: '',
        password2: '',
    }

    register = () => {
        user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        fetch(this.state.SERVER_ADDRESS + '/auth', {
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
                <Text>Address e-mail</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                />
                <Text>Nick name</Text>
                <TextInput
                    value={this.state.name}
                    onChangeText={(text) => this.setState({name: text})}
                />
                <Text>Password</Text>
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                />
                <Text>Repeat password</Text>
                <TextInput
                    value={this.state.password2}
                    onChangeText={(text) => this.setState({password2: text})}
                />
                <Button style={{margin: 50}} title="Register" onPress={this.register}/>
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
