import axios from 'axios';

const productionUrl = 'http://localhost:5000';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price) => {
  // Check if price is a number or can be converted to a number
  if (typeof price !== 'number') {
    price = parseFloat(price); // Try to convert to a number
  }

  // Check if the conversion was successful
  if (!isNaN(price)) {
    // Format the price as currency
    const dollarsAmount = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price.toFixed(2));

    return dollarsAmount;
  } else {
    // Handle the case where price cannot be converted to a number
    return 'Invalid Price';
  }
};


export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
