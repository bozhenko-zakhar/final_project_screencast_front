'use client';

import Link from 'next/link';
import Image from 'next/image';

import css from './OnboardingForm.module.css';
import { Button } from '../Button/Button';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { updateUser } from '@/lib/api/clientApi/users';
import { FormValues, UpdateUserPayload, User } from '@/types/user';

import * as Yup from "yup";

import Select, {
  components,
  type SingleValue,
  type DropdownIndicatorProps,
  type ClassNamesConfig,
} from "react-select";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';

import toast from "react-hot-toast";
import CalendarPicker from '../CalendarPicker/CalendarPicker';

const validationSchema = Yup.object({
	gender: Yup.string().oneOf(["", "boy", "girl"]),
	dueDate: Yup.string().nullable(),
});




const genderOptions = [
  { value: "", label: "Не вибрано" },
  { value: "boy", label: "Хлопчик" },
  { value: "girl", label: "Дівчинка" },
];

type GenderOption = (typeof genderOptions)[number];


const DropdownIndicator = (
	props: DropdownIndicatorProps<GenderOption, false>,
) => (
	<components.DropdownIndicator {...props}>
		<svg width="12" height="7">
			<use href="/sprite.svg#arrow-down" />
		</svg>
	</components.DropdownIndicator>
);

interface Props {
	user: User;
}


const selectClassNames: ClassNamesConfig<GenderOption, false> = {
  control: () => `${css.input} ${css.inputSelect} ${css.selectControl}`,
  valueContainer: () => css.selectValue,
  singleValue: () => css.selectText,
  placeholder: () => css.selectText,
  menu: () => css.selectMenu,
  option: ({ isFocused }) =>
    `${css.selectOption} ${isFocused ? css.selectOptionActive : ""}`,
  dropdownIndicator: ({ selectProps }) =>
    `${css.selectIndicator} ${
      selectProps.menuIsOpen ? css.selectIndicatorOpen : ""
    }`,
  indicatorSeparator: () => css.selectSeparator,
};

export default function OnboardingForm({ user }: Props) {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const gender = user?.gender;

    document.body.dataset.theme =
      gender === "girl" || gender === "boy" ? gender : "neutral";
  }, [user?.gender]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
  });

	return (
		<div className={css.container}>
			<Link href="/" className={css.logo}>
				<svg className={css.logo_icon}>
					<use href="/logo.svg#icon-alternate-false"></use>
				</svg>
			</Link>

			<div className={css.form_container}>

				<h2 className={css.title}>Давайте познаймимось ближче</h2>
				
				<div>
					<Image
						src="/image/Avatar-def.jpg"
						alt="Plant Decoration"
						className={css.image}
						width={164}
						height={164}
					/>

					<Button className={css.photo_btn}>Завантажити фото</Button>
				</div>

				<Formik<FormValues>
					initialValues={{
						gender: "",
						dueDate: user.dueDate ? user.dueDate.split("T")[0] : "",
					}}
					validationSchema={validationSchema}
					enableReinitialize
					onSubmit={(values, { resetForm }) => {
						const payload: Partial<UpdateUserPayload> & {
							name?: string;
							date?: string | null;
							newEmail?: string;
						} = {};

						if (
							values.dueDate !== (user.dueDate ? user.dueDate.split("T")[0] : "")
						) {
							payload.date = values.dueDate || null;
						}

						if (values.gender !== (user.gender || "")) {
							payload.gender = values.gender || null;
						}

						mutate(payload as UpdateUserPayload, {
							onSuccess: async (updatedUser) => {
								setUser(updatedUser);
								queryClient.setQueryData(["user"], updatedUser);

								document.body.dataset.theme =
									updatedUser.gender === "girl" || updatedUser.gender === "boy" ?
										updatedUser.gender
									: "neutral";

								toast.success("Профіль збережено");

								resetForm({
									values: {
										gender: updatedUser.gender || "",
										dueDate:
											updatedUser.dueDate ? updatedUser.dueDate.split("T")[0] : "",
									},
								});
							},

							onError: () => {
								toast.error("Не зберегти оновити профіль");
							},
						});
					}}
				>
				{() => (
					<Form className={css.form}>
						<div className={css.fields}>
							<label className={css.label}>
								<span>Стать дитини</span>
								<div className={css.inputWrapper}>
									<Field name="gender">
										{({ field, form }: FieldProps<string, FormValues>) => (
										<Select<GenderOption, false>
											unstyled
											options={genderOptions}
											value={genderOptions.find(
												(option) => option.value === field.value,
											)}
											onChange={(option: SingleValue<GenderOption>) => {
												const gender = option?.value || "";

												form.setFieldValue("gender", gender);

												document.body.dataset.theme =
													gender === "girl" || gender === "boy" ?
														gender
													: "neutral";
											}}
											onBlur={() => form.setFieldTouched("gender", true)}
											placeholder="Оберіть стать"
											isSearchable={false}
											classNames={selectClassNames}
											components={{
												DropdownIndicator,
												IndicatorSeparator: () => null,
											}}
										/>
										)}
									</Field>
								</div>
							</label>

							<label className={css.label}>
								<span>Планова дата пологів</span>
								<div className={css.inputWrapper}>
									<Field name="dueDate">
										{({ field, form }: FieldProps<string, FormValues>) => (
										<CalendarPicker
											id="dueDate"
											value={field.value}
											placeholder="Оберіть дату"
											disabled={isPending}
											onChange={(date) => {
												form.setFieldValue("dueDate", date);
												form.setFieldTouched("dueDate", true, false);
											}}
										/>
										)}
									</Field>
								</div>
								<ErrorMessage
									name="dueDate"
									component="p"
									className={css.error}
								/>
							</label>
						</div>
						
						<Button>Зберегти</Button>
					</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};