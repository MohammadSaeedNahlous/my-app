'use client';

import { Button } from '@/components/ui/button';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { Cart, CartItem } from '@/types';
import { Loader, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'react-toastify';

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
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
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error('Failed to remove item from cart');
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
    });
  };

  // check if item in cart
  const exist =
    cart &&
    (cart!.items as CartItem[]).find((x) => x.productId === item.productId);

  return exist ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='w-4 h-4' />
        )}
      </Button>
      <span className='px-2'>{exist.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='w-4 h-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}{' '}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
