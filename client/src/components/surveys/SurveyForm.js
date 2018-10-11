//Survey form shows a form for a user to add input
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFIELDS from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    //iterate trough object FIELDS and return input fields
    // use ES6 Structuring
    //Iterate a field
    //create custome field
    // return it
    //map is used to return a list
    return _.map(formFIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    //redux Field used for showing inputs
    //redux Field used for showing inputs
    //custom component SurveyField
    //prop.handleSubmit is provided by the Redux Form
    // when submit button is clicked, onSurveySubmit is toggled to true
    return (
      <div>SurveyForm!</div>,
      (
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className="teal btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      )
    );
  }
}

//Validate form if errors const is empty the form is good to go
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");
  _.each(formFIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}
//this reduxform helper initiliazes and configure the form
//we are working on.
export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
