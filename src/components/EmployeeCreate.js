import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';


class EmployeeCreate extends Component {
    onButtonPress() {
    
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift: shift || 'Monaday'});
    }
  
    render() {
        
        return (
          <Card>  
            <EmployeeForm />
            <CardSection> 
                    <Button onPress={this.onButtonPress.bind(this)}> 
                        Create
                    </Button>
                </CardSection>
           </Card> 
        );
    }
}


const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };

}
export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);