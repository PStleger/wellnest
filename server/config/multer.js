const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = multer;