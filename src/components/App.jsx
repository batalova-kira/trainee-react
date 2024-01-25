import { Product } from './Product/Product';
import Section from './Section/Section';
import css from './App.module.css';
import { Component } from 'react';
import ProductForm from './ProductForm/ProductForm';
import { nanoid } from 'nanoid';

const productsData = [
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

export class App extends Component {
  state = {
    // counterValue: 0,
    products: productsData,
  };

  // handleIncrement = () => {
  //   // this.setState(pS => {
  //   //   return {
  //   //     counterValue: pS.counterValue + 1,
  //   //   };
  //   // });
  //   this.setState({ counterValue: this.state.counterValue + 1 });
  // };

  // handleDecrement = () => {
  //   if (this.state.counterValue === 0) {
  //     alert('Counter value is 0!');
  //     return;
  //   }

  //   this.setState({ counterValue: this.state.counterValue - 1 });
  // };

  handleDeleteProduct = productId => {
    this.setState({
      products: this.state.products.filter(product => product.id !== productId),
    });
  };

  handleAddProduct = productData => {
    const hasDuplicate = this.state.products.some(
      product => product.title === productData.title
    );
    if (hasDuplicate) {
      alert(`Whoops! Product with title ${productData.title} already exists!`);
      return;
    }

    const finalProduct = { ...productData, id: nanoid() };

    // this.setState({
    //   products: [...this.state.products, finalProduct],
    // });

    this.setState(prevState => ({
      products: [...prevState.products, finalProduct],
    }));
  };

  render() {
    const sortedProducts = [...this.state.products].sort(
      (a, b) => b.discount - a.discount
    );
    return (
      <div>
        <Section>
          <h3>It`s mee😍</h3>
          {/* <button onClick={this.handleDecrement}>Decrement</button>
          <b>Counter value:{this.state.counterValue}</b>
          <button onClick={this.handleIncrement}>Increment</button>
          {this.state.counterValue > 4 && (
            <div>Congratulation! You won discount 20% - #F5D6S0E43🥳</div>
          )} */}
        </Section>
        <Section title="Add Product Form">
          <ProductForm handleAddProduct={this.handleAddProduct} />
        </Section>
        <Section title="Product List">
          <div className={css.productList}>
            {sortedProducts.map(product => {
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
