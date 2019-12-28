import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

export default class Home extends React.Component {

    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{margin: 10}}>
                    <Text style={{marginBottom: 150, fontSize: 25, textAlign: 'center'}}>
                        Welcome
                    </Text>
                </View>
                <Button
                    title="New Problem"
                    onPress={
                        () => navigate('CriteriaContainer')
                    }
                />
                <Button
                    title="Your Problems"
                    onPress={
                        () => navigate('ProblemList')
                    }
                />
                <Button
                    title="Shared with you"
                    onPress={
                        () => navigate('SharedProblemList')
                    }
                />
                    {/* <Text style={{color: '#ecfef1',
                        fontSize: 24,
                        fontWeight: 'bold',
                        }}>
                        New Problem
                    </Text>
                </TouchableOpacity> */}
                
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
