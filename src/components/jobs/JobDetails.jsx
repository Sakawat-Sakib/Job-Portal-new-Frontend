"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLocalStorage } from "@mantine/hooks";
import { applyJobHandler, createFavorite } from "@/actions/job";
import { toast } from "sonner";

const JobDetails = ({ singleJobById, jobId }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    setIsApplied(
      singleJobById?.Application?.some(
        (application) => application?.applicantId == user?.user?.id
      )
    );
  }, [user, singleJobById]);
  

  const applyJob = async () => {
    const res = await applyJobHandler(jobId, user?.token);

    if (res.success) {
      
      toast.success(res?.message);
    } else {
      toast.error(res.error);
    }
  };

  const addToFavorite = async () => {
    const result = await createFavorite(jobId, user?.token);
    if (result?.success) {
      toast.success(result?.message);
    } else {
      toast.error(result.error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between p-4 rounded-lg bg-white">
        <div>
          <h1 className="font-bold text-[#FF7043] text-xl">
            {singleJobById?.title}
          </h1>
          <div className="flex items-center gap-2 my-2">
            <Badge className="text-[#757575] font-bold" variant={"ghost"}>
              {singleJobById?.position} positions
            </Badge>
            <Badge className="text-[#757575] font-bold" variant={"ghost"}>
              {singleJobById?.jobType}
            </Badge>
            <Badge className="text-[#757575] font-bold" variant={"ghost"}>
              {singleJobById?.salary} $
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJob}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#FF7043] hover:bg-yellow-500 cursor-pointer"
          }`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="my-4 border-b-2 pb-1 text-[#FF7043] border-b-gray-300 font-semibold pl-2">
        Job Description
      </h1>
      <div className="mb-20 bg-white text-[#757575] flex items-center p-5 rounded-lg justify-around m-auto">
        <div className="flex flex-col gap-3">
          <h1 className=" my-1">
            Role: <span className="ml-2">{singleJobById?.title}</span>
          </h1>
          <h1 className=" my-1">
            Location: <span className="ml-2">{singleJobById?.location}</span>
          </h1>

          <h1 className=" my-1 ">
            Description: <span className="ml-2">{singleJobById?.description}</span>
          </h1>
          <h1 className=" my-1 ">
            Experience: <span className="ml-2">{singleJobById?.experienceLevel} years</span>
          </h1>
          <h1 className=" my-1 ">
            Salary: <span className="ml-2">{singleJobById?.salary} $</span>
          </h1>
          <h1 className=" my-1 ">
            Total Applicants: <span className="ml-2">{singleJobById?.applications?.length}</span>
          </h1>
          <h1 className=" my-1">
            Posted Date:{" "}
            <span className="ml-2">{singleJobById?.createdAt?.split("T")?.[0]}</span>
          </h1>
        </div>
        <div className="ml-5 flex flex-col justify-center gap-2 ">
          <img width={200} src={singleJobById?.company?.logo || "/download.png"} alt="" />
          <Button
            className="bg-[#FF7043] hover:bg-[#FF7043]/95 rounded-lg mt-4"
            onClick={addToFavorite}
          >
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
