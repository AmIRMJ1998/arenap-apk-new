"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


import useModalLogin from "@hooks/useModalLogin";
import { useRouter } from "next/navigation";

import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import ButtonElement from "@elements/ButtonElement";
import useUserInfo from "@hooks/useUserInfo";
import BottomNavigation from "@modules/menu/BottomNavigation";
import cn from "@utils/clsxFun";
import { getUrlImage } from "@/services/getImageUrl/getImageUrl";
import ArticleCardPrimary from "@modules/cards/Articles/ArticleCardPrimary";
import ModalLogin from "@layouts/ModalLogin/ModalLogin";
import SwiperContainerFreeMode from "@modules/swiper/SwiperContianerFreeMode";
import { ArticleCardType, AutohrCardType } from "@/types/cards";
import LinkElement from "@elements/LinkElement";
import bestAuthors from "@data/bestAuthors";
import articleData from "@data/articleData";

const BlogDetailesPage = (props: { slug: string }) => {
  const { slug } = props
  const router = useRouter()
  const { openModalLogin } = useModalLogin()
  const articles: ArticleCardType[] = [...articleData];
  const physicians = [...bestAuthors]

  const [article, setArticle] = useState<ArticleCardType | undefined>({
    id: "",
    title: "",
    description: [""],
    image: "",
    author: "",
    date: "",
    speciality: "",
  });


  useEffect(() => {
    // const article = articles.find
    if (!articles.find((item) => item.id === slug)) router.replace(`/blog`)
    {
      setArticle(articles?.find((item: ArticleCardType) => item.id === slug));
    }
  }, []);

  const { isLogin } = useUserInfo();
  const [comment, setComment] = useState("");


  const data = {
    userName: "سینا شاکری",
    userProfile: "/Doctor.jpg",
    month: "",
    dayOfMonth: "",
    comment:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و ",
  };


  return (
    <>
      <TitlePagesMobile title={article?.title ? article.title : ""} />
      <ModalLogin  />
      <div className=" mt-4 max-w-[118.75rem] w-full">
        <div className="bg-white rounded-sm p-2 flex justify-start items-center flex-wrap gap-2 w-full">
          <LinkElement
            link={`blog`}
            className="text-primary flex justify-start items-center gap-2"
          >
            بلاگ
            <svg
              width="10"
              height="16"
              className={cn("",)}
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 1L1.5 8L8.5 15"
                stroke="#008582"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </LinkElement>
          <button
            type="button"
            className="bg-[#F0FFFE] text-primary  h-[2.1875rem] rounded-3xl text-center px-3"
          >
            {article?.title}
          </button>
        </div>
      </div>
      <section className=" max-w-[118.75rem] w-full   mt-4 mx-0 flex justify-between items-start md:gap-4   md:pb-5">
        <div className="md:w-8/12 max-w-full">
          <BlogCard blog={article} />
          <div className="bg-white rounded-sm mt-4 shadow-shadow_category p-5">
            <div className="pb-3 font-bold">هشتگ ها</div>
            <div className="w-full flex justify-start items-start flex-wrap gap-5 ">
              <Link href={"/"} className="text-link text-md">
                # گوارش
              </Link>
              <Link href={"/"} className="text-link text-md">
                # گوارش
              </Link>
              <Link href={"/"} className="text-link text-md">
                # گوارش
              </Link>
              <Link href={"/"} className="text-link text-md">
                # گوارش
              </Link>
              <Link href={"/"} className="text-link text-md">
                # گوارش
              </Link>
            </div>
          </div>
          <div className="mt-4 max-w-full md:hidden">
            <p className="font-bold mb-3">پزشکان  پیشنهادی در این حیطه:</p>
            <SwiperContainerFreeMode data={physicians} gap={10} CardComponent={PhysicianCard} />
          </div>
          <div className="mt-4 max-w-full md:hidden">
            <p className="font-bold mb-3">مقالات مرتبط:</p>
            <SwiperContainerFreeMode data={articles} gap={10} CardComponent={ArticleCardPrimary} />
          </div>
          {/* <div className="bg-white rounded-sm mt-4 shadow-shadow_category p-5">
            <div className="pb-3 font-bold">نظرات کاربران</div>
            <BlogCommentCard {...data} />
            <BlogCommentCard {...data} />
            <BlogCommentCard {...data} />
            <BlogCommentCard {...data} />
          </div> */}
          <div className="bg-white rounded-sm mt-4 shadow-shadow_category p-5">
            <div className="pb-3 font-bold flex justify-start items-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 10.015C0 4.74712 4.21 0 10.02 0C15.7 0 20 4.65699 20 9.98498C20 16.1642 14.96 20 10 20C8.36 20 6.54 19.5593 5.08 18.698C4.57 18.3876 4.14 18.1572 3.59 18.3375L1.57 18.9384C1.06 19.0986 0.6 18.698 0.75 18.1572L1.42 15.9139C1.53 15.6034 1.51 15.2729 1.35 15.0125C0.49 13.4301 0 11.6975 0 10.015ZM8.7 10.015C8.7 10.7261 9.27 11.2969 9.98 11.307C10.69 11.307 11.26 10.7261 11.26 10.025C11.26 9.31397 10.69 8.74311 9.98 8.74311C9.28 8.7331 8.7 9.31397 8.7 10.015ZM13.31 10.025C13.31 10.7261 13.88 11.307 14.59 11.307C15.3 11.307 15.87 10.7261 15.87 10.025C15.87 9.31397 15.3 8.74311 14.59 8.74311C13.88 8.74311 13.31 9.31397 13.31 10.025ZM5.37 11.307C4.67 11.307 4.09 10.7261 4.09 10.025C4.09 9.31397 4.66 8.74311 5.37 8.74311C6.08 8.74311 6.65 9.31397 6.65 10.025C6.65 10.7261 6.08 11.2969 5.37 11.307Z"
                  fill="#5B5F5E"
                />
              </svg>
              ثبت نظر
            </div>
            <div>
              {isLogin === "authorization" ? (
                <div>
                  <p className="font-bold text-md">محتوای نظر</p>
                  <textarea
                    name="comment"
                    cols={30}
                    rows={10}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-gray-100 w-full rounded-sm mt-4 p-2"
                    placeholder={"متن را وارد کنید"}
                  ></textarea>
                  <div className="mt-4">
                    <ButtonElement
                      typeButton="primary"
                    >
                      ثبت نظر
                    </ButtonElement>
                  </div>
                </div>
              ) : (
                <div
                  className=" font-bold cursor-pointer "
                  onClick={openModalLogin}
                >
                  <p>
                    جهت ثبت نظر ابتدا
                    <span className="text-primary"> از اینجا وارد </span>
                    شوید
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <aside className="hidden md:block w-4/12">
          <BlogAsideCard physicians={physicians} />
        </aside>
      </section>
      <BottomNavigation route={"blog"} />
    </>
  );
};

export default BlogDetailesPage;

const BlogCard = ({ blog }: { blog: ArticleCardType | undefined }) => {
  
  return (
    <div className="p-8 rounded-sm bg-white shadow-shadow_category">
      <div>
        <Image
          src={`/${blog?.image}.jpg`}
          width={800}
          height={800}
          className="w-full "
          alt="Doctor_image"
        />
      </div>
      <p className="my-4 font-bold">{blog?.title}</p>
      <div className="p-4 flex justify-start items-stretch  gap-2 rounded-sm bg-[#EFF4FF] ">
        <div className="min-w-[3.4375rem] h-[3.4375rem] rounded-full border border-gray-300  ">
          <Image
            src={"/doctor.jpg"}
            width={500}
            height={500}
            className="w-full h-full rounded-full"
            alt="Doctor_image"
          />
        </div>
        <div className="w-full flex justify-between items-stretch flex-col ">
          <div className="text-sm flex justify-between items-center w-full">
            <p>
              نویسنده :{" "}
              <span className="text-sm text-[#235FA6]">{blog?.author}</span>
            </p>
            <span>انتشار: {blog?.date}</span>
          </div>
          <p className="text-xs text-gray-450">{blog?.speciality} </p>
        </div>
      </div>
      <p className="mt-4 flex justify-start items-start flex-col gap-4">
        {blog?.description}
      </p>
    </div>
  );
};

export const BlogAsideCard = ({ physicians }: { physicians: AutohrCardType[] }) => {
  const articles = [...articleData];

  return (
    <div className="flex flex-col max-w-full w-full gap-4">
      <div className="flex flex-col bg-white rounded-sm shadow-shadow_category p-3">
        <div className="w-full mb-8">
          <ButtonElement
            disabled={true}
            typeButton="primary"
          >
            مقالات مرتبط
          </ButtonElement>
        </div>
        {articles.splice(0, 4).map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-100 last:border-none w-full "
          >
            <LinkElement
              link={`blog/${item.id}`}
              className={cn(
                `p-4 flex justify-between items-start flex-col  bg-white rounded-sm w-full`)}
            >
              <div className="">
                <div className="flex items-center gap-5">
                  <div className="rounded-sm overflow-hidden w-1/3">
                    <Image
                      src={`/${item.image}.jpg`}
                      width={300}
                      height={300}
                      alt="article_pic"
                    />
                  </div>
                  <div className="w-2/3">
                    <p className="text-md font-bold py-2">{item.title}</p>

                    <div className="w-full flex justify-between items-center text-sm text-gray-500 mt-2">
                      <p>{item.author}</p>
                      <p>{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </LinkElement>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-white rounded-sm p-3">
        <div className="w-full mb-8">
          <ButtonElement
            disabled={true}
            typeButton="primary"
          >
            پزشکان  پیشنهادی در این حیطه
          </ButtonElement>
        </div>
        {physicians.map((item: AutohrCardType) => (
          <LinkElement
            link={`${item.link}`}
            key={item.id}
          >
            <div className="flex min-w-[3.5rem] justify-between py-3 border-b border-gray-100">
              <Image
                src={item.hasImage ? getUrlImage(item.id) : "/noImage.jfif"}
                alt="physician_profile"
                width={300}
                height={300}
                className="size-[3.5rem] rounded-full"
              />
              <div className="flex flex-col justify-between items-start py-1 w-[calc(100%-105px)]">
                <p className="text-sm font-bold text-right">{`دکتر ${item.physicianName}`}</p>
                <p className="text-sm short-text-1">
                  {item.speciality}
                </p>
              </div>
              <div className="self-end py-1">
                <p className="text-primary text-sm font-bold">ثبت نوبت</p>
              </div>
            </div>
          </LinkElement>
        ))}
      </div>
    </div>
  );
};

const PhysicianCard = (props: AutohrCardType) => {

  return (
    <Link
      href={`${props.link}`}
    >
      <div className="bg-white rounded-sm p-3 flex flex-col gap-2 items-center max-w-full w-[10.625rem]">
        <Image
          src={
            props.hasImage ? getUrlImage(props.id) : "/noImage.jfif"
          }
          alt="physician_profile"
          width={300}
          height={300}
          className="size-[4.0625rem] rounded-full"
        />
        <p className="font-bold">{`دکتر ${props.physicianName}`}</p>
        <div className="text-md short-text-1">
          {props.speciality}
        </div>
        <div className="w-full">
          <ButtonElement
            typeButton="primary"
          >
            ثبت نوبت
          </ButtonElement>
        </div>
      </div>
    </Link>
  )
}