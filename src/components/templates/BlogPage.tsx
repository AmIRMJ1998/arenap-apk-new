"use client";
import React, { useState } from "react";
import TitlePagesMobile from "@modules/titles/TitlePagesMobile";
import BottomNavigation from "@modules/menu/BottomNavigation";
import ButtonElement from "@elements/ButtonElement";
import SearchIcon from "@icons/SearchIcon";
import TitlePrimary from "@modules/titles/TitlePrimary";
import ArticleCardSecondary from "@modules/cards/Articles/ArticleCardSecondary";
import articleData from "@/data/articleData";
import BestSpeciality from "@modules/BestSpeciality";
import bestAuthors from "@/data/bestAuthors";
import TitleHeading from "@modules/titles/TitleHeading";
import { ArticleCardType } from "@/types/cards";

const BlogPage = () => {

    const [search, setSearch] = useState("");
    const articles = [...articleData];
    const authors = [...bestAuthors]



    return (
        <>
            <TitlePagesMobile title={"بلاگ آرناپ"} />
            <div className=" max-w-[118.75rem]  ">
                {/* search section */}
                <header className="mt-4 md:rounded-sm md:shadow-shadow_blog md:h-[12.5rem] flex justify-center items-center ">
                    <div className="w-full ">
                        <TitleHeading title="بلاگ پزشکی آرناپ" /> 
                        <div className="md:w-[24.0625rem] mx-auto mt-4  h-[3.125rem]  w-full bg-white rounded-3xl p-[5px] flex justify-between items-center">
                            <input
                                type="text"
                                className="flex-1 h-full px-1 text-md placeholder:text-gray-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={"جستجو"}
                            />
                            <ButtonElement width={"w-[3.75rem]"} typeButton="primary">
                                <SearchIcon />
                            </ButtonElement>
                        </div>
                    </div>
                </header>
                {/* ----------section------------- */}
                {/* best speciality */}
                <section className="mt-6">
                    <BestSpeciality />
                </section>
                {/* ----------section------------- */}
                {/* ----------section------------- */}
                {/* new blogs */}
                <section className="mt-6">
                    <div className="py-3">
                        <TitlePrimary
                            title={"جدیدترین پست ها"}
                            btn={true}
                            textLink={"مشاهده بیشتر"}
                        />
                    </div>
                    <div className="grid gird-cols-1 md:grid-cols-2 gap-2">
                        {articles.map((article : ArticleCardType) => (
                            <ArticleCardSecondary
                                key={article.id}
                                link={`blog?title=${article.id}`}
                                title={article.title}
                                author={article.author}
                                description={article.description}
                                image={article.image}
                                date={article.date}
                            />
                        ))}
                    </div>
                </section>
                {/* ----------section------------- */}
                {/* ----------section------------- */}
                {/* new blogs */}
                <section className="mt-6">
                    <div className="py-3">
                        <TitlePrimary
                            title={"جدیدترین پست ها"}
                            btn={true}
                            textLink={"مشاهده بیشتر"}
                        />
                    </div>
                    <div className="grid gird-cols-1 md:grid-cols-2 gap-2">
                        {articles.splice(2, 4).map((article) => (
                            <ArticleCardSecondary
                                key={article.id}
                                link={`blog/${article.id}`}
                                title={article.title}
                                author={article.author}
                                description={article.description}
                                image={article.image}
                                date={article.date}
                            />
                        ))}
                    </div>
                </section>
                {/* ----------section------------- */}
                {/* ----------section------------- */}
                {/* best authors */}
                {/* <section className="my-6 ">
                    <div className="py-3">
                        <TitlePrimary title={"برترین نویسندگان"} btn={false} />
                        <SwiperContainerFreeMode data={authors} CardComponent={AuthorCard} gap={10} />
                    </div>
                </section> */}
                {/* ----------section------------- */}
            </div>
            <BottomNavigation route={"blog"} />
        </>
    );
};

export default BlogPage;
