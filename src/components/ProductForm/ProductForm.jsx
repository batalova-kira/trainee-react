import React, { Component } from 'react';
import css from './ProductForm.module.css';

export default class ProductForm extends Component {
  state = {
    title: '',
    price: '',
    hasDiscount: false,
    discount: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    // витягуємо змінні зі стейту під час сабміту
    const hasDiscount = this.state.hasDiscount;

    //підставили у продукт
    const productData = {
      title: this.state.title,
      price: Number.parseFloat(this.state.price),
      discount: hasDiscount ? Number.parseFloat(this.state.discount) : null,
    };

    //транспортуємо продукт в Арр
    this.props.handleAddProduct(productData);
    //очищення форми, змінюємо стан на початковий
    this.setState({
      title: '',
      price: '',
      hasDiscount: false,
      discount: '',
    });
  };

  handleInputChange = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        {this.state.title === 'Sweet' && (
          <h2>Congraits! You won a promocode for -20% - 564ENGF 🥳</h2>
        )}
        <label className={css.formLabel}>
          <p className={css.labelText}>Title:</p>
          <input
            type="text"
            name="title"
            onChange={this.handleInputChange}
            value={this.state.title}
          />
        </label>
        <label className={css.formlabel}>
          <p className={css.labelText}>Price:</p>
          <input
            type="text"
            name="price"
            onChange={this.handleInputChange}
            value={this.state.price}
          />
        </label>
        <label className={css.formLabel}>
          <span>Has discount?</span>
          <input
            type="checkbox"
            name="hasDiscount"
            onChange={this.handleInputChange}
            checked={this.state.hasDiscount}
          />
        </label>
        {this.state.hasDiscount && (
          <label className={css.formLabel}>
            <p className={css.labelText}>Discount:</p>
            <input
              type="text"
              name="discount"
              onChange={this.handleInputChange}
              value={this.state.discount}
            />
          </label>
        )}
        <button type="submit">Add product</button>
      </form>
    );
  }

  // Неконтрольована форма
  // handleSubmit = e => {
  // // скидуємо форму
  //   e.preventDefault();
  // // витягуємо форму
  //   const title = e.currentTarget.elements.title.value;
  //   const price = e.currentTarget.elements.price.value;
  //   const hasDiscount = e.currentTarget.elements.hasdiscount.checked;
  //   const discount = e.currentTarget.elements.discount.value;

  // формуємо об'єкт
  //   const productData = {
  //     title,
  //     price: Number.parseFloat(price),
  //     discount: hasDiscount ? Number.parseFloat(discount) : null,
  //   };

  //   this.props.handleAddProduct(productData);
  // };

  // render() {
  //   return (
  //     <form className={css.form} onSubmit={this.handleSubmit}>
  //       <label className={css.formLabel}>
  //         <p className={css.labelText}>Title:</p>
  //         <input type="text" name="title" />
  //       </label>
  //       <label className={css.formlabel}>
  //         <p className={css.labelText}>Price:</p>
  //         <input type="text" name="price" />
  //       </label>
  //       <label className={css.formLabel}>
  //         <span>Has discount?</span>
  //         <input type="checkbox" name="hasdiscount" />
  //       </label>
  //       <label className={css.formLabel}>
  //         <p className={css.labelText}>Discount:</p>
  //         <input type="text" name="discount" />
  //       </label>
  //       <button type="submit">Add product</button>
  //     </form>
  //   );
  // }
}
