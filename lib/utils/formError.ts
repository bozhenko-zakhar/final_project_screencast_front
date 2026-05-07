import { FormikErrors } from "formik";

export const getFieldError = <T extends Record<string, any>>(
  errors: FormikErrors<T>,
  touched: Record<string, boolean>,
  fieldName: string,
): string | undefined => {
  if (touched[fieldName] && errors[fieldName]) {
    return typeof errors[fieldName] === "string" ?
        errors[fieldName]
      : undefined;
  }
  return undefined;
};
