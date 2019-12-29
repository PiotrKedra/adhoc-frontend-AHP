import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class SharedProblemList extends React.Component {

    constructor(props){
        super(props);
        this.token = this._getToken();
    }
    
    token = ''

    state = {
        SERVER_ADDRESS: 'http://192.168.1.108:8080',
        problems: [],
    }

    getAllProblems = (token) => {
        console.log(token);
        var header = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        });
        fetch(this.state.SERVER_ADDRESS + '/problems/shared', {
            method: 'GET',
            headers: header,
          })
          .then((response) => response.json())
          .then((responseJSON) => {
    
            console.log(responseJSON);
            this.setState({
              problems: responseJSON
            }, function(){
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    _getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('bearer_token');
            this.getAllProblems(value);
            return value;        
        } catch (error) {
            console.log('error')
            console.log(error);
        }
      };

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

    getRanking = (id) => {
        data = {
            objectives: this.getObjectivesByID(id),
            criterias: this.getCriteriasByID(id),
            token: this.token._55, 
            problem_id: id
        }
        this.props.navigation.navigate('SharedProblemProperties', data);
        // var header = new Headers({
        //     'Accept': 'application/json',
        //     'Authorization': 'Bearer ' + this.token._55,
        //     'Content-Type': 'application/json',
        // });
        // var path = this.state.SERVER_ADDRESS + '/problem/' + id + '/ranking';
        // fetch(path, {
        //     method: 'GET',
        //     headers: header,
        //   })
        //   .then((response) => response.json())
        //   .then((responseJSON) => {
              
            
        //   })
        //   .catch((error) =>{
        //     console.error(error);
        //   });
    }

    getObjectivesByID = (id) => {
        var problems = this.state.problems;
        for (let i = 0; i < problems.length; i++) {
            if(problems[i].id == id){
                return problems[i].objectives;
            }
        }
    }

    getCriteriasByID = (id) => {
        var problems = this.state.problems;
        for (let i = 0; i < problems.length; i++) {
            if(problems[i].id == id){
                return problems[i].criterias;
            }
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Your Problems</Text>
                <FlatList
                    style={{flex: 1}}
                    data={this.state.problems}
                    renderItem={item => 
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text>Objectives: {this.arrayToString(item.item.objectives)}</Text>
                                <Text>Criterias: {this.arrayToString(item.item.criterias)}</Text>
                            </View>
                            <Button title="Get ranking" onPress={() => this.getRanking(item.item.id)}/>
                        </View>
                    }
                    extraData={this.state}
                    keyExtractor={(item) => item.id.toString()}
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
