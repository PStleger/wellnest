import axios from "../axiosInstance";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { hsvaToHex } from "@uiw/color-convert";

const ProgressDetails = () => {
    // const navigate = useNavigate();
    const [dailyProgress, setDailyProgress] = useState({});
    const [hexColor2, setHexColor2] = useState("");
    const [hexColor7, setHexColor7] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`/progress/progress/${id}`)
            .then((res) => {
                setDailyProgress(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (!loading) {
            if (
                dailyProgress.QAArray &&
                dailyProgress.QAArray[2] &&
                dailyProgress.QAArray[2].answer
            ) {
                try {
                    const color2 = JSON.parse(dailyProgress.QAArray[2].answer);
                    setHexColor2(
                        hsvaToHex({
                            h: color2.h,
                            s: color2.s,
                            v: color2.v,
                            a: color2.a,
                        })
                    );
                } catch (error) {
                    console.error("Error parsing color2:", error);
                }
            }

            if (
                dailyProgress.QAArray &&
                dailyProgress.QAArray[7] &&
                dailyProgress.QAArray[7].answer
            ) {
                try {
                    const color7 = JSON.parse(dailyProgress.QAArray[7].answer);
                    setHexColor7(
                        hsvaToHex({
                            h: color7.h,
                            s: color7.s,
                            v: color7.v,
                            a: color7.a,
                        })
                    );
                } catch (error) {
                    console.error("Error parsing color7:", error);
                }
            }
        }
    }, [dailyProgress.QAArray, loading]);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-indexed
        const year = date.getFullYear() % 100; // Get the last two digits of the year

        return `${day}/${month}/${year}`;
    }
    console.log(dailyProgress.QAArray);
    // console.log(JSON.parse(dailyProgress.QAArray[2].answer));
    //
    return (
        <div>
            <div className="relative flex flex-col break-words bg-gradient-to-br from-[#88dfee] via-purple-400 to-[#DFC6E0] md:rounded-2xl md:mx-10 py-10 my-10 shadow-xl shadow-[#6C1770]/50">
                <div className="py-5 px-5 flex-auto ">
                    <div className="tab-content tab-space">
                        <div className="flex justify-around items-center flex-col-reverse gap-10 md:flex-row">
                            <div className="h-auto w-2/3 xl:w-1/2 bg-[#EFE2F0]/50 rounded-3xl flex flex-col items-center justify-around p-10 gap-12">
                                <div className="flex flex-col items-center justify-around gap-4">
                                    <h2 className=" text-[#6C1770] font-bold text-2xl animate-fade-up">
                                        Emotional Well-being Check-in{" "}
                                    </h2>
                                    <p className="mb-10 text-[#6C1770] font-bold text-2xl animate-fade-up">
                                        {formatDate(dailyProgress.createdAt)}
                                    </p>
                                </div>
                                {dailyProgress.QAArray && (
                                    <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                        <p className="text-xl font-semibold text-[#6C1770]">
                                            {dailyProgress.QAArray[0].question}
                                        </p>
                                        <p className="text-[#1c3b53] font-semibold text-xl">
                                            {dailyProgress.QAArray[0].answer}
                                        </p>
                                    </div>
                                )}
                                {dailyProgress.QAArray && (
                                    <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                        <p className="text-xl font-semibold text-[#6C1770]">
                                            {dailyProgress.QAArray[1].question}
                                        </p>
                                        <p className="text-[#1c3b53] font-semibold text-xl">
                                            {dailyProgress.QAArray[1].answer}
                                        </p>
                                    </div>
                                )}
                                {dailyProgress.QAArray && (
                                    <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                        <p className="text-xl font-semibold text-[#6C1770]">
                                            {dailyProgress.QAArray[2].question}
                                        </p>
                                        <div
                                            className="h-36 w-36 rounded-full shadow-xl shadow-[#6C1770]/50 "
                                            style={{
                                                backgroundColor: hexColor2,
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {dailyProgress.QAArray && (
                                    <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                        <p className="text-xl font-semibold text-[#6C1770]">
                                            {dailyProgress.QAArray[3].question}
                                        </p>
                                        <img
                                            className="rounded-xl h-52 w-auto shadow-xl shadow-[#6C1770]/50"
                                            src={
                                                dailyProgress.QAArray[3].answer
                                            }
                                        />
                                    </div>
                                )}
                                {dailyProgress.QAArray && (
                                    <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                        <p className="text-xl font-semibold text-[#6C1770]">
                                            {dailyProgress.QAArray[4].question}
                                        </p>
                                        <p className="text-[#1c3b53] font-semibold text-xl">
                                            {dailyProgress.QAArray[4].answer}
                                        </p>
                                    </div>
                                )}
                                {dailyProgress.QAArray && (
                                    <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                        <p className="text-xl font-semibold text-[#6C1770]">
                                            {dailyProgress.QAArray[5].question}
                                        </p>
                                        <p className="text-[#1c3b53] font-semibold text-xl">
                                            {dailyProgress.QAArray[5].answer}
                                        </p>
                                    </div>
                                )}
                                {dailyProgress.QAArray &&
                                dailyProgress.QAArray[5].answer === "Yes" ? (
                                    <>
                                        {" "}
                                        <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                            <p className="text-xl font-semibold text-[#6C1770]">
                                                {
                                                    dailyProgress.QAArray[6]
                                                        .question
                                                }
                                            </p>
                                            <p className="text-[#1c3b53] font-semibold text-xl">
                                                {
                                                    dailyProgress.QAArray[6]
                                                        .answer
                                                }
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                            <p className="text-xl font-semibold text-[#6C1770]">
                                                {
                                                    dailyProgress.QAArray[7]
                                                        .question
                                                }
                                            </p>
                                            <div
                                                className="h-36 w-36 rounded-full shadow-xl shadow-[#6C1770]/50 "
                                                style={{
                                                    backgroundColor: hexColor7,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                            <p className="text-xl font-semibold text-[#6C1770]">
                                                {
                                                    dailyProgress.QAArray[8]
                                                        .question
                                                }
                                            </p>
                                            <p className="text-[#1c3b53] font-semibold text-xl">
                                                {
                                                    dailyProgress.QAArray[8]
                                                        .answer
                                                }
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                            <p className="text-xl font-semibold text-[#6C1770]">
                                                {
                                                    dailyProgress.QAArray[9]
                                                        .question
                                                }
                                            </p>
                                            <img
                                                className="rounded-xl h-52 w-auto shadow-xl shadow-[#6C1770]/50"
                                                src={
                                                    dailyProgress.QAArray[9]
                                                        .answer
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                            <p className="text-xl font-semibold text-[#6C1770]">
                                                {
                                                    dailyProgress.QAArray[10]
                                                        .question
                                                }
                                            </p>
                                            <p className="text-[#1c3b53] font-semibold text-xl">
                                                {
                                                    dailyProgress.QAArray[10]
                                                        .answer
                                                }
                                            </p>
                                        </div>
                                        {dailyProgress.QAArray[10].answer ===
                                        "Yes" ? (
                                            <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                                <p className="text-xl font-semibold text-[#6C1770]">
                                                    {
                                                        dailyProgress
                                                            .QAArray[11]
                                                            .question
                                                    }
                                                </p>
                                                <p className="text-[#1c3b53] font-semibold text-xl">
                                                    {
                                                        dailyProgress
                                                            .QAArray[11].answer
                                                    }
                                                </p>
                                            </div>
                                        ) : null}
                                        <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                            <p className="text-xl font-semibold text-[#6C1770]">
                                                {
                                                    dailyProgress.QAArray[12]
                                                        .question
                                                }
                                            </p>
                                            <p className="text-[#1c3b53] font-semibold text-xl">
                                                {
                                                    dailyProgress.QAArray[12]
                                                        .answer
                                                }
                                            </p>
                                        </div>
                                        {dailyProgress.QAArray[12].answer ===
                                        "Yes" ? (
                                            <div className="flex flex-col justify-center items-center gap-5 animate-fade-up">
                                                <p className="text-xl font-semibold text-[#6C1770]">
                                                    {
                                                        dailyProgress
                                                            .QAArray[13]
                                                            .question
                                                    }
                                                </p>
                                                <p className="text-[#1c3b53] font-semibold text-xl">
                                                    {
                                                        dailyProgress
                                                            .QAArray[13].answer
                                                    }
                                                </p>
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressDetails;
