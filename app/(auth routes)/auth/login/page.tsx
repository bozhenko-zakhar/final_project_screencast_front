import css from './page.module.css';

import clsx from 'clsx';
import Image from 'next/image';

import LoginForm from '@/components/LoginForm/LoginForm';

export default function Login() {
  return (
    <section>
      <div className={clsx(css.box, 'container')}>
        <div className={css.formBox}>
          <LoginForm />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/login.png"
            alt="eggs"
            fill
            className={css.image}
            sizes="(min-width: 1440px) 50vw, 0px"
            priority
          />
        </div>
      </div>
    </section>
  );
}