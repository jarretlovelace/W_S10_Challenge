import { configureStore, createSlice } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import axios from 'axios';

const initialState = {
  orders: [],
  filteredOrders: [],
  loading: false,
  error: null,
  formState: {
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  },
  filter: 'All',
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart(state) {
      state.loading = true;
    },
    fetchOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
      state.filteredOrders = action.payload;
    },
    fetchOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addOrderStart(state) {
      state.loading = true;
    },
    addOrderSuccess(state, action) {
      state.loading = false;
      state.orders.push(action.payload);
      state.filteredOrders.push(action.payload);
    },
    addOrderFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    filterOrders(state, action) {
      state.filter = action.payload;
      if (action.payload === 'All') {
        state.filteredOrders = state.orders;
      } else {
        state.filteredOrders = state.orders.filter(order => order.size === action.payload);
      }
    },
    clearError(state) {
      state.error = null;
    },
    updateFormState(state, action) {
      state.formState = { ...state.formState, ...action.payload };
    },
    resetFormState(state) {
      state.formState = initialState.formState;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
  filterOrders,
  clearError,
  updateFormState,
  resetFormState,
} = ordersSlice.actions;

export const fetchOrders = () => async dispatch => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.get('http://localhost:9009/api/pizza/history');
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.message));
  }
};

export const postOrder = (order) => async dispatch => {
  dispatch(addOrderStart());
  try {
    const response = await axios.post('http://localhost:9009/api/pizza/order', order);
    dispatch(addOrderSuccess(response.data));
    dispatch(resetFormState());
  } catch (error) {
    dispatch(addOrderFailure(error.response?.data?.message || 'Order failed'));
  }
};

export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
