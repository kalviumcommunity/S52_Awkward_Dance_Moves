import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import Twitter from "../assets/Twitter.png";

function Content({ dance }) {
  const [loader, setLoader] = useState(true);
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Shuffle the mergedData array
  const shuffledData = [...mergedData]; // Create a copy to avoid modifying originalData
  shuffleArray(shuffledData);
  console.log(shuffledData);

  useEffect(() => {
    axios
      .get("https://api-rxwj.onrender.com/dance/getAllUser")
      .then((res) => {
        setData(res.data);
        setLoader(false); // Move this inside the promise resolve to hide loader when data arrives
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Loading = () => {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-white">
        <img className="w-20 h-20" src={Twitter} alt="" />
        <h1>Loading....😁😁😁</h1>
      </div>
    );
  };

  return (
    <div className="text-white">
      {!loader ? (
        <div>
          <div className="pt-2 pb-2 bg-black bg-opacity-70 backdrop-blur-sm sticky top-0 flex justify-center items-center">
            <h1>For You</h1>
          </div>

          <div className="bg-scroll">
            {shuffledData.map((data, id) => (
              <div
                className="p-3 flex min-h-96 border-gray-500 border-b w-full"
                key={id}
              >
                <div>
                  <img
                    className="w-14 h-14 rounded-full "
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

                <div className="flex flex-col w-4/5 ml-3">
                  <h1 className="font-semibold">{data.userName}</h1>
                  <h1 className="mb-2"> {data.comments}</h1>
                  <img
                    className="mb-4 min-h-[300px] max-w-4/5 max-h-[600px] rounded-md "
                    src={data.dance_gif}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>{Loading()}</div>
      )}
    </div>
  );
}

export default Content;
