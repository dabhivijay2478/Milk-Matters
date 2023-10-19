import { FeaturedProducts, Hero } from '../components';

import { customFetch } from '../utils';
const url = '/get-products';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await customFetch(url);
  const products = response.data.products;
  return { products };
};


const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};
export default Landing;
