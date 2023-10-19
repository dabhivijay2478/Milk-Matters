import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';
const url = '/get-products';
const metaurl = '/get-meta'

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),

  };
};
const metaquery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;


  return {
    queryKey: [
      'metas',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(metaurl, {
        params: queryParams,
      }),

  };
};

export const loader =
  (queryClient) =>
    async ({ request }) => {
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]);
      const response = await queryClient.ensureQueryData(
        metaquery(params)
      );
      const presponse = await queryClient.ensureQueryData(
        allProductsQuery(params)
      );


      const products = presponse.data.products;
      const meta = response.data.meta[0];

      return { products, meta, params };
    };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
