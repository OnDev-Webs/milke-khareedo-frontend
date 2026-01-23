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
import Loader from "@/components/ui/loader";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const getCategoryName = (category?: string | { name: string }) => {
  if (!category) return "";
  return typeof category === "string" ? category : category.name;
};

type CommentType = {
  _id: string;
  content: string;
  createdAt: string;

  author: {
    id: string;
    name: string;
    profileImage?: string;
  };

  likedBy: string[];
  replies: CommentType[];
};

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const normalizeComment = (c: any): CommentType => ({
    ...c,
    likedBy: c.likedBy ?? [],
    replies: (c.replies ?? []).map(normalizeComment),
  });

  useEffect(() => {
    const user = localStorage.getItem("auth_user");
    if (user) {
      setCurrentUserId(JSON.parse(user).id);
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("wealthcon_auth_token");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await homeService.getBlogById(unwrappedParams.id);
        if (res.success && res.data) {
          setBlog(res.data);
        } else {
          setError("Blog not found");
        }
      } catch {
        setError("Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    };

    if (unwrappedParams.id) fetchBlog();
  }, [unwrappedParams.id]);

  useEffect(() => {
    if (!blog?._id) return;
    homeService
      .getBlogComments(blog._id)
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setComments(res.data.map(normalizeComment));
        } else {
          setComments([]);
        }
      })
      .catch(() => setComments([]));
  }, [blog?._id]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      setIsLoadingRecent(true);
      try {
        const res = await homeService.getBlogs({ page: 1, limit: 5 });
        if (res.success && Array.isArray(res.data)) {
          setRecentBlogs(
            res.data.filter(
              (b) => b._id !== blog?._id && b.slug !== unwrappedParams.id
            ).slice(0, 3)
          );
        }
      } finally {
        setIsLoadingRecent(false);
      }
    };
    fetchRecentBlogs();
  }, [blog?._id, unwrappedParams.id]);

  const submitComment = async () => {
    const text = replyTo ? replyText : commentText;
    if (!text.trim() || !blog?._id) return;
    try {
      setIsCommentLoading(true);
      const payload: any = {
        content: text,
      };
      if (replyTo) {
        payload.parentComment = replyTo;
      }
      const res = await homeService.addBlogComment(blog._id, payload);
      if (res.success && res.data) {
        const newComment = normalizeComment(res.data);
        if (replyTo) {
          setComments(prev =>
            prev.map(c =>
              c._id === replyTo ? { ...c, replies: [...c.replies, newComment] } : c
            )
          );
          setReplyTo(null);
          setReplyText("");
        } else {
          setComments(prev => [newComment, ...prev]);
          setCommentText("");
        }
      }
    } finally {
      setIsCommentLoading(false);
    }
  };

  const toggleLike = async (commentId: string) => {
    if (!isLoggedIn || !currentUserId) return;
    try {
      const res = await homeService.toggleCommentLike(commentId);
      if (!res.success || !res.data) return;
      const { likedBy } = res.data;
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, likedBy, } : c
        )
      );
    } catch (err) {
      console.error("Like toggle failed", err);
    }
  };

  const isCommentLiked = (likedBy: string[] | undefined) => {
    if (!currentUserId) return false;
    return (likedBy ?? []).includes(currentUserId);
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader size={38} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="py-20 text-center text-red-500">
        {error || "Blog not found"}
      </div>
    );
  }

  return (
    <section className="py-[30px]">
      <div className="max-w-6xl mx-auto container px-4 sm:px-6">
        <Breadcrumb className="mb-[25px]">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="font-normal text-[18px]">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs" className="font-normal text-[18px]">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#1C4692] font-semibold text-[18px]">Blog Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Heading variant={"h4"} className="font-medium text-[18px] md:text-[30px] mb-4">
          {blog.title}
        </Heading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-4">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-4 justify-between px-2">
              {getCategoryName(blog.category) && (
                <span className="px-4 py-1.5 text-[14px] font-semibold bg-[#1C4692]/10 text-[#1C4692] border border-[#1C4692]/20 rounded-full">
                  {getCategoryName(blog.category)}
                </span>
              )}

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 5).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-[14px] font-semibold bg-gray-100 text-gray-700 border border-gray-200 rounded-full">
                      #{tag}
                    </span>
                  ))}

                  {blog.tags.length > 5 && (
                    <span className="px-3 py-1.5 text-[14px] font-semibold text-gray-500">
                      +{blog.tags.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="w-full inline-flex flex-col justify-start items-start gap-10">
              <div className="relative w-full h-80 rounded-[30px] overflow-hidden">
                <Image
                  alt={blog.title}
                  src={blog.bannerImage}
                  fill
                  className="object-cover"
                />
              </div>

              {blog.galleryImages && blog.galleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  {blog.galleryImages.map((image, index) => (
                    <div key={index} className="relative w-full h-48 rounded-[20px] overflow-hidden">
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
                  <p className="text-[16px] text-[#6B7280]">
                    <span className="font-semibold text-[#111827]">
                      {blog.updatedAt ? "Updated on" : "Published on"}
                    </span>
                    <span className="ml-1 font-medium">
                      {blog.date}
                    </span>
                  </p>
                  <div className="self-stretch h-0 outline-1 outline-offset-[-0.50px] outline-neutral-200"></div>
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

          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <div className="border border-[#F3F3F3] rounded-[30px] py-5 px-10 bg-white">
                <h6 className="text-[26px] font-bold text-black mb-[5px]">
                  Get in Touch
                </h6>
                <p className="text-black text-base font-medium mb-[25px]">
                  Let our experts help you answer your questions
                </p>
                <ContactForm nameMode="full" />
              </div>
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="mt-14 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          {!isLoggedIn && (
            <p className="text-sm text-red-500">
              Please <Link href="/login">login</Link> to comment.
            </p>
          )}

          {isLoggedIn && (
            <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full bg-white p-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1C4692]"
                placeholder="Share your thoughts..."
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={submitComment}
                  disabled={isCommentLoading}
                  className="px-6 py-2 bg-[#1C4692] text-white rounded-full text-sm hover:opacity-90">
                  {isCommentLoading ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          )}

          {comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}

          {comments.map((c) => (
            <div className="bg-white border border-gray-200 rounded-xl p-6   mb-4 hover:shadow-sm transition">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[18px]">{c.author.name}</p>
                <span className="text-[14px] font-medium text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="mt-2">{c.content}</p>
              
              {isLoggedIn && (
                <button onClick={() => toggleLike(c._id)} className="mt-2 flex items-center gap-1">
                  {isCommentLiked(c.likedBy) ? (
                    <IoHeart size={18} className="text-red-500" />
                  ) : (
                    <IoHeartOutline size={18} className="text-gray-600" />
                  )}
                  <span className="text-sm text-gray-600">
                    {c.likedBy?.length ?? 0}
                  </span>
                </button>
              )}

              {isLoggedIn && (
                <button onClick={() => setReplyTo(c._id)} className="mt-2 mb-4 text-xs text-gray-500 hover:text-blue-600 transition">
                  Reply
                </button>
              )}

              {replyTo === c._id && (
                <div className="mt-2 ml-6 border-l-2 border-[#1C4692] pl-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1C4692]"
                    placeholder={`Reply to ${c.author.name}...`}
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={submitComment} className="px-4 py-1.5 text-sm bg-[#1C4692] text-white rounded-md">
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyTo(null);
                        setReplyText("");
                      }}
                      className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {c.replies.length > 0 && (
                <div className="ml-6 mt-4 space-y-4 border-l-2 border-gray-200 pl-4">
                  {c.replies.map((r) => (
                    <div key={r._id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{r.author.name}</p>
                        <span className="text-xs text-gray-400">
                          {new Date(r.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {r.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <RecentBlog excludeBlogId={blog._id} excludeSlug={blog.slug} />
      </div>
    </section>
  );
}
