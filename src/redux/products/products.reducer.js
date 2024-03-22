import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // [{}, {}, ...]
  isLoading: false,
  error: null,
  filterTerm: '',
};

const productsSlice = createSlice({
  // Ім'я слайсу
  name: 'products',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    setFilterTerm(state, { payload }) {
      state.filterTerm = payload;
    },
    addProduct(state, { payload }) {
      state.products.push(payload);
    },
    deleteProduct(state, { payload }) {
      state.products = state.products.filter(product => product.id !== payload);
    },
  },
});

// Генератори екшенів
export const { addProduct, deleteProduct, setFilterTerm } =
  productsSlice.actions;
// Редюсер слайсу
export const productsReducer = productsSlice.reducer;

// const intitialState = {
//   products: JSON.parse(localStorage.getItem('products')) ?? productsData, // [{}, {}, ...]
// };

// export const productsReducer = (state = intitialState, action) => {
//   // action -> { type: "products/deleteProduct", payload: "w1231" }
//   // action -> { type: "products/addProduct", payload: { id: "w1231", price: 10, title: "Samsung", ... } }
//   switch (action.type) {
//     case 'products/deleteProduct': {
//       return {
//         ...state,
//         products: state.products.filter(
//           product => product.id !== action.payload
//         ),
//       };
//     }
//     case 'products/addProduct': {
//       // state.products = [...state.products, action.payload];❌
//       return {
//         ...state,
//         products: [...state.products, action.payload], // ✅
//       };
//     }
//     default:
//       return state;
//   }
// };
// export const deleteProduct = payload => {
//   return {
//     type: 'products/deleteProduct',
//     payload,
//   };
// };

// export const addProduct = payload => {
//   return {
//     type: 'products/addProduct',
//     payload,
//   };
// };
