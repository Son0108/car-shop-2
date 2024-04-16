import * as Yup from "yup";
import axios, { AxiosError } from "axios";

export interface APIError {
  code: string;
  developerMessage?: string;
  errorType?: string | null;
  field?: string | null;
  message: string;
}

export interface APIErrorResponse {
  errors: APIError[];
  path: string;
}

// Validation schema of the APIError interface
const APIErrorValidationSchema = Yup.object().shape({
  code: Yup.string().required(),
  developerMessage: Yup.string().optional(),
  errorType: Yup.string().nullable().optional(),
  field: Yup.string().nullable().optional(),
  message: Yup.string().required(),
});

// Validation schema of the APIErrorResponse interface
const APIErrorResponseValidationSchema = Yup.object().shape({
  errors: Yup.array().of(APIErrorValidationSchema).required(),
  path: Yup.string().required(),
});

/**
 * Validate an object if it fits the schema of an APIErrorResponse object.
 * @param payload
 */
function isAPIErrorResponse(payload: any): payload is APIErrorResponse {
  return APIErrorResponseValidationSchema.isValidSync(payload);
}

/**
 * Validate if an error is an axios-error containing an APIErrorResponse object
 * @param payload
 */
export function isAPIError(
  payload: any
): payload is AxiosError<APIErrorResponse> {
  return (
    axios.isAxiosError(payload) && isAPIErrorResponse(payload.response?.data)
  );
}
