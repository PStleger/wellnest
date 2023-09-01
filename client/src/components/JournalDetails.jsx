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

const JournalDetails = () => {
  const [journals, setJournals] = useState([]);
  const [value, setValue] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Make the GET request when the component mounts
    axios
      .get(`/journals/journals/${id}`, { text: value })
      .then((res) => {
        // Update the state with the retrieved journal data
        setJournals(res.data);
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
                <div className="gridItem flex items-center justify-center gap-2 flex-wrap lg:mx-16 flex-col">
                  <h2 className="text-[#6C1770] text-2xl py-6">
                    Journal Entry: {formatDate(journals.createdAt)}
                  </h2>
                  <p>{journals.title}</p>
                  <p>{journals.description}</p>
                  <div className="mt-5 px-10 w-auto h-auto border-2 border-white/20 rounded-2xl">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: journals && journals.text,
                      }}
                    />
                  </div>
                </div>
                {/* ADD ENTRY BUTTON */}
                <Link
                  to="../journals/new"
                  className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                  <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                  <span className="relative text-white">Add Entry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetails;
