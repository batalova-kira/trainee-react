import React, { useState } from 'react';
import css from './ProductForm.module.css';

const ProductForm = ({ handleAddProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discount, setDiscount] = useState('');

  // state = {   // для класу
  //   title: '',
  //   price: '',
  //   hasDiscount: false,
  //   discount: '',
  // };

  const handleSubmit = e => {
    e.preventDefault();
    // витягуємо змінні зі стейту під час сабміту
    // const hasDiscount = this.state.hasDiscount;

    //підставили у продукт
    const productData = {
      title,
      price: Number.parseFloat(price),
      discount: hasDiscount ? Number.parseFloat(discount) : null,
    };

    //транспортуємо продукт в Арр
    // this.props.handleAddProduct(productData);
    handleAddProduct(productData);
    //очищення форми, змінюємо стан на початковий

    setTitle('');
    setPrice('');
    setHasDiscount(false);
    setDiscount('');
    // this.setState({  // для класу
    //   title: '',
    //   price: '',
    //   hasDiscount: false,
    //   discount: '',
    // });
  };

  const handleInputChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const name = e.target.name;

    switch (name) {
      case 'title': {
        setTitle(value);
        return;
      }
      case 'price': {
        setPrice(value);
        return;
      }
      case 'hasDiscount': {
        setHasDiscount(value);
        return;
      }
      case 'discount': {
        setDiscount(value);
        return;
      }
      default:
        return;
    }
    // this.setState({   // для класу
    //   [name]: value,
    // });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      {title === 'Sweet' && (
        <h2>Congraits! You won a promocode for -20% - 564ENGF 🥳</h2>
      )}
      <label className={css.formLabel}>
        <p className={css.labelText}>Title:</p>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          value={title}
        />
      </label>
      <label className={css.formlabel}>
        <p className={css.labelText}>Price:</p>
        <input
          type="text"
          name="price"
          onChange={handleInputChange}
          value={price}
        />
      </label>
      <label className={css.formLabel}>
        <span>Has discount?</span>
        <input
          type="checkbox"
          name="hasDiscount"
          onChange={handleInputChange}
          checked={hasDiscount}
        />
      </label>
      {hasDiscount && (
        <label className={css.formLabel}>
          <p className={css.labelText}>Discount:</p>
          <input
            type="text"
            name="discount"
            onChange={handleInputChange}
            value={discount}
          />
        </label>
      )}
      <button type="submit">Add product</button>
    </form>
  );
};

export default ProductForm;

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
