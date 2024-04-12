"use client";

import React from "react";
import { Image, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

export const NavigationNavbar = ({ }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="bg-black">
            <NavbarBrand>
                <Link className="text-white mt-2" href="/">
                    <Image src="/images/logo.jpg" alt="logo" width={90} height={50} />
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden md:flex gap-4" justify="center">
                <NavbarItem >
                    <Link className="text-white hover:bg-white hover:text-black rounded-lg p-2" href="/">
                        Trang chủ
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Dropdown className="bg-black">
                        <DropdownTrigger>
                            <a
                                className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                Thể loại
                            </a>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem href="/car" className="text-white hover:bg-white hover:text-black rounded-lg p-2" key="new">Ô tô</DropdownItem>
                            <DropdownItem href="/motor" className="text-white hover:bg-white hover:text-black rounded-lg p-2" key="copy">Xe máy</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white hover:bg-white hover:text-black rounded-lg p-2" href="/guar">
                        Bảo hành
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white hover:bg-white hover:text-black rounded-lg p-2" href="/info">
                        Giải đáp
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white hover:bg-white hover:text-black rounded-lg p-2" href="/contact">
                        Liên hệ
                    </Link>
                </NavbarItem>
            </NavbarContent>


            <NavbarMenu className="bg-[#a1a1a1] w-full">
                <NavbarItem>
                    <Link className="text-white w-full hover:bg-white hover:text-black rounded-lg p-2 m-auto" href="/">
                        Trang chủ
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white w-full hover:bg-white hover:text-black rounded-lg p-2" href="/car">
                        Ô tô
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white w-full hover:bg-white hover:text-black rounded-lg p-2" href="/motor">
                        Xe máy
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white w-full hover:bg-white hover:text-black rounded-lg p-2" href="/guar">
                        Bảo hành
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white w-full hover:bg-white hover:text-black rounded-lg p-2" href="/info">
                        Giải đáp
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="text-white w-full hover:bg-white hover:text-black rounded-lg p-2" href="/contact">
                        Liên hệ
                    </Link>
                </NavbarItem>
            </NavbarMenu>
            <NavbarContent className="md:hidden text-white" justify="end">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>
        </Navbar>
    )
}