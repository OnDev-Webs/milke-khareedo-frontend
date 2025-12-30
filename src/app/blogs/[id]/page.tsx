"use client";

import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Heading from "@/components/typography/heading";
import Image from "next/image";
import ContactForm from "@/components/home/contact-us/ContactForm";
import RecentBlog from "@/components/sections/RecentBlog";
import React from "react";
import { homeService } from "@/lib/api/services/home.service";
import type { BlogDetail, Blog } from "@/lib/api/services/home.service";
import Link from "next/link";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = React.use(params);
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog detail
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await homeService.getBlogById(unwrappedParams.id);
        console.log("Blog detail response:", response);
        if (response.success && response.data) {
          // The API returns data directly as BlogDetail
          setBlog(response.data);
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    };

    if (unwrappedParams.id) {
      fetchBlog();
    }
  }, [unwrappedParams.id]);

  // Fetch recent blogs for sidebar
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      setIsLoadingRecent(true);
      try {
        const response = await homeService.getBlogs({
          page: 1,
          limit: 5, // Get 5 recent blogs for sidebar
        });
        if (response.success && response.data) {
          const blogsArray = Array.isArray(response.data) ? response.data : [];
          // Exclude current blog from recent blogs
          const filtered = blogsArray.filter(
            (b) => b._id !== blog?._id && b.slug !== unwrappedParams.id,
          );
          setRecentBlogs(filtered.slice(0, 3)); // Show only 3 in sidebar
        }
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      } finally {
        setIsLoadingRecent(false);
      }
    };

    fetchRecentBlogs();
  }, [blog?._id, unwrappedParams.id]);

  if (isLoading) {
    return (
      <section className="py-[30px]">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Loading blog...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="py-[30px]">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="text-red-500">{error || "Blog not found"}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-[30px]">
        <div className="container mx-auto">
          <Breadcrumb className="mb-[25px]">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-normal text-[18px]">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/blogs"
                  className="font-normal text-[18px]"
                >
                  Blogs
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#1C4692] font-semibold text-[18px]">
                  Blog Detail
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Heading variant={"h4"} className="font-medium mb-4">
            {blog.title}
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
            {/* Main Content - Left Side (2 columns) */}
            <div className="lg:col-span-2">
              <div className="w-full inline-flex flex-col justify-start items-start gap-10">
                {/* Banner Image */}
                <div className="relative w-full h-80 rounded-[30px] overflow-hidden">
                  <Image
                    alt={blog.title}
                    src={blog.bannerImage}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Gallery Images */}
                {blog.galleryImages && blog.galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {blog.galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-full h-48 rounded-[20px] overflow-hidden"
                      >
                        <Image
                          alt={`${blog.title} - Gallery ${index + 1}`}
                          src={image}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="self-stretch flex flex-col justify-start items-start gap-7">
                  <div className="self-stretch flex flex-col justify-start items-start gap-3.5">
                    {/* Date */}
                    <p className="text-black text-xl font-medium">
                      {blog.date}
                    </p>

                    <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>

                    {/* Blog Content - HTML Rendering */}
                    {blog.content && (
                      <div
                        className="self-stretch justify-start text-zinc-500 text-lg font-medium leading-8 blog-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side (1 column) */}
            <div className="lg:col-span-1">
              <div className="flex flex-col gap-5">
                {/* Get in Touch Form */}
                <div className="border border-[#F3F3F3] rounded-[30px] p-5 bg-white">
                  <h6 className="text-[26px] font-bold text-black mb-[5px]">
                    Get in Touch
                  </h6>
                  <p className="text-black text-base font-medium mb-[25px]">
                    Let our experts help you answer your questions
                  </p>
                  <ContactForm />
                </div>

                {/* Recent Posts Section */}
                <div className="border border-[#F3F3F3] rounded-[30px] p-5 bg-white">
                  <h6 className="text-[26px] font-bold text-black mb-5">
                    Recent Posts
                  </h6>
                  {isLoadingRecent ? (
                    <div className="text-gray-500 text-sm">Loading...</div>
                  ) : recentBlogs.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {recentBlogs.map((recentBlog) => (
                        <Link
                          key={recentBlog._id}
                          href={`/blogs/${recentBlog.slug}`}
                          className="group"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="relative w-full h-32 rounded-xl overflow-hidden">
                              <Image
                                src={recentBlog.bannerImage}
                                alt={recentBlog.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-neutral-400 text-xs font-medium">
                                {recentBlog.date}
                              </span>
                              <h4 className="text-black text-base font-semibold line-clamp-2 group-hover:text-[#1C4692] transition-colors">
                                {recentBlog.title}
                              </h4>
                              <p className="text-neutral-700 text-sm font-medium leading-5 line-clamp-2">
                                {recentBlog.subtitle}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No recent posts</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Blogs Section at Bottom */}
          <RecentBlog excludeBlogId={blog._id} excludeSlug={blog.slug} />
        </div>
      </section>
    </>
  );
};

export default Page;
