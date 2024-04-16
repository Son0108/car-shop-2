import Image from "next/image";
import { useMemo } from "react";
import clsx from "clsx";
import { DEFAULT_AVATAR } from "../../../config/constants/placeholders";

type AvatarSize = "xs" | "sm" | "md" | "lg";

interface AvatarProps {
  size?: AvatarSize;
  src?: string;
  unoptimized?: boolean;
}

const Avatar = ({
  size = "md",
  src = DEFAULT_AVATAR,
  unoptimized,
}: AvatarProps) => {
  const resolution = useMemo(() => {
    switch (size) {
      case "lg":
        return 128;
      case "sm":
        return 48;
      case "xs":
        return 32;
      default:
        return 64;
    }
  }, [size]);

  return (
    <Image
      className={clsx("object-cover rounded-full")}
      height={resolution}
      width={resolution}
      src={src}
      unoptimized={unoptimized}
    />
  );
};

export default Avatar;
