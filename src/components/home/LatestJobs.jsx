import Link from "next/link";
import React from "react";
import LatestJobCard from "../LatestJobCard";

const LatestJobs = ({ allJobs }) => {
  return (
    <div className="max-w-5xl mx-auto text-center my-20">
      <h1 className="text-4xl font-bold text-[#757575]">
        <span className="text-[#FF7043]">Latest</span>{" "}
        <span>
          and Top <span className="text-[#FF7043]">Jobs</span>
        </span>{" "}
        Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {allJobs?.length
          ? allJobs?.slice(0, 6).map((job) => (
              <Link href={`/findjobs/${job?.id}`} key={job.id}>
                <LatestJobCard job={job} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default LatestJobs;
