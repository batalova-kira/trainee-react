import { Product } from './Product/Product';
import Section from './Section/Section';
import css from './App.module.css';
import { Component } from 'react';

export class App extends Component {
  handleIncrement = event => {
    console.log(event);
  };

  handleDecrement = event => {
    console.log(event);
  };
  handleDeleteProduct = productId => {
    console.log('productId:', productId);
  };

  render() {
    return (
      <div>
        <Section>
          <h3>It`s mee😍</h3>
          <button onClick={this.handleDecrement}>Decrement</button>
          <b>Counter value:</b>
          <button onClick={this.handleIncrement}>Increment</button>
        </Section>
        <Section title="Product List">
          <div className={css.productList}>
            {products.map(product => {
              return (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  discount={product.discount}
                  handleDeleteProduct={this.handleDeleteProduct}
                />
              );
            })}
          </div>
        </Section>
      </div>
    );
  }
}

const products = [
  {
    id: '1',
    title: 'Cake',
    price: '13.5',
    discount: null,
  },
  { id: '2', title: 'Bagel', price: '9.80', discount: '0.5' },
  { id: '3', title: 'Ice-cream', price: '12.4', discount: '1.5' },
  { id: '4', title: 'Pop-corn', price: '7.90', discount: null },
  { id: '5', title: 'Chup', price: '5.90', discount: '1.5' },
];
