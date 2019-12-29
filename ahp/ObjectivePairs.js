import React from "react";
import { Text, Button, TouchableOpacity, View, Slider, StyleSheet, Alert, AsyncStorage } from 'react-native';

export default class ObjectivePairs extends React.Component{

    state = {
        objectives: this.props.navigation.getParam('objectives', [{name: 'error', index: 1}]),
        criterias: this.props.navigation.getParam('criterias', [{name: 'error', index: 1}]),
        criteriaPairs: this.props.navigation.getParam('criteriaPairs', []),
        objectivesPairs: this.props.navigation.getParam('objectivesPairs', []),
        sharing: this.props.navigation.getParam('sharing', false),
        currentIndex: 0,
        currentCriteriaIndex: 0,
        sliderValue: 5,
        skipDisabled: false,
        skipedElements: 0,
        SERVER_ADDRESS: 'http://192.168.1.108:8080',
    }
    initialState = {}
    componentDidMount() {
        this.initialState = this.state;
    }

    resetState = () => {
        this.setState(this.initialState);
    }

    addValue = (arg) => {
        var tmp = this.state.objectivesPairs.slice();
        var value = 0;
        if(arg==1){
            value = this.state.sliderValue;
        }else{
            value = 1/this.state.sliderValue;
        }
        tmp[this.state.currentCriteriaIndex].objectivePairs[this.state.currentIndex].value = value;
        this.setState({objectivesPairs: tmp});
        this.increasIndexes();
    }

    increasIndexes = () => {
        if(this.state.currentIndex < this.state.objectivesPairs[this.state.currentCriteriaIndex].objectivePairs.length - 1){
            this.setState({currentIndex: this.state.currentIndex + 1});
        }else if(this.state.currentCriteriaIndex < this.state.objectivesPairs.length - 1){
            var matrix = this.prepareCriteriaPreferenceMatrix(this.state.objectivesPairs[this.state.currentCriteriaIndex].objectivePairs, this.state.objectives.length);
            if(!this.checkIfMatrixIsConsistent(matrix)){
                this.alertAbInconsistency();
            }else{  
                var nextIndex = this.state.currentCriteriaIndex + 1;
                var tmp = this.state;
                tmp.currentIndex = 0;
                tmp.currentCriteriaIndex = nextIndex;
                tmp.skipDisabled = false;
                tmp.skipedElements = 0;
                this.initialState = tmp;

                this.setState({currentIndex: 0, currentCriteriaIndex: nextIndex, skipDisabled: false, skipedElements: 0});
            }
        }else{
            var matrix = this.prepareCriteriaPreferenceMatrix(this.state.objectivesPairs[this.state.currentCriteriaIndex].objectivePairs, this.state.objectives.length);
            if(!this.checkIfMatrixIsConsistent(matrix)){
                this.alertAbInconsistency();
                return;
            }
            const ahpData = {
                objectives: this.state.objectives,
                criterias: this.state.criterias,
                criteriaPairs: this.state.criteriaPairs,
                objectivesPairs: this.state.objectivesPairs,
            }
            console.log(ahpData)
            if(this.state.sharing == true){
                this._getToken(ahpData);
                return;
            }
            this.props.navigation.navigate('AfterForm', ahpData);
        }
    }

    _getToken = async (ahpData) => {
        try {
            const value = await AsyncStorage.getItem('bearer_token');
            this.addSubscriberDataToExistingProblem(value, ahpData);
            return value;        
        } catch (error) {
            console.log(error);
        }
      };

