import Image from "next/image";
import { PencilIcon, XIcon } from "@heroicons/react/solid";
import { ChangeEventHandler } from "react";
import clsx from "clsx";
import IconButton from "../../Button/IconButton/IconButton";
import { BaseInputPropsWithoutLabel } from "../shared/Input.shared";

export interface ImageFilePreviewProps extends BaseInputPropsWithoutLabel {
  handleChange: ChangeEventHandler;
  /**
   * Src of the preview
   */
  src: string;
  /**
   * Callback to unset the current value
   */
  unsetCallback?: { (): void };
}

const ImageFilePreview = ({
  disabled,
  handleChange,
  id,
  name,
  required,
  tabIndex,
  src,
  unsetCallback,
}: ImageFilePreviewProps) => (
  <div className="relative w-full flex flex-col rounded-md overflow-hidden">
    <Image
      className="relative object-cover"
      width={600}
      height={450}
      src={src}
      unoptimized
    />
    <label
      htmlFor={id}
      className={clsx(
        "absolute bottom-2 right-2 p-2",
        "flex items-center justify-center text-sm font-medium",
        "bg-white rounded-full cursor-pointer"
      )}
    >
      <PencilIcon className="h-6 w-6" />
      <input
        className="sr-only absolute inset-0 w-full h-full cursor-pointer"
        disabled={disabled}
        id={id}
        name={name}
        onChange={handleChange}
        required={required}
        tabIndex={tabIndex}
        type="file"
      />
    </label>
    {unsetCallback && (
      <div className="absolute top-2 right-2">
        <IconButton onClick={unsetCallback} variant="rounded">
          <XIcon className="h-4 w-4" />
        </IconButton>
      </div>
    )}
  </div>
);

export default ImageFilePreview;
