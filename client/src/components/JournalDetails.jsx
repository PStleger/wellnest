// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "../axiosInstance";
// import { useState, useEffect } from "react";

// function formatDate(timestamp) {
//     const date = new Date(timestamp);
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Month is 0-indexed
//     const year = date.getFullYear() % 100; // Get the last two digits of the year

//     return `${day}/${month}/${year}`;
// }

// const JournalDetails = () => {
//     const [journals, setJournals] = useState([]);
//     const [value, setValue] = useState("");
//     const { id } = useParams();

//     useEffect(() => {
//         // Make the GET request when the component mounts
//         axios
//             .get(`/journals/journals/${id}`)
//             .then((res) => {
//                 // Update the state with the retrieved journal data
//                 setJournals(res.data);
//                 console.log(res.data);
//             })
//             .catch((e) => console.log(e));
//     }, [value]); // The effect will re-run whenever 'value' changes

//     return (
//         <div>
//             <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
//                 <div className="py-5 px-5 flex-auto ">
//                     <div className="tab-content tab-space">
//                         <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
//                             <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
//                                 <div className="gridItem flex items-center justify-center gap-2 flex-wrap lg:mx-16 flex-col">
//                                     <h2 className="text-[#6C1770] text-2xl py-6">
//                                         Journal Entry:{" "}
//                                         {formatDate(journals.createdAt)}
//                                     </h2>
//                                     <p>{journals.title}</p>
//                                     <p>{journals.createdBy?.userName}</p>
//                                     <p>{journals.description}</p>
//                                     <div className="mt-5 px-10 w-auto h-auto border-2 border-white/20 rounded-2xl">
//                                         <p
//                                             dangerouslySetInnerHTML={{
//                                                 __html:
//                                                     journals && journals.text,
//                                             }}
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* ADD ENTRY BUTTON */}
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

// export default JournalDetails;







// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "../axiosInstance";
// import { useState, useEffect } from "react";

// function formatDate(timestamp) {
//   const date = new Date(timestamp);
//   const day = date.getDate();
//   const month = date.getMonth() + 1; // Month is 0-indexed
//   const year = date.getFullYear() % 100; // Get the last two digits of the year

//   return `${day}/${month}/${year}`;
// }

// const JournalDetails = () => {
//   const [journals, setJournals] = useState([]);
//   const [value, setValue] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedText, setEditedText] = useState("");

//   useEffect(() => {
//     // Make the GET request when the component mounts
//     axios
//       .get(`/journals/journals/${id}`, { text: value })
//       .then((res) => {
//         // Update the state with the retrieved journal data
//         setJournals(res.data);
//         setEditedText(res.data.text); // Initialize editedText with the current text
//         console.log(res.data);
//       })
//       .catch((e) => console.log(e));
//   }, [value]); // The effect will re-run whenever 'value' changes

//   const handleDeleteJournal = () => {
//     console.log("deletion is being handled");
//     console.log(`${id}`);
//     axios
//       .delete(`/journals/deletejournal/${id}`)
//       .then((res) => {
//         console.log("Successfully deleted");
//         navigate(`../journals`);
//       })
//       .catch((e) => console.log(e));
//   };

//   const handleUpdateJournal = () => {
//     console.log("editing is being handled");
//     console.log(`${id}`);
//     axios
//       .put(`/journals/updatejournal/${id}`, { text: editedText })
//       .then((res) => {
//         setJournals(res.data);
//         setIsEditing(false);
//         console.log("Successfully updated");
//         // navigate(`../journals/${id}`);
//       })
//       .catch((e) => console.log(e));
//   };

//   return (
//     <div>
//       <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
//         <div className="py-5 px-5 flex-auto ">
//           <div className="tab-content tab-space">
//             <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
//               <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
//                 <div className="gridItem flex items-center justify-center gap-2 flex-wrap lg:mx-16 flex-col">
//                   <h2 className="text-[#6C1770] text-2xl py-6">
//                     Journal Entry: {formatDate(journals.createdAt)}
//                   </h2>
//                   <p>{journals.title}</p>
//                   <p>{journals.description}</p>
                  
                  
                  
