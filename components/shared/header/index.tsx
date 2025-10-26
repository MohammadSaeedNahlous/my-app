import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from './menu';
const Header = () => {
  return (
    <header className='w-full border-b '>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          {/* LOGO */}
          <Link href={'/'} className='flex-start'>
            <Image
              src={'/images/logo.svg'}
              alt={APP_NAME}
              width={48}
              height={48}
              priority
            />
            <span className='hidden font-bold text-2xl ml-3 lg:block'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='space-x-2'>
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
