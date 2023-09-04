import { useState } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
// import "./Progress.css";

const NewJournal = () => {
    const [value, setValue] = useState("");
    // const title = "Title";
    // const description = "Category";
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [selectedOption, setSelectedOption] = useState(""); // Initial selected option
    const [checkbox, setCheckbox] = useState(false);

    const handleNewJournal = () => {
        console.log("new Journal has been sent to the db");
        console.log(value);
        if (checkbox !== true) {
            console.log("ja");
            axios
                .post(`/journals/newjournal`, {
                    text: value,
                    description: selectedOption,
                    title: title,
                })
                .then((res) => {
                    console.log(res.data);
                    navigate(`../journals`);
                })
                .catch((e) => console.log(e));
        } else {
            axios
                .post(`/articles/newarticle`, {
                    text: value,
                    description: selectedOption,
                    title: title,
                })
                .then((res) => {
                    console.log(res.data);
                    navigate(`../publicarticles`);
                })
                .catch((e) => console.log(e));
        }
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        // axios
        //     .post(`/articles/articles`)
        //     .then((res) => console.log("article sent"))
        //     .catch((e) => console.log(e));
    };

    return (
        <div>
            <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
                <div className="py-5 px-5 flex-auto ">
                    <div className="tab-content tab-space">
                        <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
                            <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10">
                                <h2 className="text-[#6C1770] text-2xl py-6">
                                    Journal Entry
                                </h2>
                                <p>Title:</p>
                                <input
                                    type="text"
                                    className="rounded-lg"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>

                                <div className="pt-5">
                                    <label htmlFor="dropdown">
                                        Select a category:{" "}
                                    </label>
                                    <select
                                        id="dropdown"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        className="rounded-lg"
                                    >
                                        <option value="Mindfulness">
                                            Mindfulness
                                        </option>
                                        <option value="Meditation">
                                            Meditation
                                        </option>
                                        <option value="CBT">CBT</option>
                                        <option value="Breathwork">
                                            Breathwork
                                        </option>
                                        <option value="Yoga">Yoga</option>
                                        <option value="Motivational">
                                            Motivational
                                        </option>
                                        <option value="Holistic">
                                            Holistic
                                        </option>
                                        <option value="More">More</option>
                                    </select>
                                </div>

                                <ReactQuill
                                    className="w-3/4 h-auto mx-auto my-10 bg-white/50 rounded-2xl border-none"
                                    theme="snow"
                                    value={value}
                                    onChange={setValue}
                                />

                                {/* CHECKBOX */}
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] pb-3">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="checkboxDefault"
                                        onFocus={() => setCheckbox(true)}
                                    />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="checkboxDefault"
                                    >
                                        Make Public
                                    </label>
                                </div>

                                <Link
                                    to="../journals"
                                    onClick={handleNewJournal}
                                    className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-2xl shadow-xl group hover:ring-1 hover:ring-purple-500"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0]"></span>
                                    <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                                    <span className="relative text-white">
                                        Add Entry
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

export default NewJournal;
