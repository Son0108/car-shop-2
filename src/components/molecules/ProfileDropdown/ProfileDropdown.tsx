import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import clsx from "clsx";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { User } from "../../../definitions/types/models/User";
import { NavigationItem } from "../Navbar/NavbarItem";
import Link from "../../atoms/Link/Link";

interface ProfileDropdownProps {
  /**
   * navigation-items shown in the dropdown
   */
  items?: NavigationItem[];
  /**
   * src of the image
   */
  src: string;
  /**
   * currently active user
   */
  user: User;
}

const ProfileDropdown = ({ items = [], src, user }: ProfileDropdownProps) => {
  const { t } = useTranslation();

  return (
    <Menu as="div" className="ml-3 relative flex-shrink-0">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="bg-primary-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
              <span className="sr-only">{t("common:avatarMenu.open")}</span>
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <Image
                  className="object-cover bg-white"
                  alt={`${user.firstName} ${user.lastName}`}
                  src={src}
                  height={64}
                  width={64}
                  unoptimized
                />
              </div>
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {items.map((item) => (
                <Menu.Item key={item.href}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={clsx(
                        active && "bg-gray-100",
                        "block py-2 px-4 text-sm hover:text-black hover:bg-gray-50"
                      )}
                    >
                      {item.text}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
