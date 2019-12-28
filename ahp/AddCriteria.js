import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button, FlatList, TextInput } from 'react-native';

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
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.objective}
                    onChangeText={(text) => this.setState({objective: text})}
                    placeholder='Your value'
                    onEndEditing={() => this.props.updateList(this.props.index, this.state.objective)}
                />
                {/* <Text>i:{this.props.index} v:{this.props.objective}</Text> */}
                <Button title="X" onPress={() => this.props.deleteObjective(this.props.index)}/>
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
    input: {
        flex: 1,
        margin: 5,
        marginRight: 15,
        height: 34,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        //borderWidth: 1,
        borderBottomWidth: 1,
        fontSize: 16,
    },
});
