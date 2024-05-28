"use client"


import cn from "@utils/clsxFun";

import LinkElement from "@/components/elements/LinkElement";

// import useAuth from "@/hooks/useAuth";

import HomeIcon from "@icons/menu/HomeIcon";
import BlogIcon from "@icons/menu/BlogIcon";
import MagnifierIcon from "@icons/menu/MagnifierIcon";
import ProfileIcon from "@icons/menu/ProfileIcon";
import useUserInfo from "@/hooks/useUserInfo";

const BottomNavigation = ({ route }: { route: string }) => {

    const { isLogin, user } = useUserInfo()

    return (
        <div className="fixed bottom-0 left-0 w-full h-[4.875rem] bg-white flex justify-between items-center flex-row-reverse mdSecondary:hidden px-8 z-[5] shadow-shadow_bottom_nav">
        {/* Home button */}
        <LinkElement
                link={``}
                className={cn(
                    `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                    {
                        "text-primary font-bold": route === "home",
                        "text-black font-normal": route !== "home",
                    }
                )}
            >
                <span>صفحه اصلی</span>
                <span>
                    <HomeIcon active={route === "home"} />{" "}
                </span>
            </LinkElement>
            {/* Blog button */}
            <LinkElement
                link={`blog`}
                className={cn(
                    `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                    {
                        "text-primary font-bold": route === "blog",
                        "text-black font-normal": route !== "blog",
                    }
                )}
            >
                <span>بلاگ</span>
                <span>
                    <BlogIcon active={route === "blog" ? true : false} />
                </span>
            </LinkElement>

            {/* Search button */}
            <LinkElement
                link={`physicians`}
                className={cn(
                    `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                    {
                        "text-primary font-bold": route === "physicians",
                        "text-black font-normal": route !== "physicians",
                    }
                )}
            >
                <span>جستجو</span>
                <span>
                    <MagnifierIcon active={route === "physicians" ? true : false} />
                </span>
            </LinkElement>
            {/* if authorization === true profile button else login button */}

            
            {isLogin === "authorization" ? (
                <LinkElement
                    link={`profile`}

                    className={cn(
                        `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                        {
                            "text-primary font-bold": route === "profile",
                            "text-black font-normal": route !== "profile",
                        }
                    )}
                >
                    {/* <span>{user.lastName}</span>
                     */}
                    <span>حساب کاربری</span>

                    <span>
                        <ProfileIcon active={route === "profile"} />
                    </span>
                </LinkElement>
            ) : (
                <LinkElement
                    link={`login`}
                    className={cn(
                        `flex justify-center items-center gap-1 flex-col-reverse text-sm `,
                        {
                            "text-primary font-bold": route === "login",
                            "text-black font-normal": route !== "login",
                        }
                    )}
                >
                    <span>ثبت نام/ورود</span>
                    <span>
                        <ProfileIcon active={route === "login" ? true : false} />
                    </span>
                </LinkElement>
            )}
        </div>
    );
};

export default BottomNavigation;
