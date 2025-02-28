import React, { useEffect, useState} from 'react';

const Cart = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/product/getcart")
        .then((res) =>{
            if(!res.ok){
                console.log("error in cart page.");
            }
            return res.json();
        })
        .then((data) => {
            setProducts(data.cart.map(product => ({quantity: product['quantity'], ...product['productId']})));
            console.log("products fetched:", data.cart);
        })
        .catch((err) => {
            console.log("Error fetching products:", err);
        });
    }, []);

    console.log("products:", products);

  return (
    <div className=''>
        <div className=''>
            <div>
                <div>
                    <h1>Cart</h1>
                </div>
                <div className=''>
                    {
                        products.map(product => (
                            <CartProduct key = {product_id} {...product}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default Cart;