import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";

const SharePost = () => {
  return (
    <>
      <div className="mt-11 flex flex-wrap gap-4 md:items-center md:justify-between md:gap-0">
        <ul className="flex items-center gap-6">
          <li>
            <p className="text-black dark:text-white">Share On:</p>
          </li>
          <li>
            <a href="#" aria-label="share on facebook">
              <Facebook className="h-6 w-6 text-[#D1D8E0] transition-all duration-300 hover:text-primary" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="share on twitter">
              <Twitter className="h-6 w-6 text-[#D1D8E0] transition-all duration-300 hover:text-primary" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="share on linkedin">
              <Linkedin className="h-6 w-6 text-[#D1D8E0] transition-all duration-300 hover:text-primary" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="share link">
              <Share2 className="h-6 w-6 text-[#D1D8E0] transition-all duration-300 hover:text-primary" />
            </a>
          </li>
        </ul>

        <ul className="flex items-center gap-4">
          <li>
            <p className="text-black dark:text-white">Tags:</p>
          </li>
          <li>
            <a
              href="#"
              className="pr-2 duration-300 ease-in-out hover:text-primary"
            >
              #business
            </a>

            <a href="#" className="duration-300 ease-in-out hover:text-primary">
              #saas
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SharePost;
