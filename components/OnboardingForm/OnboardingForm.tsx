'use client';

import { useEffect, useRef } from 'react';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import * as Yup from "yup";
import toast from 'react-hot-toast';

import Select, {
  components,
  type SingleValue,
  type DropdownIndicatorProps,
  type ClassNamesConfig,
} from "react-select";

import { useAuthStore } from '@/lib/store/authStore';
import { updateUser, updateUserAvatar } from '@/lib/api/clientApi/users';
import { FormValues, UpdateUserPayload, User } from '@/types/user';

import CalendarPicker from '../CalendarPicker/CalendarPicker'
import { Button } from '../Button/Button';

import css from './OnboardingForm.module.css';

// =========GLOBAL-SCOPE-DATA=========================
interface Props {
	user: User;
}

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

// =========OnboardingForm-COMPONENT=========================
export default function OnboardingForm({ user }: Props) {
	const router = useRouter();
	const setUser = useAuthStore((state) => state.setUser);
	const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // =========CHEK-TYPE-OF-FILE=========================
    if (!file.type.startsWith("image/")) {
      toast.error("Можна завантажити тільки зображення");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Максимальний розмір — 5MB");
      return;
    }
    // =========END-CHEK-TYPE-OF-FILE=========================

    const formData = new FormData();
    formData.append("avatar", file);

    mutate(formData);
    e.target.value = "";
	}

  const mutateUser = useMutation({
    mutationFn: updateUser,
	});
  
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: (updatedAvatar) => {
      setUser({
        ...user,
        avatar: updatedAvatar.url,
      });

      toast.success("Фото профілю оновлено");
      router.refresh();
    },
    onError: () => {
      toast.error("Не вдалося завантажити фото");
    },
  });

  useEffect(() => {
    const gender = user?.gender;

    document.body.dataset.theme =
      gender === "girl" || gender === "boy" ? gender : "neutral";
  }, [user?.gender]);

	return (
		<div className={css.container}>
			<Link href="/" className={css.logo}>
				<svg className={css.logo_icon}>
					<use href="/logo.svg#icon-alternate-false"></use>
				</svg>
			</Link>

			<div className={css.form_container}>

				<h2 className={css.title}>Давайте познаймимось ближче</h2>
				
				<div className={css.image_container}>
					<Image
						className={css.image}
						src={user.avatar || "/image/Avatar-def.jpg"}
						alt={user.name}
						width={120}
						height={120}
					/>

					<Button
						className={css.photo_btn}
						type="button"
						onClick={() => inputRef.current?.click()}
						disabled={isPending}
					>
						{isPending ? "Завантаження..." : "Завантажити нове фото"}
					</Button>

					<input
						ref={inputRef}
						type="file"
						accept="image/*"
						hidden
						onChange={handleFileChange}
						aria-label="Завантажити аватар"
					/>
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
							gender?: string;
							date?: string | null;
						} = {};

						if (
							values.dueDate !== (user.dueDate ? user.dueDate.split("T")[0] : "")
						) {
							payload.date = values.dueDate || null;
						}

						if (values.gender !== (user.gender || undefined)) {
							payload.gender = values.gender || undefined;
						}

						mutateUser.mutate(payload as UpdateUserPayload, {
							onSuccess: async (updatedUser) => {
								setUser(updatedUser);

								document.body.dataset.theme =
									updatedUser.gender === "girl" || updatedUser.gender === "boy" ?
										updatedUser.gender
										: "neutral";
								
								resetForm();

								toast.success("Профіль збережено");
								router.push("/")
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
											disabled={mutateUser.isPending}
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
						
						<Button type='submit'>Зберегти</Button>
					</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
