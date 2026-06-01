import Image from 'next/image';

import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';

import css from './page.module.css';

export default function OnboardingPage() {
  return (
		<section className={css.container}>
			<div className={css.form_box}>
      	<OnboardingForm />
			</div>

			<div className={css.image_box}>
				<Image
					src="/image/Plant.jpg"
					alt="Plant Decoration"
					fill
					className={css.image}
					sizes="(min-width: 1440px) 50vw, 0px"
					priority
				/>
			</div>
    </section>
  );
};
