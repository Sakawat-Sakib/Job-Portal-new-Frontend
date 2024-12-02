import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCard = ({ job }) => {
  return (
    <div className="h-48 px-7 py-4 rounded-lg text-[#757575] shadow-xl bg-white hover:outline-gray-400/80 hover:outline cursor-pointer">
      <div className="flex justify-between items-start h-28">
        <div className="flex flex-col items-center w-1/3">
          <h1 className="font-medium text-lg truncate w-full text-center">
            {job?.company?.name}
          </h1>
          <img src={job?.company?.logo || "/download.png"} className="w-24 h-24 object-contain brightness-130" alt="" />
        </div>
        <div className="w-2/3 pl-4">
          <h1 className="font-bold text-xl mb-2 truncate">{job?.title}</h1>
          <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <Badge className="bg-gray-200" variant={"secondary"}>
          {job?.position} positions
        </Badge>
        <Badge className="bg-gray-200" variant={"secondary"}>
          {job?.jobType}
        </Badge>
        <Badge className="bg-gray-200" variant={"secondary"}>
          {job?.salary} $
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
