import React from 'react';

import classes from './FieldArea.css';

const fieldArea = (props) => {
  return(
    <div className={classes.FieldArea}>
      <label>{props.label}</label>
      <textarea cols={props.cols} rows={props.rows} name={props.name} onChange={props.changed}/>
    </div>
  );
};

export default fieldArea;