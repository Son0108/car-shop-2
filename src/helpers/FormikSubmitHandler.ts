import { FormikHelpers } from "formik";

export type FormikSubmitHandler<T> = (
  values: T,
  formikHelpers: FormikHelpers<T>
) => void | Promise<any>;
