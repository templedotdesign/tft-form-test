import React from 'react';

import classes from './Field.css';

const field = (props) => {
  let label = null;
  if(props.required) {
    label = (<label style={{fontWeight: 'bold'}}>{props.label}</label>);
  } else {
    label = (<label>{props.label}</label>);
  }
  return(
    <div className={classes.Field}>
      {label}
      <input type={props.type} onChange={props.changed} onBlur={props.blur} value={props.value} placeholder={props.placeholder} name={props.name}/>
    </div>
  );
};

export default field;