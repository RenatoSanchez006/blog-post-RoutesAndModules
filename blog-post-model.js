const uuid = require('uuid/v4');

let post = [
	{
		id: 123,
		title: "How to climb for dummies",
		content: "Climbing",
		author: "Mr. Loro",
		publishDate: new Date()
	}, {
		id: 234,
		title: "How to teach climbing",
		content: "Climbing",
		author: "Mr. Chuy",
		publishDate: new Date()
	}, {
		id: 4321,
		title: "Is it safe to climb?",
		content: "Climbing",
		author: "Mr. Chuy",
		publishDate: new Date()
	}, {
		id: uuid(),
		title: "How to set up a route",
		content: "Climbing",
		author: "Mr. Chuy",
		publishDate: new Date()
	}, {
		id: uuid(),
		title: "How belay safetly",
		content: "Climbing",
		author: "Mr. Loro",
		publishDate: new Date()
	}
]

const listPost = {
	getAll: function () {
		return post;
	},
	getByAuthor: function (author) {
		let listOfPost = [];
		post.forEach(item => {
			if (item.author == author) {
				listOfPost.push(item);
			}
		});
		return listOfPost;
	},
	postNew: function (nPost) {
		newPost = {
			id: uuid(),
			title: nPost.title,
			content: nPost.content,
			author: nPost.author,
			publishDate: nPost.publishDate
		}
		post.push(newPost);
		return true;
	},
	deletePost: function (postId) {
		let response = false;
		post.forEach((item, index) => {
			if (item.id == postId) {
				post.splice(index, 1);
				response = true;
			}
		});
		return response;
	},
	updatePost: function (id, postObj) {
		post.forEach(item => {
			if (id == item.id) {
				if ('title' in postObj) {
					item.title = postObj.title;
				}
				if ('content' in postObj) {
					item.content = postObj.content;
				}
				if ('author' in postObj) {
					item.author = postObj.author;
				}
				if ('publishDate' in postObj) {
					item.publishDate = postObj.publishDate;
				}
			}
		});
		return true;
	}
}

module.exports = { listPost }