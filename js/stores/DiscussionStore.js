var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiscussionConstants = require('../constants/DiscussionConstants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _state = {
	loading: false,
  page: 1
};
var _comments = [];

function parseData(comments) {
	_comments = _comments.concat(comments);
	_state.page = _state.page + 1;
}

function addData(comment) {
	
	var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	var newMessage = [{
		'ID': id,
		'title': comment
	}];
	_comments = newMessage.concat(_comments);
	
}

var DiscussionStore = assign({}, EventEmitter.prototype, {
 
	getState: function() {
		return _state;
	},

	getAll: function() {
		return _comments;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

});
 
 
AppDispatcher.register(function(action) {
	switch (action.actionType) {
		
		case DiscussionConstants.DISCUSSION_LOADING:
			_state.loading = true;
			break;
			
		case DiscussionConstants.DISCUSSION_REQUEST:
			parseData(action.comments);
			_state.loading = false;
			break;
		
		case DiscussionConstants.DISCUSSION_CREATE:
			addData(action.comment);
			_state.loading = false;
			break;
		default:
			// no op
	}
	
	DiscussionStore.emitChange();
});
 
module.exports = DiscussionStore;