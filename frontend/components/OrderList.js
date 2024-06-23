import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, filterOrders } from '../state/store';

export default function OrderList() {
  const dispatch = useDispatch();
  const { filteredOrders, loading, error, filter } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleFilterChange = (size) => {
    dispatch(filterOrders(size));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order, index) => (
          <li key={index}>
            <div>
              {order.fullName} - {order.size} - {order.toppings.join(', ')}
            </div>
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map(size => (
          <button
            key={size}
            onClick={() => handleFilterChange(size)}
            data-testid={`filterBtn${size}`}
            className={`button-filter${filter === size ? ' active' : ''}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
