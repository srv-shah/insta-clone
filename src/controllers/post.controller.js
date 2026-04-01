const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const likeModel = require('../models/like.model')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY

})

async function createPostController(req, res){
    // console.log(req.body, req.file);

    


    // console.log(decoded);
    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    // console.log(file);
    

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully.",
        post
    })
}

async function getPostController(req, res){
    // console.log(decoded);

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "posts fetched successfully",
        posts
    })
    
}

async function getPostDetailController(req, res){

    

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId
    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Post fetched Successfully",
        post
    })
}


async function likePostController(req, res){

    const postId = req.params.postId;
    const username = req.user.username;

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username
    })
    if(isAlreadyLiked){
        return res.status(200).json({
            message: "you have already liked this post",
            like: isAlreadyLiked
        })
    }

    const like = await likeModel.create({
      post: postId,
      user: username  
    })

    res.status(200).json({
        message: "Post liked successfully",
        like
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailController,
    likePostController
}
