import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from '../components';

const ordersQuery = (params, user, productID) => {
  const queryKey = productID
    ? ['orders', user.username, productID]
    : ['orders', user.username, params.page ? parseInt(params.page) : 1];

  return {
    queryKey,
    queryFn: () =>
      customFetch.get(`/orders/${productID}`, {
        params,
      
      }),
  };
};

export const loader = (store, queryClient) => async ({ request }) => {
  const user = store.getState().userState.user;
  const productID = store.getState().product.orderId; // Corrected to product.orderId

  if (!user) {
    toast.warn('You must be logged in to view orders');
    return redirect('/login');
  }

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await queryClient.ensureQueryData(
      ordersQuery(params, user, productID)
    );



    return { orders: response.data.data, meta: response.data.meta, productID };
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

const Orders = () => {
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      {/* <ComplexPaginationContainer /> */}
    </>
  );
};

export default Orders;
