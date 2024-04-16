function envVariableToStringArray(value?: string): string[] | undefined {
  if (!value) return undefined;
  return value.split(",");
}

function envVariableToNumber(value?: string): number | undefined {
  if (!value) return undefined;
  return parseInt(value, 10);
}

export const ACCEPTED_IMAGE_FORMATS = envVariableToStringArray(
  process.env.NEXT_PUBLIC_ACCEPTED_IMAGE_FORMATS
) || ["image/jpg", "image/jpeg", "image/png"];

export const ACCEPTED_FILE_FORMATS = envVariableToStringArray(
  process.env.NEXT_PUBLIC_ACCEPTED_FILE_FORMATS
) || ["image/jpg", "image/jpeg", "image/png"];

export const MAXIMUM_FILE_SIZE =
  envVariableToNumber(process.env.NEXT_PUBLIC_MAXIMUM_FILE_SIZE) ||
  2 * 1024 ** 2;
