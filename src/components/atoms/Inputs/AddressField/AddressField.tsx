import { useField } from "formik";
import HelperText from "../shared/HelperText/HelperText";
import { IAddressCreate } from "../../../../definitions/types/models/Address";
import TextField from "../TextField/TextField";
import Label from "../shared/Label/Label";

/**
 * Values handled by the AddressField component
 */
export interface IAddressFieldValue {
  street: string;
  postCode: string;
  city: string;
}

/**
 * Props definition of the AddressField component
 */
export interface AddressFieldProps {
  name: string;
  id?: string;
  label?: string;
  subLabels?: IAddressCreate;
  placeholder?: IAddressCreate;
  disabled?: boolean;
  required?: boolean;
}

const AddressField = ({
  id,
  name,
  disabled,
  label,
  placeholder,
  subLabels,
  required,
}: AddressFieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, meta] = useField(name);
  return (
    <div>
      <fieldset>
        {label && (
          <legend>
            <Label content={label} required={required} />
          </legend>
        )}
        <div className="flex flex-col space-y-2">
          <div className="flex">
            <div className="flex-grow">
              <TextField
                disabled={disabled}
                required={required}
                name={`${name}.street`}
                id={id && `${id}-street`}
                placeholder={placeholder?.street}
                labelSrOnly
                label={subLabels?.street}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-1/4 min-w-0">
              <TextField
                disabled={disabled}
                required={required}
                name={`${name}.postCode`}
                id={id && `${id}-postCode`}
                placeholder={placeholder?.postCode}
                labelSrOnly
                label={subLabels?.postCode}
              />
            </div>
            <div className="flex-grow min-w-0">
              <TextField
                disabled={disabled}
                required={required}
                name={`${name}.city`}
                id={id && `${id}-city`}
                placeholder={placeholder?.city}
                labelSrOnly
                label={subLabels?.city}
              />
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <TextField
              disabled={disabled}
              required={required}
              name={`${name}.country`}
              id={id && `${id}-country`}
              placeholder={placeholder?.country}
              labelSrOnly
              label={subLabels?.country}
            />
          </div>
        </div>
      </fieldset>
      {meta.touched && Boolean(meta.error) && (
        <HelperText id={id} error={Boolean(meta.error)}>
          {meta.error}
        </HelperText>
      )}
    </div>
  );
};

export default AddressField;
