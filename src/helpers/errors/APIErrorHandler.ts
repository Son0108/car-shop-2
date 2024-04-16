import { FormikHelpers } from "formik";
import { AxiosError } from "axios";
import { APIError, APIErrorResponse } from "../../config/api/api-error";
import { NotifyFunction } from "../../contexts/NotificationContext/NotificationContext";

/**
 * Notify the user that an error has occurred.
 * @param error api-error for which the user should be notified
 * @param notify callback to fire a user-notification
 */
export function notifyError(error: APIError, notify: NotifyFunction) {
  notify({
    severity: "error",
    title: error.message,
  });
}

/**
 * Options for the api-error-handler function
 */
interface ApiErrorHandlerOptions<T> {
  /**
   * callback to show a notification
   */
  notify: NotifyFunction;
  /**
   * helper object that allows the setting of field errors
   */
  helpers?: FormikHelpers<T>;
}

/**
 * handle an api-error-response by firing notifications or setting field-errors.
 * @param axiosError the api-error-response that should be handled.
 * @param options for the error-handler
 */
export function handleAPIErrorResponse<T>(
  axiosError: AxiosError<APIErrorResponse>,
  options: ApiErrorHandlerOptions<T>
) {
  if (!axiosError.response) return;
  const { data } = axiosError.response;
  const { errors } = data;

  errors.forEach((error: APIError) => {
    if (options.helpers && error.field) {
      options.helpers.setFieldError(error.field, error.message);
    } else {
      notifyError(error, options.notify);
    }
  });
}
