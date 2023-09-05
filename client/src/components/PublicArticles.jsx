import { Link, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { useState, useEffect } from "react";
import Heart from "react-animated-heart";

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

    return (
        <div>
            {/* testing */}

            {/* testing */}

            <div className=" relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
                <div className="py-5 px-5 flex-auto ">
                    <div className="tab-content tab-space">
                        <div className="flex justify-around items-center flex-col-reverse gap-10 ">
                            <div className="  h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                                    <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                                            Inspiration and Subjects of Interest
                                        </h2>
                                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                                            Find interesting articles created by
                                            our community
                                        </p>
                                    </div>

                                    <div className=" grid gap-8 lg:grid-cols-1  overflow-y-auto h-70   ">
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
                                                    <span className="text-sm">
                                                        {article.date}
                                                    </span>
                                                </div>
                                                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    <a href="#">
                                                        {article.title}
                                                    </a>
                                                </h2>
                                                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                                    {article.text}
                                                </p>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            className="w-7 h-7 rounded-full"
                                                            src={
                                                                article
                                                                    .createdBy
                                                                    .avatar
                                                            }
                                                            alt="Jese Leos avatar"
                                                        />
                                                        <span className="font-medium dark:text-white">
                                                            {
                                                                article
                                                                    .createdBy
                                                                    ?.userName
                                                            }
                                                        </span>
                                                    </div>
                                                    <a
                                                        href="#"
                                                        className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                                    >
                                                        <div className="App">
                                                            <Heart
                                                                isClick={
                                                                    article.liked ||
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
                                                        >
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
