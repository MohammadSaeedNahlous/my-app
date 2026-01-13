import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';
import { convertToPlainObject } from '@/lib/utils';

export const metadata = {
  title: 'Home',
};

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const convertedProducts = latestProducts.map((product) =>
    convertToPlainObject(product)
  );

  return (
    <>
      <ProductList
        data={convertedProducts}
        title='Featured Products'
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </>
  );
}
