import { useEffect, useState } from 'react';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import axios from 'axios';
import { useSelector } from 'react-redux';

day.extend(advancedFormat);

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const dairyCode = useSelector((state) => state.userState.user.dairyCode);
  console.log(dairyCode);

  const fetchOrders = async () => {
    try {
      if (dairyCode) {
        const response = await axios.get(`http://localhost:5000/orders/${dairyCode}`);
        if (response.status === 200) {
          setOrders(response.data.orders); // Assuming the response contains an array of orders
        } else {
          console.error('Failed to fetch orders');
        }
      } else {
        console.error('No dairyCode available');
      }
    } catch (error) {
      console.error('Error while fetching orders:', error);
    }
  };
  useEffect(() => {


    fetchOrders();
  }, [dairyCode]);

  return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>
        {/* total orders : {meta.pagination.total} */}
      </h4>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className='hidden sm:block'>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order._id; // Replace with your order ID field
              const { name, address, createdAt } =
                order;
              const date = day(order.orderDate).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{order.product.attributes.title}</td>
                  <td>{order.product.attributes.price}</td>
                  <td>{order.productQuantity}</td>
                  <td className='hidden sm:block'>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
