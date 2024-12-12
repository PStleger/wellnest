import { Link, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { useState, useEffect } from "react";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is 0-indexed
  const year = date.getFullYear() % 100; // Get the last two digits of the year

  return `${day}/${month}/${year}`;
}

const PublicArticleDetails = () => {
  const [articles, setArticles] = useState([]);
  const [value, setValue] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Make the GET request when the component mounts
    axios
      .get(`/articles/articles/${id}`)
      .then((res) => {
        // Update the state with the retrieved Articles data
        setArticles(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [value]); // The effect will re-run whenever 'value' changes

  function getBorderColorClass(articleDescription) {
    const colorMap = {
      Mindfulness: "border-red-500",
      Meditation: "border-blue-500",
      CBT: "border-green-500",
      Breathwork: "border-purple-500",
      Yoga: "border-yellow-500",
      Motivational: "border-orange-500",
      Holistic: "border-indigo-500",
    };

    return colorMap[articleDescription] || "border-gray-500"; // Default to gray if no match found
  }

  return (
    <div>
      <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
        <div className="py-5 px-5 flex-auto ">
          <div className="tab-content tab-space">
            <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
              <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                <h2 className="text-[#6C1770] text-2xl font-semibold pb-3">
                  {articles.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Published on {formatDate(articles.createdAt)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Created By {articles.createdBy?.userName}
                </p>

                <div className="mt-5 px-6 py-4 rounded-lg border border-white/20 dark:border-gray-600">
                  <p className="text-gray-700">{articles.text}</p>
                </div>

                {/* ADD ENTRY BUTTON */}
                <Link
                  to="../journals/new"
                  className="inline-block mt-6 bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:ring-2 hover:ring-purple-500 hover:bg-opacity-95 hover:transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  Add Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* testing */}

      {/* testing  */}
    </div>
  );
};

export default PublicArticleDetails;
