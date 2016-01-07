var request = require('superagent');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiscussionConstants = require('../constants/DiscussionConstants');

var DiscussionActions = {
	
	
	getComments: function(page) {
		
		AppDispatcher.dispatch({
			actionType: DiscussionConstants.DISCUSSION_LOADING
		});

		request
			.get('http://www.myapp.com/api/comment?limit=10&page=' + page)
			.end(function(err, res){
				if(res)
				{
					AppDispatcher.dispatch({
						actionType: DiscussionConstants.DISCUSSION_REQUEST,
						comments: res.body
					});
				}
			});
},
	
	
	addComment: function(comment) {
		AppDispatcher.dispatch({
				actionType: DiscussionConstants.DISCUSSION_CREATE,
				comment: comment,
		});
		
		request
			.post('http://www.myapp.com/api/comment')
			.send({ comment: comment })
			.end(function(err, res){
				console.log(res);
			});
	}
};
 
module.exports = DiscussionActions;