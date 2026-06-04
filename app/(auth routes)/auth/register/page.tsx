'use client';

import css from './page.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

export default function Register() {
  return (
    <main>
      <div className={clsx(css.box, 'container')}>
				<div className={css.formBox}>
          <RegisterForm />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/register.png"
            alt="eggs"
            fill
						className={css.image}
						sizes="(min-width: 1440px) 50vw, 0px"
						priority
          />
				</div>
			</div>
    </main>
  );
}