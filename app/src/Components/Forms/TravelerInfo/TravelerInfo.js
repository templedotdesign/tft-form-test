import React from 'react';

import * as Constants from '../../../Constants/ReservationForm/ReservationForm';

import Field from '../Field/Field';
import SelectField from '../SelectField/SelectField';

import classes from './TravelerInfo.css';

const travelerInfo = (props) => {
  let identification = null;
  if(props.traveltype === 'domestic') {
    identification = (
      <div>
        <Field label="First Name: " type="text" placeholder="John"/>
        <Field label="Middle Name: " type="text" placeholder="Quentin"/>
        <Field label="Last Name: " type="text" placeholder="Doe"/>
      </div>
    );
  } else if(props.traveltype === 'international') {
    identification = (
      <div>
        <Field label="First Name: " type="text" placeholder="John"/>
        <Field label="Middle Name: " type="text" placeholder="Quentin"/>
        <Field label="Last Name: " type="text" placeholder="Doe"/>
        <Field label="Passport Number: " type="text" placeholder="#########"/>
        <Field label="Passport Issuing Authority: " type="text" placeholder="USA"/>
        <Field label="Passport Expiration: " type="date"/>
      </div>
    );
  }
  return(
    <div className={classes.TravelerInfo}>
      <h3>Passenger {props.number} Information</h3>
      {identification}
      <Field label="Date Of Birth: " type="date"/>
      <SelectField label="Gender: " options={Constants.GENDER_TYPES}/>
    </div>
  );
};

export default travelerInfo;