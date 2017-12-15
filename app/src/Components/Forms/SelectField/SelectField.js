import React from 'react';

import classes from './SelectField.css';

const selectField = (props) => {
  let label = null;
  if(props.required) {
    label = (<label style={{fontWeight: 'bold'}}>{props.label}</label>);
  } else {
    label = (<label>{props.label}</label>);
  }
  return(
    <div className={classes.SelectField}>
      {label}
      <select onChange={props.changed} onBlur={props.blur} multiple={props.multiple} name={props.name}>
        {props.options.map(option => {
          return(<option key={option.value} value={option.value}>{option.name}</option>);
        })}
      </select>
    </div>
  );
};

export default selectField;