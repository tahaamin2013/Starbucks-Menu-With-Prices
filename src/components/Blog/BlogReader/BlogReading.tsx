import { allBlogs } from "contentlayer/generated";
const BlogDetails = lazy(() => import("../BlogDetails"));
const RenderMdx = lazy(() => import("../RenderMdx"));
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Slash } from "lucide-react";
import { lazy } from "react";
import Product from "../../StarbucksProduct/Product";
import { Menu } from "@/lib/menuItems";
import Link from "next/link";

const BlogReading = ({ parmy, blogy }: { parmy: any; blogy: any }) => {
  const blog = allBlogs.find(
    (blog: any) => blog._raw.flattenedPath === parmy.slug
  );

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
    return name.toLowerCase().replace(/ /g, "-");
  };

  const categoryUrl = toUrlFriendly(category);

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
          <h1 className="capitalize sm:text-3xl md:text-4xl lg:text-5xl text-3xl font-bold ">
            {blog.title}
          </h1>
          <BlogDetails blog={blogy} slug={parmy.slug} />
        </div>
        <div className="flex gap-1 mx-1 md:gap-7 text-left">
          <div className="flex flex-col gap-7 md:flex-row">
            <div className="flex flex-col gap-[50px] px-3">
              <Product productName={blog.ProductName} />
             {/* Ads Section */}
             <div id="ads-section"className="hidden md:flex flex-col  gap-[100px]">
             <Link href="/add-page" className="bg-blue-600 text-white w-[240px] justify-center text-center flex items-center font-bold text-3xl h-[400px]">Ads Space <br /> 	240x400</Link>
             <Link href="/add-page" className="bg-blue-600 text-white w-[240px] justify-center text-center flex items-center font-bold text-3xl h-[400px]">Ads Space <br /> 	240x400</Link>
             </div>
             </div>
            <div className="w-full">
              <RenderMdx blog={blogy} />
              <Link href="/add-page" className="bg-blue-600 md:hidden text-white mt-9 w-[240px] justify-center text-center flex items-center font-bold text-3xl h-[400px]">Ads Space <br /> 	240x400</Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogReading;
