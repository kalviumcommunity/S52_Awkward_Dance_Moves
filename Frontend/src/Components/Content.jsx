import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

function Content({ dance }) {
  const [data, setData] = useState([]);
  const mergedData = dance
    .map((feed) => {
      const userDataForFeed = data.find((user) => user.email === feed.email);
      if (userDataForFeed) {
        return {
          comments: feed.comments,
          dance_gif: feed.dance_gif,
          profile: userDataForFeed.profile,
          userName: userDataForFeed.userName,
        };
      } else {
        // Handle case where user data is not found
        return null; // or any other appropriate value
      }
    })
    .filter(Boolean); // Remove any null values from the resulting array
  useEffect(() => {
    axios
      .get("http://localhost:3000/dance/getAllUser")
      .then((res) => {
        // setUsers(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <div className="text-white">
      <div className="   pt-2 pb-2 bg-black bg-opacity-70 backdrop-blur-sm sticky top-0 flex justify-center items-center">
        <h1>For You</h1>
      </div>

      <div className=" bg-scroll">
        {mergedData.map((data, id) => (
          <div
            className="p-3 flex min-h-96 border-gray-500 border-b w-full"
            key={id}
          >
            <div>
              <img
                className="w-14 h-12 rounded-full "
                loading="lazy"
                src={
                  data &&
                  `data:${data.profile.contentType};base64,${Buffer.from(
                    data.profile.data.data
                  ).toString("base64")}`
                }
                alt="Profile"
              />
            </div>

            <div className="flex flex-col ml-3">
              <h1 className="font-semibold">{data.userName}</h1>
              <h1 className="mb-2"> {data.comments}</h1>
              <img
                className="mb-4 rounded-md w-4/5"
                src={data.dance_gif}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