//                   {/* <div className="mt-5 px-10 w-auto h-auto border-2 border-white/20 rounded-2xl">
//                     <p
//                       dangerouslySetInnerHTML={{
//                         __html: journals && journals.text,
//                       }}
//                     />
//                   </div> */}
                
                
//                 </div>
//                 <div className="flex space-x-5">
//                   {isEditing ? (
//                     <div>
//                       <textarea
//                         value={editedText}
//                         onChange={(e) => setEditedText(e.target.value)}
//                       />
//                       <button
//                         onClick={() => {
//                           handleUpdateJournal();
//                           navigate(`../journals/${id}`);
//                         }}
//                       >
//                         Save
//                       </button>
//                       <button onClick={() => setIsEditing(false)}>
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
                    
//                     <div>
//                       {/* EDIT BUTTON */}
//                       <Link
//                         onClick={() => {
//                           setIsEditing(true);
//                           handleUpdateJournal();
//                         }}
//                         to="../journals/${id}"
//                         className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
//                       >
//                         <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
//                         <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
//                         <span className="relative text-white">Edit</span>
//                       </Link>
//                     </div>
//                   )}
//                   {/* DELETE BUTTON */}
//                   <Link
//                     onClick={handleDeleteJournal}
//                     to="../journals"
//                     className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
//                   >
//                     <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
//                     <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
//                     <span className="relative text-white">Delete</span>
//                   </Link>
//                 </div>
//                 {/* ADD ENTRY BUTTON */}
//                 <Link
//                   to="../journals/new"
//                   className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
//                 >
//                   <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
//                   <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
//                   <span className="relative text-white">Add Entry</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JournalDetails;






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

const JournalDetails = () => {
  const [journals, setJournals] = useState([]);
  const [value, setValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    // Make the GET request when the component mounts
    axios
      .get(`/journals/journals/${id}`, { text: value })
      .then((res) => {
        // Update the state with the retrieved journal data
        setJournals(res.data);
        setEditedText(res.data.text); // Initialize editedText with the current text
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [value]); // The effect will re-run whenever 'value' changes

  const handleDeleteJournal = () => {
    console.log("deletion is being handled");
    console.log(`${id}`);
    axios
      .delete(`/journals/deletejournal/${id}`)
      .then((res) => {
        console.log("Successfully deleted");
        navigate(`../journals`);
      })
      .catch((e) => console.log(e));
  };

  const handleUpdateJournal = () => {
    console.log("editing is being handled");
    console.log(`${id}`);
        setJournals(res.data);
        // setIsEditing(true);
        console.log("Successfully opened editor");
  };

  const saveUpdateJournal = () => {
    console.log("editing is being saved");
    console.log(`${id}`);
    axios
      .put(`/journals/updatejournal/${id}`, { text: editedText })
      .then((res) => {
        setJournals(res.data);
        setIsEditing(false);
        console.log("Successfully updated");
        navigate(`../journals/${id}`);
      })
      .catch((e) => console.log(e));
  };

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

                  {isEditing ? (
                    <div>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <button
                        onClick={() => {
                          handleUpdateJournal();
                          navigate(`../journals/${id}`);
                        }}
                      >
                        Save
                      </button>
                      <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-5 px-10 w-auto h-auto border-2 border-white/20 rounded-2xl">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: journals && journals.text,
                          }}
                        />
                      </div>
                      {/* EDIT BUTTON */}
                      <Link
                        onClick={() => {
                          setIsEditing(true);
                          handleUpdateJournal();
                        }}
                        to={`../journals/${id}`}
                        className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative text-white">Edit</span>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex space-x-5">
                  {/* DELETE BUTTON */}
                  <Link
                    onClick={handleDeleteJournal}
                    to="../journals"
                    className="relative inline-flex items-center justify-center p-4 px-5 py-3 mt-10 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                    <span className="relative text-white">Delete</span>
                  </Link>
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
    </div>
  );
};

export default JournalDetails;

