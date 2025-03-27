import React, { useEffect, useState } from 'react'
// import { fetchUserProfile } from './FetchUserProfile';

import axios from 'axios';
 
 
     const details={
         name:"",
         email:"",
         phone:"",
         address:[]
     }
function Profile() {
    
    const [Details, setDetails] = useState(details);
    useEffect(()=>{
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v2/user/profile`);
                setDetails(response.data.user);
            } catch (error) {
                console.error("Error fetching profile:", error);
            };
        }
     
            fetchProfile();
        }, []);
        
        

return (
    <div>
        
        <div>
            <h2>{Details.name}</h2>
            <p>{Details.email}</p>
            <p>{Details.phone}</p>
        </div>
        <div>
            <p>{Details.address}</p>
        </div>
    </div>
  )
} 
    
export default Profile