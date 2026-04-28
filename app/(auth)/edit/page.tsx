import css from './page.module.css';

import clsx from 'clsx';
import Image from 'next/image';

import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';

export default function Regisrewter() {
  return (
    <main>
      <div className={clsx(css.box, 'container')}>
        <div className={css.formBox}>
          <OnboardingForm />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/user.png"
            alt="logih image"
            width={720}
            height={900}
            // style={{
            //   maxWidth: '100%',
            //   height: '100%',
            //   objectFit: 'cover',
            //   position: 'absolute',
            //   right: '0',
            // }}
          />
        </div>
      </div>
    </main>
  );
}