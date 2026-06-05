"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FieldProps } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/clientApi/users";
import type { User, UpdateUserPayload, FormValues } from "@/types/user";
import css from "./ProfileEditForm.module.css";
import { useRouter } from "next/navigation";
import Select, {
  components,
  type SingleValue,
  type DropdownIndicatorProps,
  type ClassNamesConfig,
} from "react-select";
import toast from "react-hot-toast";
import CalendarPicker from "@/components/CalendarPicker/CalendarPicker";

interface Props {
  user: User;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Введіть імʼя"),
  email: Yup.string().email("Некоректний email").required("Введіть email"),
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

export default function ProfileEditForm({ user }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
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
    <Formik<FormValues>
      initialValues={{
        username: user.name,
        email: user.email,
        gender: user.gender || "",
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

        if (values.username !== user.name) {
          payload.name = values.username;
        }

        if (
          values.dueDate !== (user.dueDate ? user.dueDate.split("T")[0] : "")
        ) {
          payload.date = values.dueDate || null;
        }

        if (values.email !== user.email) {
          payload.newEmail = values.email;
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

            toast.success("Профіль оновлено");

            resetForm({
              values: {
                username: updatedUser.name,
                email: updatedUser.email,
                gender: updatedUser.gender || "",
                dueDate:
                  updatedUser.dueDate ? updatedUser.dueDate.split("T")[0] : "",
              },
            });

            // router.refresh();
          },

          onError: () => {
            toast.error("Не вдалося оновити профіль");
          },
        });
      }}
    >
      {({ dirty, resetForm }) => (
        <Form className={css.form}>
          <div className={css.fields}>
            <label className={css.label}>
              Імʼя
              <Field className={css.input} type="text" name="username" />
              <ErrorMessage
                name="username"
                component="p"
                className={css.error}
              />
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
              Планова дата пологів
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

          <div className={css.buttons}>
            <button
              className={css.cancelButton}
              type="button"
              onClick={() => {
                resetForm();

                const gender = user?.gender;

                document.body.dataset.theme =
                  gender === "girl" || gender === "boy" ? gender : "neutral";
              }}
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
