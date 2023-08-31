import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/nestguy.png";
import userAvatar from "../assets/happyface.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { useContext } from "react";
import { Navigate } from "react-router";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Header = () => {
    const context = useContext(AuthContext);
    const location = useLocation();
    const navigation = [
        { name: "How It Works", href: "/howitworks", current: true },
        { name: "Get Inspired", href: "/getinspired", current: false },
        { name: "Resources", href: "/publicarticles", current: false },
    ];
    const updatedNavigation = navigation.map((item) => ({
        ...item,
        current: location.pathname === item.href,
    }));

    const handleLogout = () => {
        console.log("CONTEXT", context);
        context.logout();
        return <Navigate to="/" />;
    };
    console.log(context.user);
    return (
        <Disclosure
            as="nav"
            className="bg-white border-b-2 shadow-2xl shadow-[#8C1960]/50 h-fit min-h-[7rem] pt-5"
        >
            {({ open }) => (
                <>
                    <div className="mx-auto w-full max-w-8xl px-2 sm:px-6 lg:px-8 ">
                        <div className="relative flex h-16 items-center justify-between w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-[#8C1960] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                                <Link to="/dashboard">
                                    {" "}
                                    <div className="flex flex-shrink-0 items-center h-full mr-10">
                                        <img
                                            className="h-8 w-auto"
                                            src={logo}
                                            alt="WellNest logo"
                                        />
                                        <p className="text-2xl font-semibold text-[#8C1960] ml-2">
                                            WellNest
                                        </p>
                                    </div>
                                </Link>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex items-center space-x-4 gap-8 h-full">
                                        {updatedNavigation.map((item) => (
                                            <NavLink
                                                key={item.name}
                                                to={item.href}
                                                className={
                                                    "text-[#00335A] text-lg font-semibold " +
                                                    (item.current
                                                        ? "underline underline-offset-8"
                                                        : "hover:underline hover:underline-offset-8")
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-[#DFC6E0] p-1 text-slate-800 hover:text-[#8C1960] focus:outline-[#8C1960] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#8C1960]"
                                >
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        className="sm:w-8 sm:h-8 w-6 h-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Profile dropdown */}
                                {context.user ? (
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="relative flex rounded-full  text-sm  focus:ring-2 focus:ring-[#8C1960] sm:w-12 sm:h-12 w-8 h-8">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="sm:w-12 sm:h-12 w-8 h-8 rounded-full"
                                                    src={userAvatar}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <Link
                                                        to="/profile"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                    >
                                                        Your Profile
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link
                                                        to="/settings"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                    >
                                                        Settings
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link
                                                        to="/"
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        onClick={handleLogout}
                                                    >
                                                        Sign Out
                                                    </Link>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <button>Login</button>
                                )}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden ">
                        <div className="space-y-1 px-2 pb-3 pt-2 z-50 bg-white">
                            {updatedNavigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-[#8C1960] text-white block rounded-md px-3 py-2 text-base font-medium"
                                            : "hover:bg-[#8C1960]  hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Header;
