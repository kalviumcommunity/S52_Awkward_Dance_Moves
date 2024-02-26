import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

function Profile({ data, dance, getUserData }) {
  useEffect(() => {
    getUserData();
  }, []);

  const userEmail = data.email;
  const userPost = dance.filter((post) => {
    return post.email === userEmail; // Added return statement
  });

  return (
    <div className="  ">
      <div>
        <div className=" w-full pt-5 text-white h-screen">
          <div className="">
            {data && (
              <div className="">
                <img
                  className="h-40 ml-5 w-40 rounded-full "
                  loading="lazy"
                  src={
                    data &&
                    `data:${data.profile.contentType};base64,${Buffer.from(
                      data.profile.data.data
                    ).toString("base64")}`
                  }
                  alt="Profile"
                />
                <h1 className="  ml-5 mt-5 text-3xl font-bold ">
                  {data.firstName} {data.lastName}
                </h1>
                <h1 className=" ml-5 mt-4 text-xl font-semibold">
                  @{data.userName}
                </h1>
                <h1 className=" ml-5 mt-4 font-light text-xl">
                  Location {data.location}
                </h1>
                <h1 className=" ml-5 mt-4  w-1/2 font-medium tetx-xl">
                  {data.bio}
                </h1>
                <div className="flex flex-col mt-10">
                  <div className=" w-full h-10 border flex justify-center items-center border-x-0 border-y-white">
                    <h1 className=" text-2xl">Post</h1>
                  </div>
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {userPost.map((post, index) => {
                      return (
                        <Link
                          to={`/update/${post._id}`}
                          key={index}
                          className="relative"
                        >
                          <img
                            className=" border-b border-r h-52 md:h-72 w-auto px-3"
                            src={post.dance_gif}
                            alt=""
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
