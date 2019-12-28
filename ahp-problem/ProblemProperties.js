import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, FlatList } from 'react-native';


export default class ProblemProperties extends React.Component {

    state = {
        objectives: this.props.navigation.getParam('objectives', []),
        criterias: this.props.navigation.getParam('criterias', []),
        ranking: this.props.navigation.getParam('ranking', [])
    }

    arrayToString(array){
        var string = '';
        for (let i = 0; i < array.length; i++) {
            string = string + array[i] + ', '
        }
        var result = string.slice(0, string.length - 2);
        // if(result.length >= 15){
        //     return result.substring(0, 13) + '...';
        // }
        return result;
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Objectives: {this.arrayToString(this.state.objectives)}</Text>
                <Text>Criterias: {this.arrayToString(this.state.criterias)}</Text>
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
