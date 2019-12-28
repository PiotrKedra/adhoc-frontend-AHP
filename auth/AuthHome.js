import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class AuthHome extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <Text>Welcome to Ad-Hoc</Text>
                <Button style={{margin: 50}} title="Login" onPress={() => this.props.navigation.navigate('Login')}/>
                <Button style={{margin: 50}} title="Register" onPress={() => this.props.navigation.navigate('Register')}/>
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
