"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, sendVerifyEmail } from "@/lib/api/clientApi";
import type { User, UpdateUserPayload, FormValues } from "@/app/types/user";
import css from "./ProfileEditForm.module.css";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import type { FieldProps } from "formik";
import Select, {
  components,
  type SingleValue,
  type DropdownIndicatorProps,
  type ClassNamesConfig,
} from "react-select";

interface Props {
  user: User;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Введіть імʼя"),
  email: Yup.string().email("Некоректний email").required("Введіть email"),
  gender: Yup.string().oneOf(["", "boy", "girl"]),
  dueDate: Yup.string().nullable(),
});

// ===============SETINGS-FOR-SELECT-LIBA================

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

// ===============END-SETINGS-FOR-SELECT-LIBA================

export default function ProfileEditForm({ user }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isDateOpen, setIsDateOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
  });

  return (
    <Formik<FormValues>
      initialValues={{
        username: user.username,
        email: user.email,
        gender: user.gender || "",
        dueDate: user.dueDate ? user.dueDate.split("T")[0] : "",
      }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        // =================ДОДАТКОВЕ-1==============================
        const isEmailChanged = values.email !== user.email;
        // =================енд-ДОДАТКОВЕ-1==============================

        const payload: UpdateUserPayload = {
          username: values.username,
          email: values.email,
          gender: values.gender || null,
          dueDate: values.dueDate || null,
        };

        mutate(payload, {
          onSuccess: async (updatedUser) => {
            queryClient.setQueryData(["user"], updatedUser);

            if (isEmailChanged) {
              await sendVerifyEmail(values.email);
            }

            resetForm({
              values: {
                username: updatedUser.username,
                email: updatedUser.email,
                gender: updatedUser.gender || "",
                dueDate:
                  updatedUser.dueDate ? updatedUser.dueDate.split("T")[0] : "",
              },
            });

            router.refresh();
          },
        });
      }}
    >
      {({ dirty, resetForm }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Імʼя
            <Field className={css.input} type="text" name="username" />
            <ErrorMessage name="username" component="p" className={css.error} />
          </label>

          <label className={css.label}>
            Пошта
            <Field className={css.input} type="email" name="email" />
            <ErrorMessage name="email" component="p" className={css.error} />
          </label>

          <label className={css.label}>
            Стать дитини
            <div className={css.inputWrapper}>
              <Field name="gender">
                {({ field, form }: FieldProps<string, FormValues>) => (
                  <Select<GenderOption, false>
                    unstyled
                    options={genderOptions}
                    value={genderOptions.find(
                      (option) => option.value === field.value,
                    )}
                    onChange={(option: SingleValue<GenderOption>) =>
                      form.setFieldValue("gender", option?.value || "")
                    }
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
            Планова дата пологів
            <div className={css.inputWrapper}>
              <Field name="dueDate">
                {({ field, form }: FieldProps<string, FormValues>) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    open={isDateOpen}
                    onInputClick={() => setIsDateOpen(true)}
                    onClickOutside={() => setIsDateOpen(false)}
                    onChange={(date: Date | null) => {
                      form.setFieldValue(
                        "dueDate",
                        date ? date.toISOString().split("T")[0] : "",
                      );
                      form.setFieldTouched("dueDate", true);
                    }}
                    onSelect={() => {
                      setTimeout(() => {
                        setIsDateOpen(false);
                      }, 0);
                    }}
                    dateFormat="dd.MM.yyyy"
                    className={`${css.input} ${css.inputDate}`}
                    placeholderText="Оберіть дату"
                  />
                )}
              </Field>

              <svg className={css.icon}>
                <use href="/sprite.svg#arrow-down" />
              </svg>
            </div>
          </label>

          <div className={css.buttons}>
            <button
              className={css.cancelButton}
              type="button"
              onClick={() => resetForm()}
              disabled={!dirty || isPending}
            >
              Відмінити зміни
            </button>

            <button
              className={css.submitButton}
              type="submit"
              disabled={!dirty || isPending}
            >
              {isPending ? "Збереження..." : "Зберегти зміни"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
