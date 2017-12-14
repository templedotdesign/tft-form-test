import React from 'react';

import * as Constants from '../../../Constants/ReservationForm/ReservationForm';

import Field from '../Field/Field';
import SelectField from '../SelectField/SelectField';

import classes from './TravelerInfo.css';

const travelerInfo = (props) => {
  let title = null;
  if(props.number === 1) {
    title = (<h3>Primary Passenger Information</h3>)
  } else {
    title = (<h3>Passenger {props.number} Information</h3>);
  }

  let fname = `passenger${props.number}FirstName`;
  let mname = `passenger${props.number}MiddleName`;
  let lname = `passenger${props.number}LastName`;
  let passNum = `passenger${props.number}PassNum`;
  let passIssuer =`passenger${props.number}PassIssuer`;
  let passExp = `passenger${props.number}PassExp`;
  let dob = `passenger${props.number}DOB`;
  let gender = `passenger${props.number}Gender`;
  let suffix = `passenger${props.number}Suffix`;


  let identification = null;
  if(props.traveltype === 'Domestic') {
    identification = (
      <div>
        <Field label="First Name:" type="text" placeholder="John" name={fname} changed={props.changed}/>
        <Field label="Middle Name:" type="text" placeholder="Quentin" name={mname} changed={props.changed}/>
        <Field label="Last Name:" type="text" placeholder="Doe" name={lname} changed={props.changed}/>
        <SelectField label="Suffix:" options={Constants.SUFFIXES} name={suffix} changed={props.changed}/>
      </div>
    );
  } else if(props.traveltype === 'International') {
    identification = (
      <div>
        <Field label="First Name: " type="text" placeholder="John" name={fname} changed={props.changed}/>
        <Field label="Middle Name: " type="text" placeholder="Quentin" name={mname} changed={props.changed}/>
        <Field label="Last Name: " type="text" placeholder="Doe" name={lname} changed={props.changed}/>
        <SelectField label="Suffix:" options={Constants.SUFFIXES} name={suffix} changed={props.changed}/>
        <Field label="Passport Number: " type="text" placeholder="#########" name={passNum} changed={props.changed}/>
        <Field label="Passport Issuing Authority: " type="text" placeholder="USA" name={passIssuer} changed={props.changed}/>
        <Field label="Passport Expiration: " type="date" name={passExp} changed={props.changed}/>
      </div>
    );
  }
  return(
    <div className={classes.TravelerInfo}>
      {title}
      {identification}
      <Field label="Date Of Birth: " type="date" name={dob} changed={props.changed}/>
      <SelectField label="Gender: " options={Constants.GENDER_TYPES} name={gender} changed={props.changed}/>
    </div>
  );
};

export default travelerInfo;