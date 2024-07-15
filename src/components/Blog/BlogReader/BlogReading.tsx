"use client";
import { allBlogs } from "contentlayer/generated";
const RenderMdx = dynamic(() => import("../RenderMdx"), {
  ssr: false,
});
const BlogDetails = dynamic(() => import("../BlogDetails"), {
  ssr: false,
});
const ProfileSection = dynamic(() => import("../../ProfileSection"), {
  ssr: false,
});
import { Menu } from "@/lib/menuItems";
const Product = dynamic(() => import("../../StarbucksProduct/Product"), {
  ssr: false,
});

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Slash } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import dynamic from "next/dynamic";

const BlogReading = ({ parmy, blogy }: { parmy: any; blogy: any }) => {
  const blog = allBlogs.find(
    (blog: any) => blog._raw.flattenedPath === parmy.slug
  );

  const [showMore, setShowMore] = useState(false);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Find the category of the blog
  const findCategory = () => {
    for (let menu of Menu) {
      for (let item of menu.items) {
        for (let subItem of item.subItems) {
          for (let product of subItem.products) {
            if (product.name === blog.ProductName) {
              return item.name; // Return the item name (sub-category name)
            }
          }
        }
      }
    }
    return "Unknown Category"; // Default if category not found
  };

  const category = findCategory();

  // Function to convert category name to URL-friendly format
  const toUrlFriendly = (name: string) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[®™,.\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const categoryUrl = toUrlFriendly(category);

  // Function to toggle the visibility of tags and ad section
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayedTags = showMore ? blogy.tags : blogy.tags.slice(0, 3); // Show only the first 3 tags initially

  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${categoryUrl}`}>{category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.ProductName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mb-20 mt-[20px] flex items-center justify-center flex-col text-center">
        <div className="w-full lg:w-[1000px] mb-2 text-center">
          <div className="mx-3 mb-2 flex w-full justify-center items-center flex-col  text-slate-400 font-bold">
            <div className="flex flex-wrap justify-center items-center gap-x-5 max-w-3xl">
              {displayedTags.map((tag: string, index: number) => (
                <span key={index}>#{tag} </span>
              ))}
            </div>
            {blogy.tags.length > 3 && (
              <button onClick={toggleShowMore} className="text-primary ml-2">
                {showMore ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <h1 className="capitalize sm:text-3xl md:text-4xl lg:text-5xl text-3xl font-bold">
            {blog.title}
          </h1>
          <BlogDetails blog={blogy} slug={parmy.slug} />
        </div>
        <div className="flex gap-1 mx-10 md:gap-3 text-left">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex flex-col gap-[30px] px-3">
              <Product productName={blog.ProductName} />
              <motion.div
                id="ads-section"
                className={`hidden md:flex flex-col gap-[100px]`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }} // Delayed animation for smoother transition
              >
                <ProfileSection />
              </motion.div>
            </div>
            <RenderMdx blog={blogy} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogReading;
