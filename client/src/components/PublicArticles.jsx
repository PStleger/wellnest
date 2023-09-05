import { Link, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { useState, useEffect } from "react";
import Heart from "react-animated-heart";
import placeholder from "./images/placeholder.png";
import placeholder1 from "./images/placeholder1.png";
import placeholder2 from "./images/placeholder2.png";
import placeholder3 from "./images/placeholder3.png";

const PublicArticles = () => {
  const [articles, setArticles] = useState([]);
  const [value, setValue] = useState("");
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

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

    const handleLikeClick = (articleId) => {
        const updatedArticles = articles.map((article) => {
            if (article._id === articleId) {
                return { ...article, liked: !article.liked };
            }
            return article;
        });
        setArticles(updatedArticles);
    };
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Implement your filtering logic here based on the selected category
    // You can update your list of articles based on the selected category.
    // For this example, let's just log the selected category.
    console.log(`Filtering by category: ${category}`);
  };

  return (
    <div>
      <div className=" relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
        <div className="py-5 px-5 flex-auto ">
          <div className="tab-content tab-space">
            <div className="flex justify-around items-center flex-col-reverse gap-10 ">
              <div className="  h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                  <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                      Inspiration and Subjects of Interest
                    </h1>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                      Find interesting articles created by our community
                    </p>
                  </div>
                  <form>
                    <div className="flex">
                      <label
                        htmlFor="search-dropdown"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Your Email
                      </label>

                      <button
                        id="dropdown-button"
                        onClick={toggleDropdown}
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        type="button"
                      >
                        All categories
                        <svg
                          className={`w-2.5 h-2.5 ml-2.5 ${
                            isOpen ? "transform rotate-180" : ""
                          }`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      <div
                        id="_id"
                        className={`z-10 ${
                          isOpen ? "block" : "hidden"
                        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Mindfulness
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Meditation
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              CBT
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Breathwork
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Yoga
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Motivational
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Holistic
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="relative w-full">
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                          placeholder="Search Mockups, Logos, Design Templates..."
                          required
                        />
                        <button
                          type="submit"
                          className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                          <span className="sr-only">Search</span>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className=" grid gap-8 lg:grid-cols-1 overflow-y-auto h-70   ">
                    {articles.map((article) => (
                      <article
                        key={article._id}
                        className={` border-t-8 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ${getBorderColorClass(
                          article.description
                        )}`}
                      >
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                            <svg
                              className="mr-1 w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                            </svg>
                            {article.description}
                          </span>
                          <span className="text-sm">{article.date}</span>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          <a href="#">{article.title}</a>
                        </h2>
                        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                          {article.text}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <img
                              className="w-7 h-7 rounded-full"
                              src={article.createdBy.avatar}
                              alt="Profile Picture"
                            />
                            <span className="font-medium dark:text-white">
                              {article.createdBy?.userName}
                            </span>
                          </div>
                          <a
                            href="#"
                            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                          >
                            <div className="App">
                              <Heart
                                isClick={article.liked || false}
                                onClick={() => handleLikeClick(article._id)}
                              />
                            </div>
                            <Link to={`/publicarticles/${article._id}`}>
                              Read More
                            </Link>
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                                <Link
                                    to="../journals/new"
                                    className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                    <span className="relative text-white">
                                        Add Article
                                    </span>
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
