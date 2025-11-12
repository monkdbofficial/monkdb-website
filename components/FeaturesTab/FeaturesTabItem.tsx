import React from "react";
import { FeatureTab } from "@/types/featureTab";
import Image from "next/image";

const FeaturesTabItem = ({ featureTab }: { featureTab: FeatureTab }) => {
  const { title, desc1, desc2, image, imageDark } = featureTab;

  return (
    <>
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center lg:gap-19">
        <div className="w-full md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold text-black dark:text-white md:mb-7 md:text-3xl xl:text-sectiontitle2">
            {title}
          </h2>
          <p className="mb-4 text-sm md:mb-5 md:text-base">{desc1}</p>
          <p className="w-full text-sm md:w-11/12 md:text-base">{desc2}</p>
        </div>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[550px] md:aspect-[562/366] md:w-1/2">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src={imageDark}
            alt={title}
            fill
            className="hidden object-contain dark:block"
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesTabItem;
