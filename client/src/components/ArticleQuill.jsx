import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticleQuill = () => {
    const [value, setValue] = useState("");

    // write the handlenewarticle function to send post request to db
    const handleNewArticle = () => {
        console.log("new article has been sent to the db");
        console.log(value);
    };

    return (
        <>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <button
                className="bg-red-200 rounded-xl p-2 my-10"
                onClick={handleNewArticle}
            >
                Add Article
            </button>
        </>
    );
};

export default ArticleQuill;
