const Progress = require("../models/progress");


const createProgress = async (req, res) => {
    try {
        const { userId, QAArray } = req.body;

        const progress = await Progress.create({
            userId,
            QAArray: QAArray.map((item) => ({
                question: item.question,
                answer: item.answer,
            })),
        });
        res.status(201).json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const getAllProgress = async (req, res) => {
    try {
        const progress = await Progress.find().populate("userName");
        console.log(" getting all progress data:", progress);
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const getProgressById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const progress = await Progress.find({ _id: id }).populate("userName");
        if (progress.length === 0) {
            res.status(404).json({ message: "progress data not found" });
        }
        res.json(progress[0]);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const deleteProgress = async (req, res) => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const deleteProgress = await Progress.findOneAndDelete(
            { _id: id },
            body,
            { new: true }
        );
        console.log("Progress delete:", deleteProgress);
        res.status(200).json(deleteProgress);
        if (!deleteProgress) {
            res.status(404).json({ message: "Progress data not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};
// const createImageProgress = async (req, res) => {
//     try {
//       console.log('MULTER FILE??', req.file.path);
//       const progress = await progress.create({ ...req.body, image: req.file.path });
//       res.status(201).json(progress);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
const createImageProgress = (req, res) => {
    const imageFile = req.file.buffer.toString('base64');
  
    cloudinary.uploader
      .upload(`data:image/png;base64,${imageFile}`, {
        resource_type: 'image',
      })
      .then((result) => {
        res.json({ imageUrl: result.secure_url });
        console.log(result.secure_url);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
      });
  };
module.exports = {
    createProgress,
    getAllProgress,
    getProgressById,
    deleteProgress,
    createImageProgress,
};
