import React from 'react'
import { Productcard } from '../Component/Productcard'

const productdetails = [
    {
    name: "Product1",
    image: "https://picsum.photos/200/300",
    price: "1000",
    description: "Description1"
    },
    {
    name: "Product2",
    image: "https://picsum.photos/200/300",
    price: "2000",
    description: "Description2"
    }
]

export const Home = () => {
    return (
      <div>
        {productdetails.map((product, index) => {
            return(
            <> 
               <Productcard key={index} {...product} />
            </>
            )
})}
      </div>
    );
  };
  
