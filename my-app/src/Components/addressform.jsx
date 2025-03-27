import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const AddressForm = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const addressdetails = { address:address, country: country, city:city, state:state, zip:zip };
    axios.post('http://localhost:3000/api/addresses', addressdetails)
      .then(res => console.log(res)) navigate("/profile");
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>Address Form</h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <br />
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          <br />
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          <br />
          <label>State:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
          <br />
          <label>Zip:</label>
          <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
          <br />
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
