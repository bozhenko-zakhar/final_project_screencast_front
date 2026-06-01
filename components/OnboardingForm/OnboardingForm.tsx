'use client';

import Link from 'next/link';
import Image from 'next/image';

import css from './OnboardingForm.module.css';
import { Button } from '../Button/Button';
import { Field, Form, Formik } from 'formik';
import { useId } from 'react';

export default function OnboardingForm() {
	const fieldId = useId();

	return (
		<div className={css.container}>
			<Link href="/" className={css.logo}>
				<svg className={css.logo_icon}>
					<use href="/logo.svg#icon-alternate-false"></use>
				</svg>
			</Link>

			<h2>Давайте познаймимось ближче</h2>
			
			<div>
				<Image
					src="/image/Avatar-def.jpg"
					alt="Plant Decoration"
					className={css.image}
					width={164}
					height={164}
				/>

				<Button>Завантажити фото</Button>
			</div>

			<Formik initialValues={{}} onSubmit={() => {}}>
				<Form className={css.form}>
					<label htmlFor={`${fieldId}-gender`}>Стать дитини</label>
					<Field as="select" name="gender" id={`${fieldId}-gender`}>
						<option>Хлопчик</option>
						<option>Дівчинка</option>
						<option>Ще не знаю</option>
					</Field>

					<label htmlFor={`${fieldId}-dueDate`}>Планова дата пологів</label>
					<Field type="text" name="dueDate" id={`${fieldId}-dueDate`} />

					<Button>Зберегти</Button>
				</Form>
			</Formik>
		</div>
	);
};