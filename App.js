import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AuthHome from './auth/AuthHome'
import Login from './auth/login'
import Register from './auth/register'
import Home from './screens/Home'
import ObjectiveForm from './ahp/CriteriaPairs';
import CriteriaContainer from './ahp/CriteriaContainer'
import CriteriaForm from './ahp/CriteriaForm';
import ObjectivePairs from './ahp/ObjectivePairs';
import AfterForm from './ahp/AfterForm';
import Demo from './screens/Demo';

import ProblemList from './ahp-problem/problemList';
import ProblemProperties from './ahp-problem/ProblemProperties';
import SharedProblemList from './ahp-problem/SharedProblemList';
import SharedProblemProperties from './ahp-problem/SharedProblemProperties';

const MainNavigator = createStackNavigator( {
  AuthHome: AuthHome,
  Login: Login,
  Register: Register,
  Home: Home,
  ProblemList: ProblemList,
  ProblemProperties: ProblemProperties,
  SharedProblemList: SharedProblemList,
  SharedProblemProperties: SharedProblemProperties,
  ObjectiveForm: ObjectiveForm,
  CriteriaContainer: CriteriaContainer,
  CriteriaForm: CriteriaForm,
  ObjectivePairs: ObjectivePairs,
  AfterForm: AfterForm,
  Demo: Demo,
} );


//#22b574 dark
//#34d98f mid
//#ecfef1 text
const App = createAppContainer(MainNavigator);

export default App;
