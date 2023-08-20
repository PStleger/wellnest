const Article = require("../models/articles");

const createArticle = async (req, res) => {
    try {
        const newArticle = await Article.create(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        res.status().json({ message: error.message, errors: error.errors });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate("createdBy", "userName");
        console.log(" getting all articles:", articles);
        res.json(articles);
    } catch (error) {
        res.status().json({ message: error.message, errors: error.errors });
    }
};

const getArticleById = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const article = await Article.find({ _id: id }).populate(
            "createdBy",
            "userName"
        );
        if (article.length === 0) {
            res.status(404).json({ message: "Article not found" });
        }
        res.json(article[0]);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const updateArticle = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const updatedArticle = await Article.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        console.log("Article updated:", updatedArticle);
        if (!updatedArticle) {
            res.status(404).json({ message: "Article not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const {
            params: { id },
        } = req;
        const deletedArticle = await Article.findOneAndDelete({ _id: id });
        console.log("Article deleted:", deletedArticle);
        if (!deletedArticle) {
            res.status(404).json({ message: "Article not found" });
        }
        res.json(deletedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message, errors: error.errors });
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
};
