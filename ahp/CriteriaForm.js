import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableOpacity, FlatList, Alert } from 'react-native';

import AddCriteria from './AddCriteria';
import styles from '../styles/styles'


export default class CriteriaForm extends React.Component{

    static navigationOptions = {
        title: 'Criteria definition',
        headerTitleStyle: styles.normalHeaderTitle,
        headerStyle: styles.homeHeader,
        headerTintColor: '#fdfeff'
    };

    constructor(props){
        super(props);
        const { navigation } = this.props;
        this.state = {
            objectives: [{name: '', index: 0}],
            from: navigation.getParam('objectives', [{name: 'kupa', index: 1}])
        };
    }

    updateList = (index, value) => {
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
                style={styles.objectivesContainer}>
                    <View>
                        <Text style={styles.normalBigText}>Write down all your criterias of the problem</Text>
                    </View>
                    <View style={styles.objectivesList}>
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
                    <TouchableOpacity style={styles.button} onPress={this.submit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}
