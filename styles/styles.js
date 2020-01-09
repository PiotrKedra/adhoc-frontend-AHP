import { StyleSheet } from 'react-native';

var MAIN_BLUE_COLOR = '#398ad7';
var LIGHT_BLUE_COLOR = '#abceee';
var BACKGROUND_COLOR = '#eef4fa';
var LIGHT_GRAY = '#e8e8e8';
var BLACK_TEXT_COLOR = '#111111';
var WHITE_TEXT_COLOR = '#fdfeff';

var FONT_FAMILY = 'sans-serif-condensed';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        padding: 35,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle : {
        fontFamily: FONT_FAMILY, 
        fontSize: 22,
        paddingTop: '2%',
        paddingLeft: '10%'
    },
    header: {
        backgroundColor: BACKGROUND_COLOR,
    },
    headerText: {
        fontFamily: FONT_FAMILY, 
        fontSize: 28,
        fontWeight: '500',
        color: BLACK_TEXT_COLOR,
        paddingBottom: 10
    },
    buttonText: {
        textAlign: 'center', 
        fontFamily: FONT_FAMILY, 
        fontSize: 16,
        fontWeight: '400',
        color: WHITE_TEXT_COLOR,
    },
    button: {
        backgroundColor: MAIN_BLUE_COLOR,
        width: '90%',
        borderRadius: 9,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        margin: 3
    },
    buttonDisabled: {
        backgroundColor: LIGHT_GRAY,
        width: '90%',
        borderRadius: 9,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        margin: 3
    },
    registerButton: {
        backgroundColor: LIGHT_BLUE_COLOR,
        width: '90%',
        borderRadius: 9,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        margin: 3
    },
    registerButtonText: {
        textAlign: 'center', 
        fontFamily: FONT_FAMILY, 
        fontSize: 16,
        fontWeight: '400',
        color: BLACK_TEXT_COLOR
    },
    formContainer: {
        marginTop: 10,
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    authTextInput: {
        borderWidth: 2,
        borderColor: LIGHT_GRAY,
        borderRadius: 7,
        backgroundColor: LIGHT_GRAY,
        width: '90%',
        padding: 5,
        paddingLeft: 10,
        marginTop: 5,
        fontFamily: FONT_FAMILY,
        fontSize: 15
    },
    authTextInputOnFocus: {
        borderWidth: 2,
        borderColor: MAIN_BLUE_COLOR,
        borderRadius: 7,
        width: '90%',
        padding: 5,
        marginTop: 5,
        fontFamily: FONT_FAMILY,
        fontSize: 15
    },
    formText: {
        fontFamily: FONT_FAMILY,
        fontWeight: '600',
        fontSize: 16,
    },
    homeWelcomeView: {
        backgroundColor: LIGHT_BLUE_COLOR,
        height: '35%',
        width: '100%',
        padding: 30,
        borderBottomStartRadius: 10,
        borderBottomRightRadius: 10,
    },
    homeHeader: {
        backgroundColor: LIGHT_BLUE_COLOR,
    },
    homeHeaderTitle : {
        fontFamily: FONT_FAMILY, 
        fontSize: 22,
        paddingTop: 1,
        paddingLeft: 10,
        color: WHITE_TEXT_COLOR
    },
    avatar: {
        width: 60, 
        height: 60, 
        borderRadius: 400/ 2, 
        borderColor: MAIN_BLUE_COLOR,
        borderWidth: 2
    },
    homeTextBig: {
        fontFamily: FONT_FAMILY,
        fontWeight: '400',
        fontSize: 19,
        color: WHITE_TEXT_COLOR
    },
    homeTextSmall: {
        fontFamily: FONT_FAMILY,
        fontWeight: '400',
        fontSize: 15,
        color: WHITE_TEXT_COLOR
    },
    homeTextBigBlack: {
        fontFamily: FONT_FAMILY,
        fontWeight: '400',
        fontSize: 19,
        color: BLACK_TEXT_COLOR,
    },
    homeTextSmallBlack: {
        fontFamily: FONT_FAMILY,
        fontWeight: '400',
        fontSize: 15,
        color: BLACK_TEXT_COLOR
    },
    normalHeaderTitle : {
        fontFamily: FONT_FAMILY, 
        fontSize: 22,
        paddingTop: 1,
        color: WHITE_TEXT_COLOR
    },
    objectivesContainer:{
        flex: 1,
        width: '100%',
        backgroundColor: BACKGROUND_COLOR,
        padding: 35,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
    },
    objectivesList: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        marginBottom: 60
    },
    normalBigText: {
        margin: '10%',
        fontSize: 25, 
        textAlign: 'center',
        fontFamily: FONT_FAMILY
    },
    normalBigTextWithoutMargin: {
        fontSize: 25, 
        textAlign: 'center',
        fontFamily: FONT_FAMILY
    },
    removeButton: {
        backgroundColor: MAIN_BLUE_COLOR,
        borderRadius: 3,
        overflow: 'hidden',
        padding: 8,
        textAlign:'center',
        margin: 1
    },
    objectiveComparsionButton: {
        alignItems: 'center',
        backgroundColor: LIGHT_BLUE_COLOR,
        padding: 10,
        margin: 10,
        borderRadius: 5
    }
});

