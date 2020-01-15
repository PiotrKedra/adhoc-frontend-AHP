import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';

import styles from '../styles/styles'

import SERVER_ADDRESS from '../config/ServerConfig'


export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.setUserName();
    }

    state = {
        userName: ''
    }

    setUserName = async () => {
        try {
            const value = await AsyncStorage.getItem('bearer_token');
            this.getUserName(value);
        } catch (error) {
            console.log(error);
        }
      };

    getUserName = async (token) => {
        try {
            const response = await fetch(SERVER_ADDRESS + '/users/me', {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
            });
            const responseJson = await response.json();
            this.setState({ userName: responseJson.name });
        }
        catch (error) {
            console.error(error);
        }
    }

    static navigationOptions = {
        title: 'Home',
        // headerTransparent: true,
        headerLeft: null,
        headerTitleStyle: styles.homeHeaderTitle,
        headerStyle: styles.homeHeader,
    };

    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <View style={styles.homeWelcomeView}>
                    <Image
                        style={styles.avatar}
                        source={require('../assets/noProfile.png')}
                    />
                    <View style={{padding: 10}}>
                        <Text style={styles.homeTextBig}>Hi {this.state.userName}.</Text>
                        <Text style={styles.homeTextSmall}>Do you have some problem to solve?</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    
                    <View style={styles.formContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigate('CriteriaContainer')}>
                            <Text style={styles.buttonText}>New Problem</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigate('ProblemList')}>
                            <Text style={styles.buttonText}>Your Problems</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigate('SharedProblemList')}>
                            <Text style={styles.buttonText}>Shared with you</Text>
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.formContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigate('AuthHome')}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>   
                </View>
            </View>
        );
    }
}
