import React, { Component } from "react";
///import surveyform to survey new
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component {
  //adding component level state

  //traditional way
  /*
  constructor(props)
  {
    super(props);


    this.state = {new: true};
  }*/

  //shortcut using babel
  state = { showFormReview: false };

  //display the formReview or SurveyForm

  //if back button is clicked go back to form
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

//using reduxForm here to clear out inputfields.
export default reduxForm({
  form: "surveForm"
})(SurveyNew);
