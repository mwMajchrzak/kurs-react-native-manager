import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, DataSource, View, Text } from 'react-native';
import { Spinner } from './common';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import _ from 'lodash';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeesFetch();
       // this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
       const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(employees);
        
    }

    renderRow(employee) {
        console.log('renderRow');
        return <ListItem employee={employee} />;
    }

    render() {

        if (!this.props.employees.length) return <Spinner size="large"/>; 
    
        return (
           <ListView
               enableEmptySections
               dataSource={this.dataSource}
                renderRow={this.renderRow}
            />   
        );
    }
}
const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
        console.log('state - employees', employees);
    });
    console.log('state - employeeList', state)
    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);