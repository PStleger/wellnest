// /* eslint-disable no-unused-vars */
// import { Link } from "react-router-dom";
// import axios from "../axiosInstance";
// import { useState, useEffect } from "react";

// function formatDate(timestamp) {
//     const date = new Date(timestamp);
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Month is 0-indexed
//     const year = date.getFullYear() % 100; // Get the last two digits of the year

//     return `${day}/${month}/${year}`;
// }

// const Journals = () => {
//     const [journals, setJournals] = useState([]);
//     const [value, setValue] = useState("");

//     useEffect(() => {
//         // Make the GET request when the component mounts
//         axios
//             .get(`/journals/journals`)
//             .then((res) => {
//                 // Update the state with the retrieved journal data
//                 setJournals(res.data);
//             })
//             .catch((e) => console.log(e));
//     }, [value]); // The effect will re-run whenever 'value' changes

//     return (
//         <div>
//             <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
//                 <div className="py-5 px-5 flex-auto ">
//                     <div className="tab-content tab-space ">
//                         <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row ">
//                             <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
//                                 <h2 className="text-[#6C1770] text-2xl py-6">
//                                     My Journal
//                                 </h2>

//                                 <ol reversed>
//                                     <div className="gridItem flex items-center justify-center gap-2 flex-wrap lg:mx-16">
//                                         {journals.map((journal) => (
//                                             <li key={journal.timestamps}>
//                                                 <Link
//                                                     to={`/journals/${journal._id}`}
//                                                     className="relative inline-flex items-center justify-center px-4 py-2 w-16 h-14 md:w-24 md:h-20 lg:w-32 lg:h-28 overflow-hidden text-[8px] md:text-[16px] lg:text-lg transition duration-300 ease-out rounded-xl shadow-xl group hover:ring-1 hover:ring-purple-500"
//                                                 >
//                                                     <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#D19976] via-[#CF974E] to-[#ECE5A9]"></span>
//                                                     <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-[#ECE5A9] rounded-full opacity-30 group-hover:rotate-90 ease"></span>
//                                                     <span className="relative text-white text-center">
//                                                         {formatDate(
//                                                             journal.createdAt
//                                                         )}
//                                                     </span>
//                                                 </Link>
//                                             </li>
//                                         ))}
//                                     </div>
//                                 </ol>

//                                 <Link
//                                     to="../journals/new"
//                                     className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
//                                 >
//                                     <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
//                                     <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
//                                     <span className="relative text-white">
//                                         Add Entry
//                                     </span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Journals;





import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "../axiosInstance";

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    axios
      .get(`/journals/journals`)
      .then((res) => {
        console.log("got it!!!!!!!!!!!!");
        setJournalEntries(res.data);
      })
      .catch((error) => {
        console.error("Error fetching journal entries:", error);
      });
  }, [currentMonth]);

  useEffect(() => {
    // Extract days from journal entries and set them as highlighted days
    const days = journalEntries.map((journal) =>
      dayjs(journal.createdAt).date()
    );
    setHighlightedDays(days);
  }, [journalEntries]);

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <div className="w-96 bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <button
            className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={goToPreviousMonth}
          >
            &lt; Previous Month
          </button>
          <h1 className="text-2xl font-semibold">
            {currentMonth.format("MMMM YYYY")}
          </h1>
          <button
            className="px-2 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={goToNextMonth}
          >
            Next Month &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            Array.from({ length: currentMonth.daysInMonth() }).map(
              (_, index) => {
                const currentDate = currentMonth.date(index + 1);
                const formattedDate = currentDate.format("DD");
                const hasJournalEntry = highlightedDays.includes(index + 1);

                return (
                  <div
                    key={formattedDate}
                    className={`${
                      hasJournalEntry
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } p-2 rounded-full text-center ${
                      hasJournalEntry ? "cursor-pointer" : ""
                    }`}
                  >
                    {formattedDate}
                    {hasJournalEntry && (
                      <div className="text-sm mt-1 text-yellow-400">📖</div>
                    )}
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
