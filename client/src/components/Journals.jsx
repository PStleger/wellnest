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
        <div className="grid grid-cols-7 gap-1">
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
      </div>
      {/* JOURNAL LIST */}
      {selectedDate && (
          <div>
            <h2 className="text-[#6C1770] text-xl pt-4">Journal Titles for {selectedDate.format("MMMM DD, YYYY")}</h2>
            <ul>
              {journalEntries.map((entry) => {
                const entryDate = dayjs(entry.createdAt);
                if (
                  entryDate.date() === selectedDate.date() &&
                  entryDate.isSame(selectedDate, "month") &&
                  entryDate.isSame(selectedDate, "year")
                ) {
                  return (
                    <div key={entry.id}>
                   
                      <div className="p-6 my-5 grid gap-8 lg:grid-cols-1 h-70 max-h-[800px] w-full rounded-xl bg-[#EFE2F0]/50">
                        <div className="flex justify-between items-center mb-5 text-[#6C1770]/50 ">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
                          </span>
                          <span className="text-sm">{entry.date}</span>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#6C1770] ">
                          <Link to={`/journals/journals/${id}`}>{entry.title}</Link>
                        </h2>
                        <p className="mb-5 font-light text-[#6C1770]/50 ">
                          {entry.text?.slice(1, 500)}
                        </p>
                        <div className="flex justify-between items-end ">
                          <a
                            href="#"
                            className="inline-flex items-end font-medium text-primary-600  hover:underline"
                          >
                            <Link
                              to={`/journals/journals/${id}`}
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
                                  clip-rule="evenodd"
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
