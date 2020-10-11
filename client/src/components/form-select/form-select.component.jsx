import React from 'react';
import './form-select.styles.scss';

const FormSelect = ({handleChange, label, options, ...otherProps}) => (
    <div className="select-wrapper">
        <select className="select-text" onChange={handleChange} {...otherProps} >
            <option value="" disabled></option>
            { options.map( o => <option key={o.value} value={o.value}>{o.text}</option> ) }
        </select>
        <span className="select-highlight"></span>
        <span className="select-bar"></span>
        <label className={`select-label ${otherProps.value.length? 'shrink' : ''}`}>{label}</label>
    </div>
);

export default FormSelect;