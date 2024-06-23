import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postOrder, clearError, updateFormState } from '../state/store';

export default function PizzaForm() {
  const dispatch = useDispatch();
  const { formState, loading, error, orderInProgress } = useSelector(state => state.orders);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    dispatch(updateFormState({ [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    const toppings = Object.keys(formState).filter(key => formState[key] === true);
    const order = {
      fullName: formState.fullName,
      size: formState.size,
      toppings,
    };
    dispatch(postOrder(order));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {orderInProgress && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>{error}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={formState.size} onChange={handleChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" checked={formState['1']} onChange={handleChange} />
          Pepperoni<br />
        </label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" checked={formState['2']} onChange={handleChange} />
          Green Peppers<br />
        </label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" checked={formState['3']} onChange={handleChange} />
          Pineapple<br />
        </label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" checked={formState['4']} onChange={handleChange} />
          Mushrooms<br />
        </label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" checked={formState['5']} onChange={handleChange} />
          Ham<br />
        </label>
      </div>
      <input data-testid="submit" type="submit" value="Order Pizza" />
    </form>
  );
}
