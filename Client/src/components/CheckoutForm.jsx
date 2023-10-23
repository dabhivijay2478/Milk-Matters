import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';
import { setOrderId } from '../features/cart/productSlice';

import axios from 'axios';

export const action =
  (store, queryClient) =>
    async ({ request }) => {
      const formData = await request.formData();
      const { name, address, contact } = Object.fromEntries(formData);
      const user = store.getState().userState.user;

      const { cartItems, orderTotal, numItemsInCart } =
        store.getState().cartState;

      const info = {
        name,
        address,
        contact,
        chargeTotal: orderTotal,
        orderTotal: formatPrice(orderTotal),
        cartItems,
        numItemsInCart,
      };
      console.log(info);
      // Create the orderData object
      const orderData = {
        dairyCode: user.dairyCode,
        name: user.name,
        contact: info.contact,
        address: info.address,
        productName: info.cartItems[0].title,
        productQuantity: numItemsInCart,
      };


      try {

        const response = await axios.post('http://localhost:5000/order-create', orderData);
        console.log(response.data.order._id);
        store.dispatch(setOrderId(response.data.order._id));
        queryClient.removeQueries(['orders']);
        store.dispatch(clearCart());
        toast.success('Order placed successfully');
        return redirect('/orders');
      } catch (error) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'There was an error placing your order';
        toast.error(errorMessage);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return redirect('/login');
        }
        return null;
      }
    };


const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl capitalize'>shipping information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <FormInput label='contact' name='contact' type='number' />

      <div className='mt-4'>
        <SubmitBtn text='place your order' />
      </div>
    </Form>
  );
};
export default CheckoutForm;
