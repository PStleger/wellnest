import { Link, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { useState, useEffect, useRef } from "react";
import Heart from "react-animated-heart";

const PublicArticles = () => {
  const [articles, setArticles] = useState([]);
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    // Filter articles based on selected category
    const filteredArticles = filterArticles();

    // Filter the filtered articles based on the search input value
    const searchFilteredArticles = filteredArticles.filter(
      (article) =>
        article.text?.toLowerCase().includes(value.toLowerCase()) ||
        article.title?.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(searchFilteredArticles);
  }, [value, selectedCategory, articles]);

  const handleLikeClick = (articleId) => {
    const updatedArticles = articles.map((article) => {
      if (article._id === articleId) {
        return { ...article, liked: !article.liked };
      }
      return article;
    });
    setArticles(updatedArticles);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const filterArticles = () => {
    if (selectedCategory === "All") {
      return articles; // Display all articles when "All" is selected
    } else {
      return articles.filter(
        (article) => article.description === selectedCategory
      );
    }
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


    return (
        <div>
            <div className="  relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
                <div className="py-5 px-5 flex-auto ">
                    <div className="tab-content tab-space">
                        <div className="flex justify-around items-center flex-col-reverse gap-10 ">
                            <div className="  h-auto w-1/2 xl:w-2/3 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#6C1770] md:text-5xl lg:text-6xl ">
                                            Inspiration and Subjects of Interest
                                        </h1>
                                        <p className="font-light text-white sm:text-xl ">
                                            Find interesting articles created by
                                            our community
                                        </p>
                                    </div>
                                    <form>
                                        <div className="flex gap-4 mb-20">
                                            <div
                                                className="flex flex-col gap-4 relative"
                                                ref={dropdownRef}
                                            >
                                                <button
                                                    id="dropdown-button"
                                                    onClick={toggleDropdown}
                                                    className="h-[52px] max-h-[52px] flex-shrink-0 w-36 z-50 flex flex-col items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100"
                                                    type="button"
                                                >
                                                    All categories
                                                    <svg
                                                        className={`   w-2.5 h-2.5 ml-2.5 ${
                                                            isOpen
                                                                ? "transform rotate-180"
                                                                : ""
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
                                                    className={`absolute z-10 ${
                                                        isOpen
                                                            ? "block"
                                                            : "hidden"
                                                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 top-16 left-0 `}
                                                >
                                                    <ul
                                                        className="py-2 text-sm text-gray-700  "
                                                        aria-labelledby="dropdown-button"
                                                    >
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "All"
                                                                    )
                                                                }
                                                            >
                                                                All
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "Mindfulness"
                                                                    )
                                                                }
                                                            >
                                                                Mindfulness
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "Meditation"
                                                                    )
                                                                }
                                                            >
                                                                Meditation
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "CBT"
                                                                    )
                                                                }
                                                            >
                                                                CBT
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "Breathwork"
                                                                    )
                                                                }
                                                            >
                                                                Breathwork
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "Yoga"
                                                                    )
                                                                }
                                                            >
                                                                Yoga
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "Motivational"
                                                                    )
                                                                }
                                                            >
                                                                Motivational
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                                                onClick={() =>
                                                                    setSelectedCategory(
                                                                        "Holistic"
                                                                    )
                                                                }
                                                            >
                                                                Holistic
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="relative w-full">
                                                <input
                                                    type="search"
                                                    id="search-dropdown"
                                                    className="block p-2.5 h-[52px] max-h-[52px] w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                                    placeholder="Search articles.."
                                                    value={value}
                                                    onChange={(e) =>
                                                        setValue(e.target.value)
                                                    }
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    className="absolute flex justify-center items-center h-[52px] max-h-[52px] top-0 right-0 p-2.5 text-sm font-medium  text-white bg-[#8C1960] rounded-r-lg border w-12 hover:bg-[#D9466F] focus:ring-4 focus:outline-none focus:ring-[D9466F]"
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
                                                    <span className="sr-only">
                                                        Search
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className=" grid gap-8 lg:grid-cols-1 overflow-y-scroll h-70 max-h-[800px] rounded-xl  ">
                                        {searchResults.map((article) => (
                                            <article
                                                key={article._id}
                                                className={` border-t-8 p-6 bg-white rounded-lg shadow-md ${getBorderColorClass(
                                                    article.description
                                                )}`}
                                            >
                                                <div className="flex justify-between items-center mb-5 text-gray-500">
                                                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
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
                                                    <span className="text-sm">
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                                    <Link
                                                        to={`/publicarticles/${article._id}`}
                                                    >
                                                        {article.title}
                                                    </Link>
                                                </h2>
                                                <p className="mb-5 font-light text-gray-500 ">
                                                    {article.text?.slice(
                                                        1,
                                                        500
                                                    )}
                                                </p>
                                                <div className="flex justify-between items-end ">
                                                    <div className="flex items-end space-x-4">
                                                        <img
                                                            className="w-10 h-10 rounded-full"
                                                            src={
                                                                article
                                                                    .createdBy
                                                                    .avatar
                                                            }
                                                            alt="Profile Picture"
                                                        />
                                                        <span className="font-medium ">
                                                            {
                                                                article
                                                                    .createdBy
                                                                    ?.userName
                                                            }
                                                        </span>
                                                    </div>
                                                    <a
                                                        href="#"
                                                        className="inline-flex items-end font-medium text-primary-600  hover:underline"
                                                    >
                                                        <div className="flex justify-end items-end -mb-10">
                                                            <Heart
                                                                isClick={
                                                                    article._id ===
                                                                    "64f5d6987e123737f83ce9a8"
                                                                        ? article.liked ||
                                                                          true
                                                                        : article.liked ||
                                                                          false
                                                                }
                                                                onClick={() =>
                                                                    handleLikeClick(
                                                                        article._id
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <Link
                                                            to={`/publicarticles/${article._id}`}
                                                            className="flex justify-center items-center"
                                                        >
                                                            Read More
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
                                                            </svg>{" "}
                                                        </Link>
                                                    </a>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="  relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
        <div className="py-5 px-5 flex-auto ">
          <div className="tab-content tab-space">
            <div className="flex justify-around items-center flex-col-reverse gap-10 ">
              <div className="  h-auto w-1/2 xl:w-2/3 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                  <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
                      Inspiration and Subjects of Interest
                    </h1>
                    <p className="font-light text-gray-500 sm:text-xl ">
                      Find interesting articles created by our community
                    </p>
                  </div>
                  <form>
                    <div className="flex gap-4 mb-20">
                      <div
                        className="flex flex-col gap-4 relative"
                        ref={dropdownRef}
                      >
                        <button
                          id="dropdown-button"
                          onClick={toggleDropdown}
                          className="h-[52px] max-h-[52px] flex-shrink-0 w-36 z-50 flex flex-col items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-100"
                          type="button"
                        >
                          All categories
                          <svg
                            className={`   w-2.5 h-2.5 ml-2.5 ${
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
                          className={`absolute z-10 ${
                            isOpen ? "block" : "hidden"
                          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 top-16 left-0 `}
                        >
                          <ul
                            className="py-2 text-sm text-gray-700  "
                            aria-labelledby="dropdown-button"
                          >
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => setSelectedCategory("All")}
                              >
                                All
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() =>
                                  setSelectedCategory("Mindfulness")
                                }
                              >
                                Mindfulness
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() =>
                                  setSelectedCategory("Meditation")
                                }
                              >
                                Meditation
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => setSelectedCategory("CBT")}
                              >
                                CBT
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() =>
                                  setSelectedCategory("Breathwork")
                                }
                              >
                                Breathwork
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => setSelectedCategory("Yoga")}
                              >
                                Yoga
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() =>
                                  setSelectedCategory("Motivational")
                                }
                              >
                                Motivational
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                                onClick={() => setSelectedCategory("Holistic")}
                              >
                                Holistic
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="relative w-full">
                        <input
                          type="search"
                          id="search-dropdown"
                          className="block p-2.5 h-[52px] max-h-[52px] w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                          placeholder="Search articles.."
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          required
                        />
                        <button
                          type="submit"
                          className="absolute flex justify-center items-center h-[52px] max-h-[52px] top-0 right-0 p-2.5 text-sm font-medium  text-white bg-[#8C1960] rounded-r-lg border w-12 hover:bg-[#D9466F] focus:ring-4 focus:outline-none focus:ring-[D9466F]"
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
                  <div className=" grid gap-8 lg:grid-cols-1 overflow-y-scroll h-70 max-h-[800px] rounded-xl  ">
                    {searchResults.map((article) => (
                      <article
                        key={article._id}
                        className={` border-t-8 p-6 bg-white rounded-lg shadow-md ${getBorderColorClass(
                          article.description
                        )}`}
                      >
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
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
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                          <Link to={`/publicarticles/${article._id}`}>
                            {article.title}
                          </Link>
                        </h2>

                        <p
        dangerouslySetInnerHTML={{
          __html:
            articles &&
            (article.text
              ? article.text.slice(0, 75) +
                (article.text.length > 75 ? '...' : '')
              : ''),
        }}
      />

                        <div className="flex justify-between items-end ">
                          <div className="flex items-end space-x-4">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={article.createdBy.avatar}
                              alt="Profile Picture"
                            />
                            <span className="font-medium ">
                              {article.createdBy?.userName}
                            </span>
                          </div>
                          <a
                            href="#"
                            className="inline-flex items-end font-medium text-primary-600  hover:underline"
                          >
                            <div className="flex justify-end items-end -mb-10">
                              <Heart
                                isClick={article.liked || false}
                                onClick={() => handleLikeClick(article._id)}
                              />
                            </div>
                            <Link
                              to={`/publicarticles/${article._id}`}
                              className="flex justify-center items-center"
                            >
                              Read More
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
                              </svg>{" "}
                            </Link>
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
