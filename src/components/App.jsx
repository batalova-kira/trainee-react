import { Product } from './Product/Product';
import Section from './Section/Section';
import css from './App.module.css';
import ProductForm from './ProductForm/ProductForm';
import { nanoid } from 'nanoid';
import Modal from './Modal/Modal';
import { useEffect, useState } from 'react';

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

export const App = () => {
  const [products, setProducts] = useState(() => {
    //дістаємо дані з локалсторідж
    const stringifiedProducts = localStorage.getItem('products');
    const parsedProducts = JSON.parse(stringifiedProducts) ?? productsData;
    // оновлюємо стейт
    return parsedProducts;
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // state = {  // коли Арр написан на класі
  //   // counterValue: 0,
  //   products: productsData,
  //   isOpenModal: false, //відкрита модалка чи закрита
  //   modalData: null, // данні,які модалка повинна відобразити
  // };

  // componentDidMount() {
  //   //дістаємо дані з локалсторідж
  //   const stringifiedProducts = localStorage.getItem('products');
  //   const parsedProducts = JSON.parse(stringifiedProducts) ?? productsData;
  //   // оновлюємо стейт
  //   this.setState({ products: parsedProducts });
  // }

  useEffect(() => {
    const stringifiedProducts = JSON.stringify(products);
    localStorage.setItem('products', stringifiedProducts);
  }, [products]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.products !== this.state.products) {
  //     const stringifiedProducts = JSON.stringify(this.state.products);
  //     localStorage.setItem('products', stringifiedProducts);
  //   }
  // }

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

  //відкриваємо модальне вікно
  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
    // this.setState({ isOpenModal: true, modalData: someDataToModal });
  };

  // закриваємо модальне вікно
  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
    // this.setState({ isOpenModal: false, modalData: null });
  };

  //видаляємо продукт
  const handleDeleteProduct = productId => {
    setProducts(products.filter(product => product.id !== productId));
    // this.setState({
    //   products: this.state.products.filter(product => product.id !== productId),
    // });
  };

  //сюди передаємо об'єкт з форми для реалізації його додавання
  const handleAddProduct = productData => {
    // перевіряємо, чи немає дублікату
    const hasDuplicate = products.some(
      product => product.title === productData.title
    );
    if (hasDuplicate) {
      alert(`Whoops! Product with title ${productData.title} already exists!`);
      return;
    }

    //створили фінальний продукт, додали ід
    const finalProduct = { ...productData, id: nanoid() }; //Object.assign({id: nanoid()}, productData)

    // this.setState({
    //   products: [...this.state.products, finalProduct],
    // });

    // передаємо об'єкт в стейт
    setProducts([...products, finalProduct]);
    // setProducts(prevState => [...prevState, finalProduct])
    // this.setState(prevState => ({
    //   products: [...prevState.products, finalProduct],
    // }));
  };

  const sortedProducts = [...products].sort((a, b) => b.discount - a.discount);
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
        <ProductForm handleAddProduct={handleAddProduct} />
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
                handleDeleteProduct={handleDeleteProduct}
                openModal={openModal}
              />
            );
          })}
        </div>
      </Section>
      {isOpenModal && <Modal closeModal={closeModal} modalData={modalData} />}
    </div>
  );
};
