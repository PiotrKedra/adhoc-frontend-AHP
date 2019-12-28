import React from "react";
import { Text, Button, View, FlatList, StyleSheet, AsyncStorage } from 'react-native';

import AddCriteria from './AddCriteria';

export default class AfterForm extends React.Component{

    constructor(props){
        super(props);
        this.token = this._getToken();
    }
    
    token = ''

    state = {
        SERVER_ADDRESS: 'http://192.168.1.144:8080',
        objectives: this.props.navigation.getParam('objectives', [{name: 'error', index: 1}]),
        criterias: this.props.navigation.getParam('criterias', [{name: 'error', index: 1}]),
        criteriaPairs: this.props.navigation.getParam('criteriaPairs', []),
        objectivesPairs: this.props.navigation.getParam('objectivesPairs', []),
        isLoading: true,
        emails: [{name: '', index: 0}],
        savedProblem: {}
    }

    getRanking(){
        const ahpData = this.mapToAhpData();
        console.log(ahpData);
        console.log('fetching:')
        console.log(this.token._55);
        return fetch(this.state.SERVER_ADDRESS + '/ranking', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.token._55,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(ahpData)})
          .then((response) => response.json())
          .then((responseJson) => {
    
            console.log("end fetching")
            this.setState({
              isLoading: false,
              dataSource: responseJson,
            }, function(){
            });
            console.log('end')
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    mapToAhpData = () => {
        return {
            objectives: this.renumberIndexes(this.state.objectives),
            criteriaList: this.renumberIndexes(this.state.criterias),
            criteriaPreferenceMatrix: this.prepareCriteriaPreferenceMatrix(this.state.criteriaPairs, this.state.criterias.length),
            objectiveComparisons: this.prepareObjectiveComparsions(this.state.objectives.length)
        }
    }

    renumberIndexes = (objectives) => {
        var tmp = objectives.slice();
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].index = i;    
        }
        return tmp;
    }

    prepareCriteriaPreferenceMatrix = (array, size) => {
        var matrix = [];
        var index = 0;
        for (let i = 0; i < size; i++) {
            var row = [];
            for (let j = 0; j < size; j++) {
                if(i==j){
                    row.push('1');
                }else if(i < j){
                    console.log("index: " + index + ' result: ' + JSON.stringify(matrix))
                    if(array[index].value==0){
                        row.push('?');
                    }else{
                        row.push(array[index].value.toString())
                    }
                    index = index + 1;
                }else{
                    if(matrix[j][i] === '?'){
                        row.push('?');
                    }else{
                        row.push(1/parseFloat(matrix[j][i]));
                    }
                }
            } 
            matrix.push(row);
        }
        return matrix;
    }
    
    prepareObjectiveComparsions = (size) => {
        var comparsions = [];
        var objectivePairs = this.state.objectivesPairs.slice();
        for (let i = 0; i < objectivePairs.length; i++) {
            var comparsion = {
                criteriaName: objectivePairs[i].criteria,
                objectiveComparisonMatrix: this.prepareCriteriaPreferenceMatrix(objectivePairs[i].objectivePairs, size)
            }
            comparsions.push(comparsion);
        }
        return comparsions;
    }

    _getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('bearer_token');
            console.log(value);
            return value;        
        } catch (error) {
            console.log(error);
        }
      };

    deleteObjective = (index) => {
        if(this.state.objectives.length - 1 > index){
            var tmp = this.state.objectives.slice();
            tmp.splice(index, 1);
            this.setState({objectives: tmp});
        }
        this.setState({refresh: !this.state.refresh})
    }

    updateList = (index, value) => {
        const newArray = this.state.emails.slice();
        for (let i = 0; i < newArray.length; i++) {
            if(newArray[i].index == index){
                newArray[i] = {name: value, index: index};
            }
        }
        const result = this.addEmptyObjective(newArray);
        this.setState({emails: result});
    };

    addEmptyObjective = (array) => {
        const lastEle = array[array.length - 1];
        if(lastEle.name !== '') {
            var empty = {name: '', index: lastEle.index + 1};
            return array.concat(empty);
        }
        return array;
    };

    shareProblem = () => {
        const ahpData = this.mapToAhpData();
        const shareData = {
            ahpProblemData: ahpData,
            emails: this.getEmails()
        }
        return fetch(this.state.SERVER_ADDRESS + '/problems/share', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.token._55,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(shareData)})
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              savedProblem: responseJson,
            }, function(){
            });
            console.log(responseJson)
            this.props.navigation.navigate('Home');
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    getEmails = () => {
        var result = [];
        const emails = this.state.emails;
        for (let i = 0; i < emails.length; i++) {
            result.push(emails[i].name);            
        }
        return result;
    }

    render(){
        if(this.state.isLoading==false){
            
            return(
                <View style={{flex: 1,
                        backgroundColor: '#ecf0f1',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <View style={{margin: 10}}>
                        <Text style={{margin: '10%', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                            {JSON.stringify(this.state.dataSource[0].objectiveName)} is a best option!
                        </Text>
                    </View>
                    <View style={{
                         width: '100%',
                         height: '60%',
                         margin: 40,
                         alignContent: 'center',
                         justifyContent: 'center',
                    }}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={(item) =>
                                <Text style={{fontSize: 20, textAlign: 'center'}}>
                                    {item.index + 1}. {item.item.objectiveName} ({item.item.value.toFixed(2)}) 
                                </Text>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
              );
        }
        return(
            <View style={styles.container}>
                <Text style={styles.text}>You can get a ranking now</Text>
                <Button title="Get Ranking" onPress={() => this.getRanking()}/>
                {/* <Text>{JSON.stringify(this.getRanking())}</Text> */}
                <Text style={styles.text}>Or you can share your prablem with others, and get ranking when they fill the data.</Text>
                <View style={{flex: 1,
                        backgroundColor: '#ecf0f1',
                        width: '100%',
                        height: '50%',
                        flexDirection: 'row',
                        marginBottom: 60}}>
                    <FlatList
                            style = {{ flex: 1}}
                            data={this.state.emails}
                            renderItem={item =>
                                <AddCriteria
                                    objective={item.item.name}
                                    index={item.item.index}
                                    updateList={this.updateList}
                                    deleteObjective={this.deleteObjective}
                                />}
                            extraData={this.state}
                            keyExtractor={(item) => item.index.toString()}
                        />
                </View>
                <Button title="Share problem" onPress={() => this.shareProblem()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#b0d5d0',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 12,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
    },
    text: {
        margin: '10%',
        fontSize: 20, 
        textAlign: 'center'
    }
});