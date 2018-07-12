import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root" hideNavBar> 
                <Scene key="auth"> 
                    <Scene key="login" component={LoginForm} title="Please Login"  initial />   
                </Scene>
                <Scene key="main">
                    <Scene 
                        initial
                        rightTitle="Add"
                        onRight = {() => { Actions.employeeCreate() }}
                        key="employeeList"
                        component={EmployeeList} 
                        title="Employess"  
                    />
                    <Scene title="Create Employee" component={EmployeeCreate} key="employeeCreate"/>    
                </Scene>
            </Scene>
        </Router>    

    );
};

export default RouterComponent;