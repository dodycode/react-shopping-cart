import React from 'react';

const Cart = (props) => {
  const totalPrice = props.product.reduce((carrier, cartItem) => {
    return carrier + (cartItem.quantity * cartItem.product.price);
  }, 0);

	return (
		<div className="column">
        <h3 className="title is-4">Shopping Cart</h3>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.product.map((data, index) => (
              <tr key={index}>
                <td>{data.product.name}</td>
                <td>{data.product.price}</td>
                <td>{data.quantity}</td>
                <td>
                  <button className="button is-danger is-small" onClick={event => {
                    event.preventDefault();
                    props.removeFromCart(data.product);
                  }}>-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total : Rp {totalPrice}</h3>
    </div>
	);
};

export default Cart;