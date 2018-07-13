import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';


class EmployeeEdit extends Component {

    state = { showModal: false };


    componentWillMount() {
        _.each(this.props.employee, (value, prop) =>  {
            this.props.employeeUpdate({ prop, value });
        }); 
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        console.log(name, phone, shift);
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is ${shift}`);
    }

    onAccept() {
        const { uid } = this.props;
        this.props.employeeDelete({ uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {

        return (
            <Card> 
                <EmployeeForm  {...this.props} />
                <CardSection> 
                    <Button onPress={this.onButtonPress.bind(this)}> 
                        Save Changes
                     </Button>  
               </CardSection>
               <CardSection>
                   <Button onPress={this.onTextPress.bind(this)}> 
                        Text Employee 
                   </Button>     
               </CardSection>  
               <CardSection> 
                   <Button onPress={ () => this.setState({ showModal: !this.state.showModal })}> 
                       Fire Employee
                   </Button>
               </CardSection>
               <Confirm 
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
               >
                   Are you sure you want to delete the employee?
                </Confirm>     
            </Card>
        );
    }
}
const mapStateToProps = (state) => {
    const { name, phone, shift, uid } = state.employeeForm;
    console.log('state - employeeEdit', state.employeeForm);
    return { name, phone, shift, uid };
   
};
export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);