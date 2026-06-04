import Image from 'next/image';

import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';

import css from './page.module.css';
import { redirect } from 'next/navigation';
import { User } from '@/types/user';
import { getServerUser } from '@/lib/api/serverApi/users';

export default async function OnboardingPage() {
	let user: User;

	try {
		user = await getServerUser();
	} catch {
		redirect("/auth/login");
	}
	
  return (
		<section className={css.container}>
			<div className={css.form_box}>
				<OnboardingForm user={user} />
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
