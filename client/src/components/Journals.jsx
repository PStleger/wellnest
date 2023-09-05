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
  }, [currentMonth]);

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
        {selectedDate && (
          <div>
            <h2>Journal Titles for {selectedDate.format("MMMM DD, YYYY")}</h2>
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
                      <ul>
                        <li>
                          <p>{entry.title}</p>
                        </li>
                      </ul>
                    </div>
                  );
                }
                return null; // If the entry doesn't match the selected date, skip it
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journals;
