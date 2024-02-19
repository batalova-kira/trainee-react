import { Product } from '../components/Product/Product';
import Section from '../components/Section/Section';
import css from '../components/App.module.css';
import ProductForm from '../components/ProductForm/ProductForm';
import { nanoid } from 'nanoid';

import { useEffect, useState } from 'react';
import Modal from 'components/Modal/Modal';

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

export const Products = () => {
  const [products, setProducts] = useState(() => {
    //дістаємо дані з локалсторідж
    const stringifiedProducts = localStorage.getItem('products');
    const parsedProducts = JSON.parse(stringifiedProducts) ?? productsData;
    // оновлюємо стейт
    return parsedProducts;
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const stringifiedProducts = JSON.stringify(products);
    localStorage.setItem('products', stringifiedProducts);
  }, [products]);

  //відкриваємо модальне вікно
  const openModal = someDataToModal => {
    setIsOpenModal(true);
    setModalData(someDataToModal);
  };

  // закриваємо модальне вікно
  const closeModal = () => {
    setIsOpenModal(false);
    setModalData(null);
  };

  //видаляємо продукт
  const handleDeleteProduct = productId => {
    setProducts(products.filter(product => product.id !== productId));
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

    setProducts([...products, finalProduct]);
  };

  const sortedProducts = [...products].sort((a, b) => b.discount - a.discount);
  return (
    <div>
      <Section>
        <h3>It`s mee😍</h3>
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
