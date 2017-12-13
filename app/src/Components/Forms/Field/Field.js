import React from 'react';

import classes from './Field.css';

const field = (props) => {
  return(
    <div className={classes.Field}>
      <label>{props.label}</label>
      <input type={props.type} onChange={props.changed} value={props.value} placeholder={props.placeholder} name={props.name}/>
    </div>
  );
};

export default field;