    addSubscriberDataToExistingProblem = (token, ahpData) =>{
        var header = new Headers({
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        });
        var data = this.mapToAhpData(ahpData);
        var problemID = this.props.navigation.getParam('problemID', 0);
        var path = this.state.SERVER_ADDRESS + '/problems/' + problemID + '/subscribers/data';
        fetch(path, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data),
          })
          .then((responseJSON) => {
            console.log(responseJSON);
            this.props.navigation.navigate('SharedProblemProperties');
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    mapToAhpData = (ahpData) => {
        return {
            objectives: this.renumberIndexes(ahpData.objectives),
            criteriaList: this.renumberIndexes(ahpData.criterias),
            criteriaPreferenceMatrix: this.prepareCriteriaPreferenceMatrix(ahpData.criteriaPairs, ahpData.criterias.length),
            objectiveComparisons: this.prepareObjectiveComparsions(ahpData.objectives.length)
        }
    }

    renumberIndexes = (objectives) => {
        var tmp = objectives.slice();
        for (let i = 0; i < tmp.length; i++) {
            tmp[i].index = i;    
        }
        return tmp;
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

    skipEle = () => {
        var skiped = this.state.skipedElements + 1;
        //var maxSkipedEle = Math.floor(this.state.objectives.length*(this.state.objectives.length-1)/4)
        var maxSkipedEle = Math.round(this.state.objectives.length/2);
        if(skiped >= maxSkipedEle){
            this.setState({skipDisabled: true});
        }
        this.setState({skipedElements: skiped});
        this.increasIndexes();
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

    alertAbInconsistency = () => {
        var criteriaName = this.state.objectivesPairs[this.state.currentCriteriaIndex].criteria;
        Alert.alert(
            'Too many skiped elements',
            'Your comparsion is not consistent, you need to give us more data about \'' + criteriaName + '\' criteria.',
            [
                {text: 'OK', onPress: () => {
                    this.resetState();
                }},
            ]
        );
    }
    

    render(){
        return(
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
                <View style={{margin: 10}}>
                    <Text style={{margin: '10%', fontSize: 20, textAlign: 'center'}}>
                        Base on '{this.state.objectivesPairs[this.state.currentCriteriaIndex].criteria}' criteria specify which objective is better
                    </Text>
                </View>
                <View style={{flex: 1,
                        backgroundColor: '#ecf0f1',
                        width: '100%',
                        height: '50%',
                        flexDirection: 'column',
                        marginBottom: 60,
                        justifyContent: 'center',
                        alignContent: 'center'
                        }}>
                    <View style={{flex: 1,
                        backgroundColor: '#ecf0f1',
                        width: '100%',
                        // height: '50%',
                        flexDirection: 'column',
                        marginBottom: 60,
                        justifyContent: 'center',
                        alignContent: 'center'}}
                        >
                        <TouchableOpacity 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#2C5197',
                                padding: 10,
                                margin: 10,
                                //width: '80%',
                            }} 
                            onPress={()=> this.addValue(1)}
                            >
                            <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                                {this.state.objectivesPairs[this.state.currentCriteriaIndex].objectivePairs[this.state.currentIndex].arg1.name}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{
                                alignItems: 'center',
                                backgroundColor: '#2C5197',
                                padding: 10,
                                margin: 10,
                                //width: '80%',
                            }} 
                             onPress={()=> this.addValue(2)}>
                            <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>
                                {this.state.objectivesPairs[this.state.currentCriteriaIndex].objectivePairs[this.state.currentIndex].arg2.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Slider
                            style={{ width: '80%', transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
                            step={2}
                            minimumValue={1}
                            maximumValue={9}
                            value={this.state.sliderValue}
                            onSlidingComplete={(val)=>this.setState({sliderValue: val})}
                            thumbTintColor='#2C5197'
                            maximumTrackTintColor='#d3d3d3' 
                            minimumTrackTintColor='#2C5197'
                        />
                        <View style={styles.textCon}>
                            <Text style={styles.textSlider}>1</Text>
                            <Text style={styles.textSlider}>5</Text>
                            <Text style={styles.textSlider}>9</Text>
                        </View>
                    </View>
                </View>
                <Button title="Skip" disabled={this.state.skipDisabled} onPress={this.skipEle}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%'
    },
    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textSlider: {
        color: '#2C5197',
        marginLeft: 20,
        marginRight: 20,
    }
});