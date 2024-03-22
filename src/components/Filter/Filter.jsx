import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterTerm } from './../../redux/products/products.reducer';

const Filter = () => {
  const filterTerm = useSelector(state => state.productsStore.filterTerm);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(setFilterTerm(e.target.value));
    console.log('e: ', e.target.value);
  };

  return (
    <div>
      <input
        value={filterTerm}
        onChange={onChange}
        type="text"
        placeholder="Enter product name"
      />
    </div>
  );
};

export default Filter;
