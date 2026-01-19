'use client';

import { Button } from '@/components/ui/button';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error('Failed to add item to cart');
      return;
    }

    toast.success(
      <div className='flex items-center gap-3'>
        <span>{res.message}</span>

        <Button
          variant='ghost'
          size='sm'
          onClick={() => {
            router.push('/cart');
          }}
        >
          Go To Cart
        </Button>
      </div>,
      {
        autoClose: 3000, // or false if you want it persistent
        closeOnClick: false,
      },
    );
  };

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus /> Add to cart
    </Button>
  );
};

export default AddToCart;
