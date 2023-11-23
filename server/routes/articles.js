const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth");

router.use(authenticate);
const {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} = require("../controllers/articles");

router.post("/newarticle", createArticle);
router.get("/articles", getAllArticles);
router.get("/articles/:id", getArticleById);
router.put("/updatedarticle/:id", updateArticle);
router.delete("/deletearticle/:id", deleteArticle);

module.exports = router;
