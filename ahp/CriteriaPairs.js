import React from "react";
import { Text, Button, View, Slider, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import styles from '../styles/styles'

export default class ObjectiveForm extends React.Component{

    static navigationOptions = {
        title: 'Criteria comparsion',
        headerTitleStyle: styles.normalHeaderTitle,
        headerStyle: styles.homeHeader,
        headerTintColor: '#fdfeff'
    };

    constructor(props){
    
        super(props);
        const { navigation } = props;
    }

    state = {
        currentIndex: 0,
        objectives: this.props.navigation.getParam('objectives', [{name: 'error', index: 1}]),
        criterias: this.props.navigation.getParam('criterias', [{name: 'error', index: 1}]),
        shit: this.prepareCriteria(this.props.navigation.getParam('criterias', [{name: 'error', index: 1}])),
        objectivesPairs: this.prepareObjectives(this.props.navigation.getParam('objectives', [{name: 'error', index: 1}]), this.props.navigation.getParam('criterias', [{name: 'error', index: 1}]) ),
        sliderValue: 5,
        skipDisabled: false,
        skipedEle: 0,
        sharing: this.props.navigation.getParam('sharing', false),
    }

    initialState = {};
    
    componentDidMount() {
        this.initialState = this.state;
    }

    resetState = () => {
        this.setState(this.initialState);
    }

    prepareObjectives(objectives, criterias){
        var result = [];
        for (let i = 0; i < criterias.length; i++) {
            var obj = {
                criteria: criterias[i].name,
                objectivePairs: this.prepareCriteria(objectives),
            }
            result.push(obj);
            //console.log(result)

        }
        //console.log(result)
        return result;
    }

    prepareCriteria(criteriasList){
        console.log('----criterias----');
        console.log(criteriasList);
        let pairs = [];
        for (let i = 0; i < criteriasList.length; i++) {
            for (let j = i+1; j < criteriasList.length; j++) {
                pairs.push({arg1: criteriasList[i], arg2: criteriasList[j], value: 0});
            }
        }
        return pairs;
    }

    addValue = (arg) => {

        var tmp = this.state.shit.slice();
        if(arg == 1){
            tmp[this.state.currentIndex].value = this.state.sliderValue;
        }else{
            tmp[this.state.currentIndex].value = 1/this.state.sliderValue;
        }
        this.setState({shit: tmp});
        this.increasCurrentIndex();
    }

    increasCurrentIndex = () => {
        if(this.state.currentIndex < this.state.shit.length - 1){
            console.log('incresing index: ' + this.state.currentIndex + ' + 1');
            this.setState({currentIndex: this.state.currentIndex + 1})
        }else{

            var matrix = this.prepareCriteriaPreferenceMatrix(this.state.shit, this.state.criterias.length);
            if(!this.checkIfMatrixIsConsistent(matrix)){
                Alert.alert(
                    'Too many skiped elements',
                    'Your comparsion is not consistent, you need to give us more data.',
                    [
                      {text: 'OK', onPress: () => {
                          this.resetState();
                        }},
                    ]
                  );
                  return;
            }
            console.log('we wna navigate')
            const ahpData = {
                objectives: this.state.objectives,
                criterias: this.state.criterias,
                criteriaPairs: this.state.shit,
                objectivesPairs: this.state.objectivesPairs,
                sharing: this.state.sharing,
                problemID: this.props.navigation.getParam('problemID', 0)
            }
            this.props.navigation.navigate('ObjectivePairs', ahpData);
        }
    }

    prepareCriteriaPreferenceMatrix = (array, size) => {
        var matrix = [];
        var index = 0;
        console.log("hehehe nie dziala")
        console.log(array);
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

    checkIfMatrixIsConsistent = (matrix) => {
        var maxMisingElements = matrix[0].length - 1;
        for (let i = 0; i < matrix.length; i++) {
            var missingElements = 0;
            for (let j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j] == '?'){
                    missingElements = missingElements + 1;
                }
            }
            if(missingElements >= maxMisingElements){
                return false;
            }
        }
        return true;
    }

    skipEle = () => {
        if(this.state.skipDisabled == true){
            return;
        }
        var skiped = this.state.skipedEle + 1;
        //var maxSkipedEle = Math.floor(this.state.criterias.length*(this.state.criterias.length - 1)/4)
        var maxSkipedEle = this.state.criterias.length - 1;
        console.log("skiped: " + skiped + " max posible: " + maxSkipedEle);
        if(skiped == maxSkipedEle){
            this.setState({skipDisabled: true});
        }
        this.setState({skipedEle: skiped});
        this.increasCurrentIndex();
    }

    render() {
        return (
            <View
                style={styles.container}>
                <View style={{margin: 10}}>
                    <Text style={styles.normalBigText}>
                        Which criteria do you prefer and how much
                    </Text>
                </View>
                <View style={{flex: 1,
                        backgroundColor: '#eef4fa',
                        width: '100%',
                        height: '50%',
                        flexDirection: 'column',
                        marginBottom: 60,
                        justifyContent: 'center',
                        alignContent: 'center'
                        }}>
                    <View style={{flex: 1,
                        backgroundColor: '#eef4fa',
                        width: '100%',
                        flexDirection: 'column',
                        marginBottom: 60,
                        justifyContent: 'center',
                        alignContent: 'center'}}
                        >
                        <TouchableOpacity 
                            style={styles.objectiveComparsionButton} 
                            onPress={()=> this.addValue(1)}
                            >
                            <Text style={styles.homeTextBig}>
                                {this.state.shit[this.state.currentIndex].arg1.name}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.objectiveComparsionButton} 
                             onPress={()=> this.addValue(2)}>
                            <Text style={styles.homeTextBig}>
                                {this.state.shit[this.state.currentIndex].arg2.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Slider
                            style={{ width: '90%', transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
                            step={2}
                            minimumValue={1}
                            maximumValue={9}
                            value={this.state.sliderValue}
                            onSlidingComplete={(val)=>this.setState({sliderValue: val})}
                            thumbTintColor='#398ad7'
                            maximumTrackTintColor='#398ad7' 
                            minimumTrackTintColor='#398ad7'
                        />
                        <View style={localStyles.sliderTextContainer}>
                            <Text style={localStyles.textSlider}>1</Text>
                            <Text style={localStyles.textSlider}>5</Text>
                            <Text style={localStyles.textSlider}>9</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={this.state.skipDisabled ? styles.buttonDisabled : styles.button} onPress={this.skipEle}>
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    sliderTextContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textSlider: {
        color: '#398ad7',
    }
});