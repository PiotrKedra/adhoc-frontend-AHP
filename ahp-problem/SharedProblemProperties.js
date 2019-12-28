import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class SharedProblemProperties extends React.Component {

    state = {
        SERVER_ADDRESS: 'http://192.168.1.144:8080',
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
    }

    arrayToString(array){
        var string = '';
        for (let i = 0; i < array.length; i++) {
            string = string + array[i] + ', '
        }
        var result = string.slice(0, string.length - 2);
        if(result.length >= 15){
            return result.substring(0, 13) + '...';
        }
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
        console.log("navigate to getin data")
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
                <Text>Objectives: {this.arrayToString(this.state.objectives)}</Text>
                <Text>Criterias: {this.arrayToString(this.state.criterias)}</Text>
                <View style={{height: '30%'}}>
                    <Text>Subscribers of Problem</Text>
                    <FlatList
                        data={this.state.subscribers}
                        renderItem={(item) => 
                            <View>
                                <Text>{item.item.email}</Text>
                                <Text>{this.getIsData(item.item.data)}</Text>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View>
                    <Button title="Give data" onPress={this.getData}/>
                    <Button title="Get Ranking" onPress={this.getRanking}/>
                </View>
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 15,
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
