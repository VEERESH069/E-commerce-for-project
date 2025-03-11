import react from 'react'; 
import {useState} from 'react';

export const AddressForm = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');

 axios.post('http://localhost:8000/api/address', { address, city, state, zip, country }
 )
    .then(res => console.log(res))  
    .catch(err => console.log(err))

    return(
        <div>
            <h1>Address Form</h1>
            <div>
                <label>Address:</label>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                <label>City:</label>
                <input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                <label>State:</label>
                <input type='text' value={state} onChange={(e) => setState(e.target.value)} />
                <label>Zip:</label>
                <input type='text' value={zip} onChange={(e) => setZip(e.target.value)} />
                <label>Country:</label>
                <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
        </div>
    )
}