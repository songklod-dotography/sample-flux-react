var React = require('react');

var DiscussionStore = require('../stores/DiscussionStore');
var DiscussionActions = require('../actions/DiscussionActions');
 
var DiscussionForm = require('./DiscussionForm.jsx');
var DiscussionList = require('./DiscussionList.jsx');
 
var DiscussionApp = React.createClass({

	getInitialState: function() {
		return DiscussionStore.getState();
	},
	componentDidMount: function() {
		DiscussionStore.addChangeListener(this._onChange);
		DiscussionActions.getComments(this.state.page);
	},
	componentWillUnmount: function() {
		DiscussionStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(DiscussionStore.getState());
	},
	
	_onViewMoreComments: function() {
		DiscussionActions.getComments(this.state.page);
	},
 
	render: function() {
		var comments = DiscussionStore.getAll();
		
		return (
			<div>
				<DiscussionForm />
				<DiscussionList comments={comments} />
				{this.state.loading ? <p>Loading...</p> : null}
				<button onClick={this._onViewMoreComments}>View more comments</button>
			</div>
		);
	}
});
 
module.exports = DiscussionApp;