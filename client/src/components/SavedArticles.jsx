import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { useState, useEffect, useRef } from "react";
import Heart from "react-animated-heart";

const SavedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [SavedArticles, setSavedArticles] = useState([]);
    const [value, setValue] = useState("");
    const { id } = useParams();

    useEffect(() => {
        // Make the GET request when the component mounts
        axios
            .get(`/articles/articles/`)
            .then((res) => {
                // Update the state with the retrieved Articles data
                setArticles(res.data);
                setSavedArticles(res.data.slice(0, 3));
                console.log(res.data);
            })
            .catch((e) => console.log(e));
    }, [value]); // The effect will re-run whenever 'value' changes

    const handleLikeClick = (articleId) => {
        const savedArticles = articles.map((article) => {
            if (article._id === articleId) {
                return { ...article, liked: !article.liked };
            }
            return article;
        });
        setArticles(savedArticles);
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
            <div className="  relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
                <div className="py-5 px-5 flex-auto ">
                    <div className="tab-content tab-space">
                        <div className="flex justify-around items-center flex-col-reverse gap-10 ">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-10 lg:px-6 w-[900px]">
                                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#6C1770] md:text-5xl lg:text-6xl ">
                                        Your Favorite Articles
                                    </h1>
                                    <p className="font-light text-white sm:text-xl ">
                                        Find interesting articles created by our
                                        community
                                    </p>
                                </div>

                                <div className=" grid gap-8 lg:grid-cols-1 h-70 max-h-[800px] rounded-xl  ">
                                    {SavedArticles.map((article) => (
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
                                                {article.text?.slice(1, 150)}
                                            </p>
                                            <div className="flex justify-between items-end ">
                                                <div className="flex items-end space-x-4">
                                                    <img
                                                        className="w-10 h-10 rounded-full"
                                                        src={
                                                            article.createdBy
                                                                .avatar
                                                        }
                                                        alt="Profile Picture"
                                                    />
                                                    <span className="font-medium ">
                                                        {
                                                            article.createdBy
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
                                                            isClick={true}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedArticles;
