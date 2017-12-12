import React from 'react';

import * as Constants from '../../../Constants/ReservationForm/ReservationForm';

import Field from '../Field/Field';
import SelectField from '../SelectField/SelectField';

import classes from './TravelerInfo.css';

const travelerInfo = (props) => {
  let identification = null;
  if(props.traveltype === 'domestic') {
    identification = (
      <Field label="Exact Name On State ID: " type="text"/>
    );
  } else if(props.traveltype === 'international') {
    identification = (
      <div>
        <Field label="Exact Name On Passport: " type="text"/>
        <Field label="Passport Number: " type="text"/>
        <Field label="Passport Issuing State: " type="text"/>
        <Field label="Passport Expiration: " type="date"/>
      </div>
    );
  }
  return(
    <div className={classes.TravelerInfo}>
      <h3>Traveler {props.number} Information</h3>
      {identification}
      <Field label="Date Of Birth: " type="date"/>
      <SelectField label="Gender: " options={Constants.GENDER_TYPES}/>
    </div>
  );
};

export default travelerInfo;