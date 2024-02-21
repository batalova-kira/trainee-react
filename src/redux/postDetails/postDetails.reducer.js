import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPostDetails = createAsyncThunk(
  'postDetails/get', // це префікс, обов'язковий, писати що завгодно можна
  async (postId, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      console.log('data: ', data);
      return data;
      // Цей return або return з catch (якщо буде помилка) буде записан в action.payload редюсеру
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  postDetails: null,
  isLoading: false,
  error: null,
};

const postDetailsSlice = createSlice({
  // Ім'я слайсу
  name: 'postDetails',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchPostDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.postDetails = payload;
      })
      .addMatcher(isAnyOf(fetchPostDetails.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(fetchPostDetails.pending), (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

// Редюсер слайсу
export const postDetailsReducer = postDetailsSlice.reducer;
