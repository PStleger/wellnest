import { Link, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { useState, useEffect } from "react";

const PublicArticles = () => {
  const [articles, setArticles] = useState([]);
  const [value, setValue] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Make the GET request when the component mounts
    axios
      .get(`/articles/articles/`)
      .then((res) => {
        // Update the state with the retrieved Articles data
        setArticles(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [value]); // The effect will re-run whenever 'value' changes

  return (
    <div>
      <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
        <div className="py-5 px-5 flex-auto ">
          <div className="tab-content tab-space">
            <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
              <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                <h2 className="text-[#6C1770] text-2xl py-6">Articles</h2>

                <ol>
                  <div className="gridItem flex items-center justify-center gap-2 flex-wrap lg:mx-16">
                    {articles.map((article) => (
                      <li key={article.timestamps}>
                        <Link
                          to={`/publicarticles/${article._id}`}
                          className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#D19976] via-[#CF974E] to-[#ECE5A9]"></span>
                          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#ECE5A9] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                          <span className="relative text-white text-center">
                            <p>{article.title}</p>
                            <p className="text-xs hidden lg:inline-flex">{article.description}</p>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </div>
                </ol>
                <Link
                  to="../articles/new"
                  className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                  <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative text-white">Add Article</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicArticles;
