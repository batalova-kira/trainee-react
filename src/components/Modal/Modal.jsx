import React, { Component } from 'react';
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
export default class Modal extends Component {
  // Про життєвий цикл компоненти
  state = {
    counter: 1,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Modal was update! Props or state change');
  // }

  handleIncrementProduct = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <StyledModal onClick={this.handleOverlayClick}>
        <div className="modal">
          <button onClick={this.props.closeModal} className="btnClose">
            &times;
          </button>
          <h2>Product details</h2>
          <div>
            <h3>Title: {this.props.modalData.title}</h3>
            <p>Price: {this.props.modalData.price}$</p>
            <p>Discount: {this.props.modalData.discount}$</p>
            <button onClick={this.handleIncrementProduct}>
              Add product: {this.state.counter}
            </button>
          </div>
        </div>
      </StyledModal>
    );
  }
}
