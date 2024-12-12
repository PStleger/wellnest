/* eslint-disable react-hooks/exhaustive-deps */
import axios from "../axiosInstance";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    // YAxis,
    CartesianGrid,

    // Tooltip,
    // Legend,
} from "recharts";
import { hsvaToHex } from "@uiw/color-convert";

let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];


const Progress = () => {
    const navigate = useNavigate();
    const [dailyProgress, setDailyProgress] = useState([]);
    // const { id } = useParams();
    // console.log("ID from useParams:", id);
    useEffect(() => {
        axios
            .get(`/progress/progress/`)
            .then((res) =>
                setDailyProgress(
                    res.data.map((r) => {
                        const color =
                            r.QAArray[7].answer !== ""
                                ? JSON.parse(r.QAArray[7].answer)
                                : JSON.parse(r.QAArray[2].answer);
                        // console.log(color);
                        return {
                            id: r._id,
                            color: hsvaToHex({
                                h: color.h,
                                s: color.s,
                                v: color.v,
                                a: color.a,
                            }),
                            day: weekDays[
                                (new Date(r.createdAt).getDay() + 6) % 7
                            ],
                        };
                    })
                )
            )
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // console.log(dailyProgress);

    const groupedData = dailyProgress.reduce((accumulator, data) => {
        if (!accumulator[data.day]) {
            accumulator[data.day] = {};
        }
        if (!accumulator[data.day][data.color]) {
            accumulator[data.day][data.color] = 0;
        }
        accumulator[data.day][data.color]++;
        return accumulator;
    }, {});

    const modifiedStackedData = weekDays.map((day) => {
        const dayData = groupedData[day] || {};
        return {
            day,
            ...dayData,
        };
    });

    const colors = dailyProgress.reduce((colorMap, data) => {
        colorMap[data.color] = { id: data.id, exists: true };
        return colorMap;
    }, {});

    const currentDate = new Date();

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 7);

    const startDateString = startOfWeek.toDateString().slice(4, 16);
    const endDateString = endOfWeek.toDateString().slice(4, 16);

    return (
        modifiedStackedData && (
            <div className="max-h-[400px]">
                <p className="my-5 mx-28 text-lg text-[#8C1960] font-semibold">
                    {`This Week:    
                    ${startDateString} - 
                    ${endDateString}`}
                </p>
                <BarChart
                    width={700}
                    height={300}
                    data={modifiedStackedData}
                    className="mx-auto my-20"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#DFC6E0" />
                    <XAxis
                        dataKey="day"
                        stroke="#8C1960"
                        className="font-semibold"
                    />
                    {/* <YAxis /> */}
                    {/* <Tooltip
                        className="rounded-2xl"
                        wrapperStyle={{ width: 100, backgroundColor: "red" }}
                    /> */}
                    {/* <Legend
                    width={100}
                    wrapperStyle={{
                        top: 40,
                        right: 20,
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #d5d5d5",
                        borderRadius: 3,
                        lineHeight: "40px",
                    }}
                /> */}
                    {Object.keys(colors).map((color) => (
                        <Bar
                            key={color}
                            dataKey={color}
                            stackId="1"
                            fill={`${color}`}
                            barSize={100}
                            stroke="#808080"
                            radius={[10, 10, 10, 10]}
                            className="hover:cursor-pointer"
                            onClick={() =>
                                navigate(
                                    `../progress/progress/${colors[color].id}`
                                )
                            }
                        />
                    ))}
                </BarChart>
            </div>
        )
    );
};

export default Progress;
