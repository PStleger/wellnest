import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "../axiosInstance";
import { Link, useParams, useNavigate } from "react-router-dom";

const Journals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
  const { id } = useParams();
  
  console.log(`${id}`);
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
  }, [currentMonth, journalEntries]); // Include journalEntries as a dependency

  useEffect(() => {
    // Extract days from journal entries and set them as highlighted days
    const days = journalEntries.map((journal) =>
      dayjs(journal.createdAt).date()
    );
    setHighlightedDays(days);
  }, [journalEntries]);

  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]">
      <div className="w-96 h-auto bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button
            className="px-2 py-1 text-[#6C1770]/50 hover:text-[#6C1770] focus:outline-none"
            onClick={goToPreviousMonth}
          >
            &lt; Previous Month
          </button>
          <h1 className="text-2xl text-center font-semibold text-[#6C1770]">
            {currentMonth.format("MMMM YYYY")}
          </h1>
          <button
            className="px-2 py-1 text-[#6C1770]/50 hover:text-[#6C1770] focus:outline-none "
            onClick={goToNextMonth}
          >
            Next Month &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 w-full">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            Array.from({ length: currentMonth.daysInMonth() }).map(
              (_, index) => {
                const currentDate = currentMonth.date(index + 1);
                const formattedDate = currentDate.format("DD");
                const dayOfMonth = index + 1;
                const hasJournalEntry = journalEntries.some((entry) => {
                  const entryDate = dayjs(entry.createdAt);
                  return (
                    entryDate.date() === dayOfMonth &&
                    entryDate.isSame(currentMonth, "month") &&
                    entryDate.isSame(currentMonth, "year")
                  );
                });

                return (
                  <div
                    key={formattedDate}
                    className={`${
                      hasJournalEntry
                        ? "bg-[#6C1770] text-white cursor-pointer relative"
                        : "bg-gray-200"
                    } p-2 rounded-full text-center`}
                    onClick={() => handleDateClick(currentDate)}
                  >
                    {formattedDate}
                    {hasJournalEntry && (
                      <div className="text-sm mt-1 absolute top-[-5px] right-[-5px]">📖</div>
                    )}
                  </div>
                );
              }
            )
          )}
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
      {/* JOURNAL LIST */}
      {selectedDate && (
  <div>
    <h2 className="text-[#6C1770] text-xl pt-4">Journal Entries for {selectedDate.format("DD MMMM YYYY")}</h2>
    <ul>
      {journalEntries.map((entry) => {
        const entryDate = dayjs(entry.createdAt);
        if (
          entryDate.date() === selectedDate.date() &&
          entryDate.isSame(selectedDate, "month") &&
          entryDate.isSame(selectedDate, "year")
        ) {
          // Use slice to limit the text to 75 characters
          const truncatedText = entry.text.slice(0, 75);
          const displayText = entry.text.length > 75 ? truncatedText + '...' : truncatedText;

          return (
            <div key={entry.id} className="w-96">
              <div className="p-6 my-5 grid gap-8 lg:grid-cols-1 h-70 max-w-[800px] w-full rounded-xl bg-[#EFE2F0]/50">

                <p className="mb-5 font-light text-[#6C1770]/50">
                  <p dangerouslySetInnerHTML={{ __html: displayText }} />
                        </p>
                        <div className="flex justify-between items-end ">
                          <a
                            href="#"
                            className="inline-flex items-end font-medium text-primary-600  hover:underline"
                          >
                            <Link
                              to={`/journals/${entry._id}`}
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
                                  fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>{" "}
                            </Link>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null; // If the entry doesn't match the selected date, skip it
              })}
            </ul>
          </div>
        )}
    </div>
  );
};

export default Journals;
