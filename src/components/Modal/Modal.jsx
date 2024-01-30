import React, { useEffect, useState } from 'react';
import { StyledModal } from './Styled';
/*
 Методи життєвого циклу - це зарезервовані реактом  методи (функції),
 які запускаються в певний період життя компоненти. 

 componentDidMount(){} - метод життєвого циклу,
 що запускається один раз, після успішного монтування компоненти в DOM.

 Використання:
 - Вішаються глобальні слухачі подій (addEventListener)
 - Встановлюються асінхронні таймери та лічільники (setTimeout, setInterval)
 - Зчитуються данні з локального сховища
 - Надсилаються мережеві запити (HTTP request)

 componentWillUnmount(){} - метод життєвого циклу,
що запускається один раз перед повним видаленням компоненти з DOM.

Використання:
 - Прибираються глобальні слухачі подій (removeEventListener)
 - Прибираються асінхронні таймери та лічільники (clearTimeout, clearInterval)
 - Зчитуються данні з локального сховища
 - Відхиляти мережеві запити (cancel HTTP request)

 componentDidUpdate(prevProps, prevState){} - метод життєвого циклу,
 що запускається кожен раз, після того, як компонента оновилася (змінилися
  пропси або стейт)

  Використання:
 - Надсилаються проміжкові мережеві запити ( HTTP request)
 - Оновлюють (сінхронізують) дані зі стейту з локальним середовищем
  */
const Modal = ({ modalData, closeModal }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [closeModal]);

  useEffect(() => {
    console.log('Product counter value:', +counter);
  }, [counter]);

  // Про життєвий цикл компоненти
  // state = {
  //   counter: 1,
  // };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  //   document.body.style.overflow = 'hidden';
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  //   document.body.style.overflow = 'auto';
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Modal was update! Props or state change');
  // }

  const handleIncrementProduct = () => {
    // this.setState(prevState => ({ counter: prevState.counter + 1 }));
    setCounter(prevState => prevState + 1);
    // setCounter(counter + 1);
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <StyledModal onClick={handleOverlayClick}>
      <div className="modal">
        <button onClick={closeModal} className="btnClose">
          &times;
        </button>
        <h2>Product details</h2>
        <div>
          <h3>Title: {modalData.title}</h3>
          <p>Price: {modalData.price}$</p>
          <p>Discount: {modalData.discount}$</p>
          <button onClick={handleIncrementProduct}>
            Add product: {counter}
          </button>
        </div>
      </div>
    </StyledModal>
  );
};

export default Modal;
