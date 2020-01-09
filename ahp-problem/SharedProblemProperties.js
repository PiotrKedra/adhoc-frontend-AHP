import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import styles from '../styles/styles'

export default class SharedProblemProperties extends React.Component {

    static navigationOptions = {
        title: 'Shared problem properties',
        headerTitleStyle: styles.normalHeaderTitle,
        headerStyle: styles.homeHeader,
        headerTintColor: '#fdfeff'
    };

    state = {
        SERVER_ADDRESS: 'http://192.168.1.108:8080',
        token: this.props.navigation.getParam('token', ''),
        problemID: this.props.navigation.getParam('problem_id', ''),
        objectives: this.props.navigation.getParam('objectives', []),
        criterias: this.props.navigation.getParam('criterias', []),
        problems: [],
        ranking: [],
        subscribers: []
    }

    componentDidMount = () => {
        this.getSubscribers();
        this.getRanking();
    }

    arrayToString(array){
        var string = '';
        for (let i = 0; i < array.length; i++) {
            string = string + array[i] + ', '
        }
        var result = string.slice(0, string.length - 2);
        return result;
    }

    getRanking = () => {
        var header = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
        });
        var path = this.state.SERVER_ADDRESS + '/problem/' + this.state.problemID + '/ranking';
        fetch(path, {
            method: 'GET',
            headers: header,
          })
          .then((response) => response.json())
          .then((responseJSON) => {
              
            this.setState({ranking: responseJSON})

          })
          .catch((error) =>{
            console.error(error);
          });
    }

    getSubscribers = () => {
        var header = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.props.navigation.getParam('token', ''),
            'Content-Type': 'application/json',
        });
        var path = this.state.SERVER_ADDRESS + '/problems/' + this.state.problemID + '/subscribers';
        fetch(path, {
            method: 'GET',
            headers: header,
          })
          .then((response) => response.json())
          .then((responseJSON) => {
            console.log(responseJSON)
            this.setState({subscribers: responseJSON})

          })
          .catch((error) =>{
            console.error(error);
          });
    }

    getData = () => {
        data = {
            sharing: true,
            objectives: this.prepareObjectives(this.state.objectives),
            criterias: this.prepareObjectives(this.state.criterias),
            problemID: this.state.problemID,
        }
        this.props.navigation.navigate('ObjectiveForm', data);
    }

    prepareObjectives(array){
        var result = []
        for (let i = 0; i < array.length; i++) {
            result.push({name: array[i], index: i});
        }
        return result;
    }

    getIsData(isData){
        if(isData){
            return 'Data Given';
        }
        return 'Data Not Given';
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{width: '100%', height: '40%', borderBottomWidth: 1}}>
                    <Text style={styles.homeTextBigBlack}>Current ranking:</Text>
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
                <TouchableOpacity style={styles.button} onPress={this.getData}>
                    <Text style={styles.buttonText}>Give data</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
