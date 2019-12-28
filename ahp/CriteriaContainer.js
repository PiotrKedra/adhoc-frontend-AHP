import React from 'react';
import { StyleSheet, Text, View, CheckBox, Button, FlatList, TextInput } from 'react-native';
import AhpDataContext from "./AhpDataContext";

export default class CriteriaContainer extends React.Component{
    render() {
        return (
            <AhpDataContext.Consumer> {ahpData =>
                <View
                    style={{
                        flex: 1,
                        width: '95%',
                        flexDirection: 'row',
                        color: '#acc',
                    }}>
                    <FlatList
                        data={ahpData.objectives}
                        renderItem={ item =>
                            <AddCriteria objective={item.name} index={item.index}/>
                        }>
                    </FlatList>
                </View>
            }
            </AhpDataContext.Consumer>
        );
    }
}

class AddCriteria extends React.Component {

    state = {
        objective: this.props.objective,
        index: this.props.index
    };

    render() {

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={this.state.objective}
                    onChangeText={objective => this.setState({objective})}
                    placeholder='Give your value'
                    //onEndEditing={() => this.props.updateObjectives(this.state.index, this.state.objective)}
                />
                <Button title=" X " />
            </View>
        );
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
    header: {
        //paddingTop: 20 + Constants.statusBarHeight,
        padding: 20,
        backgroundColor: '#336699',
    },
    description: {
        fontSize: 14,
        color: 'white',
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
