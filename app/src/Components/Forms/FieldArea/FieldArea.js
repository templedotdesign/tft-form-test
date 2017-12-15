import React from 'react';

import classes from './FieldArea.css';

const fieldArea = (props) => {
  let label = null;
  if(props.required) {
    label = (<label style={{fontWeight: 'bold'}}>{props.label}</label>);
  } else {
    label = (<label>{props.label}</label>);
  }
  return(
    <div className={classes.FieldArea}>
      {label}
      <textarea cols={props.cols} rows={props.rows} name={props.name} onChange={props.changed}/>
    </div>
  );
};

export default fieldArea;