import React from 'react';

import classes from './SelectField.css';

const selectField = (props) => {
  return(
    <div className={classes.SelectField}>
      <label>{props.label}</label>
      <select onChange={props.changed}>
        {props.options.map(option => {
          return(<option key={option.value} value={option.value}>{option.name}</option>);
        })}
      </select>
    </div>
  );
};

export default selectField;