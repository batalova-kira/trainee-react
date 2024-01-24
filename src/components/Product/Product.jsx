import css from './Product.module.css';

export const Product = ({
  title,
  id,
  price,
  discount,
  handleDeleteProduct,
}) => {
  const productBg = discount ? '#97e605' : '#f9bf04';

  const productStyles = {
    backgroundColor: productBg,
  };

  return (
    <div className={css.product} style={productStyles}>
      <img
        src="https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg"
        alt="Candies"
        width="640"
        className={css.productImg}
      />
      <h2>{title}</h2>
      {discount ? (
        <h3 className={css.discountBage}>Discount : {discount} $ </h3>
      ) : (
        <p className={css.apology}>Sorry, we don`t have this product</p>
      )}
      <h3>Price: {price} $</h3>
      <button className={css.productAddToCardBtn} type="button">
        Add to card
      </button>
      <button
        onClick={() => handleDeleteProduct(id)}
        className={css.productAddToCardBtn}
      >
        &times;
      </button>
    </div>
  );
};
