import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button, FlatList, Alert } from 'react-native';

import AddCriteria from './AddCriteria';

export default class CriteriaForm extends React.Component{

    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.state = {
            objectives: [{name: '', index: 0}],
            from: navigation.getParam('objectives', [{name: 'kupa', index: 1}])
        };
    }

    updateList = (index, value) => {
        console.log("--------update-------" + value);
        console.log(value);
        this.print(this.state.objectives)
        const newArray = this.state.objectives.slice();
        for (let i = 0; i < newArray.length; i++) {
            if(newArray[i].index == index){
                newArray[i] = {name: value, index: index};
            }
        }
        this.print(newArray);
        const result = this.addEmptyObjective(newArray);
        this.setState({objectives: result});
        this.print(result);
        console.log("-----------end-----------");
    };

    // todo change this for onViewableChange()
    addEmptyObjective = (array) => {
        const lastEle = array[array.length - 1];
        if(lastEle.name !== '') {
            var empty = {name: '', index: lastEle.index + 1};
            return array.concat(empty);
        }
        return array;
    };

    deleteObjective = (index) => {
        if(this.state.objectives.length - 1 > index){
            var tmp = this.state.objectives.slice();
            tmp.splice(index, 1);
            this.print(tmp);
            //this.renumberIndexes(tmp);
            this.print(tmp);
            this.setState({objectives: tmp});
        }
        this.setState({refresh: !this.state.refresh})
    }

    print = (array) => {
        console.log("---------array---------");
        array.forEach(element => {
            console.log(element)
        });
    }

    submit = () => {
        if(this.state.objectives.length <= 3){
            Alert.alert(
                "Wrong input",
                "Please specify at least 3 criterias",
              );
        }else{
            this.props.navigation.navigate('ObjectiveForm', {criterias: this.state.objectives.slice(0, -1), objectives: this.state.from.slice(0, -1)});
        }
    }

    render() {
        const {navigate} = this.props.navigation;

        const { navigation } = this.props;
        const objectives = navigation.getParam('objectives', [{name: 'error', index: 1}]);

        return (
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column',
                    color: '#acc',
                    padding: '5%',
                    alignContent: 'center',
                    backgroundColor: '#ecf0f1',
                }}>
                    <View>
                        <Text style={{margin: '10%', fontSize: 20, textAlign: 'center'}}>Write down all your criterias of the problem</Text>
                    </View>
                    <View style={{flex: 1,
                        backgroundColor: '#ecf0f1',
                        width: '100%',
                        height: '50%',
                        flexDirection: 'row',
                        marginBottom: 60}}>
                    <FlatList
                        style = {{ flex: 1}}
                        data={this.state.objectives}
                        renderItem={item =>
                            <AddCriteria
                                objective={item.item.name}
                                index={item.item.index}
                                updateList={this.updateList}
                                deleteObjective={this.deleteObjective}
                            />}
                        extraData={this.state}
                        keyExtractor={(item) => item.index.toString()}
                        
                    >
                    </FlatList>
                    </View>
                    <Button style={{margin: 50}} title="Submit" onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingRight: 10,
        // paddingBottom: 5,
        // paddingTop: 5,
    },
});
