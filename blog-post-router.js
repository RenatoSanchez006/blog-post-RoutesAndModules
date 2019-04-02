const express = require('express');
const router = express.Router();
const { listPost } = require('./blog-post-model');

// GET all blog posts
router.get('/blog-posts', (req, res, next) => {
	let listOfPost = listPost.getAll();

	if (listOfPost) {
		res.status(200).json({
			message: 'Succefully sent the posts',
			status: 200,
			posts: listOfPost
		});
	} else {
		res.status(500).json({
			message: 'Internal server error',
			status: 500
		});
		next();
	}

});

// GET all posts by author as path parameter
router.get('/blog-posts/:author', (req, res) => {
	let author = req.params.author;
	if (!author) {
		res.status(406).json({
			message: "Missing param 'author'",
			status: 406
		});
	}

	let listOfPost = listPost.getByAuthor(author);
	if (listOfPost.length == 0) {
		res.status(404).json({
			message: 'Author not found',
			status: 404
		});
	} else {
		res.status(200).json({
			message: 'Author found',
			status: 200,
			listOfPosts: listOfPost
		})
	}
});

// POST
router.post('/blog-posts', (req, res, next) => {
	// Validate all fields are sent in body
	let reqFields = ['title', 'content', 'author', 'publishDate'];
	for (i in reqFields) {
		let currentField = reqFields[i];

		if (!(currentField in req.body)) {
			res.status(406).json({
				message: `Missing field '${currentField}' in body.`,
				status: 406
			});
			next();
		}
	}

	// Create new post to add and push it to array
	let newPost = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		publishDate: req.body.publishDate
	}

	if (listPost.postNew(newPost)) {
		res.status(201).json({
			message: 'Succesfully POST',
			status: 201,
			newPost: newPost
		});
	} else {
		res.status(500).json({
			message: 'Internal server error',
			status: 500
		});
		next();
	}

});


// DELETE post by ID
router.delete('/blog-posts/:id', (req, res) => {

	if (!('id' in req.body)) {
		res.status(406).json({
			message: 'Missing id field',
			status: 406
		});
	}

	let postId = req.params.id;
	if (postId) {
		if (postId == req.body.id) {
			if (listPost.deletePost(postId)) {
				res.json({
					message: 'Succesfully deleted',
					status: 204
				}).status(204);
			} else {
				res.status(404).json({
					message: 'Post not founded',
					status: 404
				});
			}
		} else {
			res.status(400).json({
				message: 'Parameters do not match',
				status: 400
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
	}
});

// PUT update post
router.put('/blog-posts/:id', (req, res, next) => {
	let id = req.params.id;
	let postObj = req.body;

	if (id) {
		if (Object.keys(postObj).length) {
			if (listPost.updatePost(id, postObj)) {
				res.status(200).json({
					message: 'Post updated',
					status: 200
				});
			} else {
				res.status(500).json({
					message: 'Internal server error',
					status: 500
				});
				next();
			}
		} else {
			res.status(404).json({
				message: 'Missing body parameters',
				status: 404
			});
		}
	} else {
		res.status(406).json({
			message: 'Missing id in parameters',
			status: 406
		});
	}
});

module.exports = router;