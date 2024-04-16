import { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import Heading from "../../../atoms/Heading/Heading";
import Styles from "../LayoutStyles.module.css";

export interface CardLayoutProps {
  children?: ReactNode;
  title?: string;
}

const CardLayout = ({ children, title }: CardLayoutProps) => (
  <div className="relative min-h-screen-80 w-full flex pt-8 md:pt-0 items-start md:items-center justify-center">
    <div className="relative z-20">
      <div className="p-4 mx-auto flex flex-col items-center space-y-6">
        <div className="w-1/3">
          <Image
            className="object-contain"
            src="/logos/axara-white_horizontal.png"
            alt="logo"
            height={400}
            width={600}
            loading="eager"
          />
        </div>
        {title && (
          <Heading as="h1" variant="h2" className="text-white text-center">
            {title}
          </Heading>
        )}
        <div className="w-full md:max-w-lg">{children}</div>
      </div>
    </div>
    <div
      className={clsx(
        "fixed inset-0 h-screen w-full z-10 bg-gray-800",
        Styles.backgroundWithShapes
      )}
    />
  </div>
);

export default CardLayout;
