//SurveyField contains logic to render a single
//label and text input

import React from "react";

//if passign on a destruct manner the props.input like
// {input}, it automatically goes inside the props and get Input
//pass a prop called
export default ({ input, label, meta: { error, touched } }) => {
  // if touch is false
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />

      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
