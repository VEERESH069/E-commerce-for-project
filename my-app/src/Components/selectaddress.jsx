import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "./AddressForm";

const SelectAddress = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/address/getAddress')
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error fetching address");
                }
                return res.json();
            })
            .then((data) => {
                setAddress(data.address);
                console.log("Address fetched:", data.address);
            })
            .catch((err) => {
                console.error("Error fetching address:", err);
            });
    }, []);

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-full md:w-4/5 lg:w-4/6 2xl:w-2/3 h-full border-l border-r border-neutral-300 flex flex-col'>
                <div className='w-full h-16 flex items-center justify-center border-b'>
                    <h1 className='text-2xl font-semibold'>Select Address</h1>
                </div>
                <div className='w-full flex-grow overflow-auto px-3 py-2 gap-y-2'>
                    {address.length > 0 ? (
                        address.map((address) => <AddressForm key={address._id} {...address} />)
                    ) : (
                        <p className='text-center text-gray-500'>No addresses found.</p>
                    )}
                </div>
                <div className='w-full h-16 flex items-center justify-center border-t'>
                    <button 
                        className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                        onClick={() => navigate("/add-address")}
                    >
                        Add New Address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectAddress;