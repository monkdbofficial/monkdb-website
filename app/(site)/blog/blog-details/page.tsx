// "use client";

// import RelatedPost from "@/components/Blog/RelatedPost";
// import SharePost from "@/components/Blog/SharePost";
// import { Metadata } from "next";
// import Image from "next/image";
// import PDFViewer from "@/components/Blog/PDFViewer";
// import Link from "next/link";
// import { ArrowLeft, Clock, User, Folder } from "lucide-react";

// export const metadata: Metadata = {
//   title: "Blog Article | MONKDB",
//   description: "Professional and detailed blog article on MONKDB platform",
//   keywords: "MONKDB, blog, article, professional content",
//   openGraph: {
//     title: "Blog Article | MONKDB",
//     description: "Professional and detailed blog article on MONKDB platform",
//     type: "article",
//     publishedTime: "2023-07-30T00:00:00Z",
//     authors: ["John Doe"],
//   },
// };

// const SingleBlogPage = async () => {
//   return (
//     <main className="bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
//       <section className="py-16 md:py-20 lg:py-24">
//         <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
//           {/* Navigation */}
//           <div className="mb-8">
//             <Link
//               href="/blog"
//               className="inline-flex items-center gap-2 font-medium text-primary transition-all hover:text-primary/80"
//               aria-label="Return to blog listing"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               <span>Back to Articles</span>
//             </Link>
//           </div>

//           <div className="container mx-auto">
//             <article className="animate_top rounded-lg border border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-blacksection md:p-8">
//               {/* PDF Viewer */}
//               <div className="mb-8 w-full overflow-hidden rounded-md border border-stroke dark:border-strokedark">
//                 <PDFViewer pdfPath="/pdfs/sample.pdf" />
//               </div>

//               {/* Article Header */}
//               <header>
//                 <h1 className="mb-4 text-3xl font-bold text-black dark:text-white lg:text-4xl">
//                   Kobe Steel Plant: Industry Analysis and Future Outlook
//                 </h1>

//                 {/* Meta Information */}
//                 <ul className="mb-8 flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
//                   <li className="flex items-center gap-2">
//                     <User className="h-4 w-4" />
//                     <span className="font-medium">John Doe</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Clock className="h-4 w-4" />
//                     <time dateTime="2023-07-30">July 30, 2023</time>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Folder className="h-4 w-4" />
//                     <span>Industry Events</span>
//                   </li>
//                 </ul>
//               </header>

//               {/* Article Content */}
//               <div className="blog-content prose dark:prose-invert max-w-none">
//                 <p className="lead text-lg">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
//                   quis nibh lorem. Duis sed odio lorem. In a efficitur leo. Ut
//                   venenatis rhoncus quam sed condimentum.
//                 </p>

//                 <p>
//                   Aenean augue ex, condimentum vel metus vitae, aliquam porta
//                   elit. Quisque non metus ac orci mollis posuere. Mauris vel
//                   ipsum a diam interdum ultricies sed vitae neque. Nulla
//                   porttitor quam vitae pulvinar placerat. Nulla fringilla elit
//                   sit amet justo feugiat sodales.
//                 </p>

//                 {/* Image Gallery */}
//                 <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
//                   <figure className="overflow-hidden rounded-lg">
//                     <Image
//                       src="/images/blog/blog-01.png"
//                       width={600}
//                       height={400}
//                       alt="Steel manufacturing plant overview"
//                       className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                     <figcaption className="mt-2 text-sm text-gray-500">
//                       Fig.1 - Steel manufacturing plant overview
//                     </figcaption>
//                   </figure>
//                   <figure className="overflow-hidden rounded-lg">
//                     <Image
//                       src="/images/blog/blog-02.png"
//                       width={600}
//                       height={400}
//                       alt="Production line automation systems"
//                       className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                     <figcaption className="mt-2 text-sm text-gray-500">
//                       Fig.2 - Production line automation systems
//                     </figcaption>
//                   </figure>
//                 </div>

//                 <h2 className="text-2xl font-bold">
//                   Key Findings and Analysis
//                 </h2>

//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
//                   quis nibh lorem. Duis sed odio lorem. In a efficitur leo. Ut
//                   venenatis rhoncus quam sed condimentum. Curabitur vel turpis
//                   in dolor volutpat imperdiet in ut mi. Integer non volutpat
//                   nulla. Nunc elementum elit viverra, tempus quam non, interdum
//                   ipsum.
//                 </p>

//                 <blockquote className="border-l-4 border-primary pl-4 italic">
//                   The industrial revolution in steel manufacturing continues
//                   with advancements in automation and sustainable practices.
//                 </blockquote>

//                 <p>
//                   Aenean augue ex, condimentum vel metus vitae, aliquam porta
//                   elit. Quisque non metus ac orci mollis posuere. Mauris vel
//                   ipsum a diam interdum ultricies sed vitae neque.
//                 </p>
//               </div>

//               {/* Share Section */}
//               <footer className="mt-10 border-t border-stroke pt-8 dark:border-strokedark">
//                 <SharePost />
//               </footer>
//             </article>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SingleBlogPage;
