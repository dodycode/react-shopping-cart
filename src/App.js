import React, { Component } from 'react';
import Navbar from './components/navbar';
import Product from './components/product';
import Cart from './components/cart';
import './App.css';

class App extends Component {

  state = {
    products: [],
    cartItems: []
  }

  handleAddItemToCart = product => {
    let arrayCart = this.state.cartItems;
    const alreadyExists = arrayCart.some(
      cartItem => cartItem.product.id === product.id
    );
    if (alreadyExists) {
      console.log('test');
      arrayCart = arrayCart.map(cartItem => {
        if(cartItem.product.id === product.id) {
          cartItem.quantity = cartItem.quantity + 1;
        }
        return cartItem;
      });
    }else{
      arrayCart.push({
        product: product,
        quantity: 1
      });
    }
    this.setState({ cartItems: arrayCart });  
  }

  handleRemoveItemFromCart = product => {
    let arrayCart = this.state.cartItems;
    const selectedItemIndex = arrayCart.findIndex(cartItem => cartItem.product.id === product.id);
    let selectedItem = arrayCart[selectedItemIndex];
    if(selectedItem.quantity > 1) {
      selectedItem.quantity - 1;
    }else{
      arrayCart.splice(selectedItemIndex, 1);
    }
  }

  componentDidMount() {
    fetch(`http://product-list.glitch.me/`)
    .then(response => response.json())
    .then(data => {
      this.setState({ products: data })
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="columns">
          <div className="column is-two-thirds">
            <div>
              <h3 className="title">Our Products</h3>
              <div className="columns">
                { this.state.products.map(product => <Product 
                  key={product.id}
                  product={product}
                  addToCart={this.handleAddItemToCart}/>) }
              </div>
            </div>
          </div>
          <Cart product={this.state.cartItems}
          removeFromCart={this.handleRemoveItemFromCart} />
        </div>
      </div>
    );
  };
};

export default App;
