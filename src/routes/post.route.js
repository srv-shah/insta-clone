const express = require('express');
const postRouter = express.Router();

const postController = require('../controllers/post.controller')
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


//post -> /api/post/
postRouter.post("/",upload.single("image"), postController.createPostController);

//get /api/posts/  [protected]
postRouter.get("/", postController.getPostController)

// get /api/post/detail/:postId
// - return a detail about specific post with the id, also check wether the post belongs to the user that t he request come from
postRouter.get("/details/:postId", postController.getPostDetailController);



module.exports = postRouter;