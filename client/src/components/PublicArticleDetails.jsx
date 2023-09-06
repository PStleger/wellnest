import { Link, useParams, useNavigate } from "react-router-dom";
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
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const { id } = useParams();
    const navigate = useNavigate(); // Add useNavigate hook
    

    const handleDeleteArticle = () => {
        console.log("deletion is being handled");
        axios
            .delete(`/articles/deletearticle/${id}`)
            .then((res) => {
                console.log("Successfully deleted");
                navigate(`../articles`);
            })
            .catch((e) => console.log(e));
    };

    const handleUpdateArticle = () => {
        console.log("editing is being handled");
        console.log(`${id}`);
        axios
            .put(`/articles/updatedarticle/${id}`, { text: editedText })
            .then((res) => {
                setArticles(res.data);
                console.log("Successfully updated");
                setIsEditing(false); // Set editing mode to false after successful update
            })
            .catch((e) => console.log(e));
    };

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
    }, [id]); // Use 'id' as the dependency for useEffect


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


                                   

                                    {/* Conditionally render the buttons */}
                                    {isEditing ? (
                                        <div className="grid">
                                            <textarea
                                                className="rounded-2xl bg-transparent border-2 border-white/20 px-12 pt-5 mx-auto w-full h-72"
                                                value={editedText}
                                                onChange={(e) => setEditedText(e.target.value)}
                                            />
                                            <div className="flex justify-center items-center flex-col md:flex-row md:gap-5">
                                                {/* SAVE BUTTON */}
                                                <button
                                                    onClick={() => {
                                                        handleUpdateArticle();
                                                    }}
                                                    className="relative inline-flex items-center justify-center flex-row w-fit p-4 px-5 py-3 mt-5 sm:mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                                >
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white">Save</span>
                                                </button>
                                                {/* CANCEL BUTTON */}
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="relative inline-flex items-center justify-center w-fit p-4 px-5 py-3 mt-5 sm:mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                                >
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white">Cancel</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex flex-col items-center">
                                                <div className="mt-5 px-10 py-5 w-[200px] md:w-[500px]  h-auto border-2 border-white/20 rounded-2xl ">
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: articles && articles.text,
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex space-x-5 ">
                                                    {/* EDIT BUTTON */}
                                                    <button
                                                        onClick={() => {
                                                            setIsEditing(true);
                                                        }}
                                                        className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                                    >
                                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                        <span className="relative text-white">Edit</span>
                                                    </button>
                                                    {/* DELETE BUTTON */}
                                                    <button
                                                        onClick={handleDeleteArticle}
                                                        className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                                    >
                                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                        <span className="relative text-white">Delete</span>
                                                    </button>
                                                </div>
                                                {/* ADD ENTRY BUTTON */}
                                                <Link
                                                    to="../journals/new"
                                                    className="relative inline-flex items-center justify-center w-fit p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                                >
                                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                                    <span className="relative text-white">Add Entry</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

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
