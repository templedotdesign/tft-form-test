import React from 'react';

import classes from './Notification.css';

const notification = (props) => {
  return(
    <div className={classes.Notification} style={props.style}>
      <p>{props.text}</p>
    </div>
  );
};

export default notification;