import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, FlatList } from 'react-native';

import styles from '../styles/styles'

export default class ProblemProperties extends React.Component {

    static navigationOptions = {
        title: 'Problem properties',
        headerTitleStyle: styles.normalHeaderTitle,
        headerStyle: styles.homeHeader,
        headerTintColor: '#fdfeff'
    };

    state = {
        SERVER_ADDRESS: 'http://192.168.1.108:8080',
        objectives: this.props.navigation.getParam('objectives', []),
        criterias: this.props.navigation.getParam('criterias', []),
        ranking: this.props.navigation.getParam('ranking', []),
        problemID: this.props.navigation.getParam('problemID', 0),
        subscribers: []
    }

    componentDidMount = () => {
        this.loadSubscribers();
    }

    arrayToString(array){
        var string = '';
        for (let i = 0; i < array.length; i++) {
            string = string + array[i] + ', '
        }
        var result = string.slice(0, string.length - 2);
        return result;
    }

    loadSubscribers = async () => {
        try {
            const value = await AsyncStorage.getItem('bearer_token');
            this.getSubscribers(value);
        } catch (error) {
            console.log(error);
        }
      };

    getSubscribers = (token) => {
        var header = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        });
        var path = this.state.SERVER_ADDRESS + '/problems/' + this.state.problemID  + '/subscribers';
        console.log(path);
        fetch(path, {
            method: 'GET',
            headers: header,
          })
          .then((response) => response.json())
          .then((responseJSON) => {
            this.setState({subscribers: responseJSON})
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    getIsData(isData){
        if(isData){
            return 'Data Given';
        }
        return 'Data Not Given';
    }

    render(){
        console.log(JSON.stringify(this.state.ranking))
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '40%', borderBottomWidth: 1}}>
                    <Text style={styles.homeTextBigBlack}>Ranking:</Text>
                    <View style={{marginTop: 20}}>
                        <FlatList
                            data={this.state.ranking}
                            renderItem={(item) =>
                                <Text style={{fontSize: 20, textAlign: 'center'}}>
                                    {item.index + 1}. {item.item.objectiveName} ({item.item.value.toFixed(2)}) 
                                </Text>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
                <View style={{width: '100%', height: '20%', borderBottomWidth: 1}}>
                    <Text style={styles.homeTextBigBlack}>Objectives: {this.arrayToString(this.state.objectives)}</Text>
                    <Text style={styles.homeTextBigBlack}>Criterias: {this.arrayToString(this.state.criterias)}</Text>
                </View>
                <View style={{width: '100%', height: '30%'}}>
                    <Text style={styles.homeTextBigBlack}>Subscribers of Problem</Text>
                    <FlatList
                        data={this.state.subscribers}
                        renderItem={(item) => 
                            <View>
                                <Text style={styles.homeTextSmallBlack}>{item.item.email}: {this.getIsData(item.item.data)}</Text>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}
