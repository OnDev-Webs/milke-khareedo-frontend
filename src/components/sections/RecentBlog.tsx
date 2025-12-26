'use client';

import { useState } from 'react';
import BlogCard from "../cards/BlogCard";
import BlogImg from "@/assets/blog.png";
import Heading from "../typography/heading";
import { Button } from "../ui/button";

const RecentBlog = () => {
    const blogData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [visibleCount, setVisibleCount] = useState(3);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const visibleBlogs = blogData.slice(0, visibleCount);
    const hasMore = visibleCount < blogData.length;

    return (
        <>
            <section className="py-[30px] md:py-[50px]">
                <div className="container mx-auto px-4 md:px-0">
                    <div className="mb-[34px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <Heading className="text-black">Recent Blogs</Heading>
                        <Button variant={'ghost'} className="rounded-[110px] text-base border border-[#F5F5F5] py-[13px] px-[30px] md:text-base">View All</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mt-4">
                    {visibleBlogs.map((_, i) => (
                        <BlogCard
                            key={i}
                            image={BlogImg}
                            date="Wed 12 Jan, 2025"
                            title="Lorem Ipsum is simply dummy text"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                            buttonText="Read More"
                            href="/blogs/1"
                        />
                    ))}
                    </div>
                    {hasMore && (
                        <Button variant={'ghost'} onClick={handleLoadMore} className="mt-8 text-base rounded-[110px] border border-[#F5F5F5] py-[13px] px-[30px] flex mx-auto">Load More</Button>
                    )}
                </div>
            </section>
        </>
    )
}

export default RecentBlog;