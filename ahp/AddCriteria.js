import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button, TouchableOpacity, TextInput } from 'react-native';

import styles from '../styles/styles'

export default class AddCriteria extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            objective: props.objective,
            index: props.index
        };
    }

    render() {
        return (
            <View style={loclaStyles.container}>
                <TextInput
                    style={loclaStyles.input}
                    value={this.state.objective}
                    onChangeText={(text) => this.setState({objective: text})}
                    placeholder='Your value'
                    onEndEditing={() => this.props.updateList(this.props.index, this.state.objective)}
                />
                <TouchableOpacity style={styles.removeButton} onPress={() => this.props.deleteObjective(this.props.index)}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const loclaStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef4fa',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        margin: 5,
        marginRight: 15,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 16,
    },
});
