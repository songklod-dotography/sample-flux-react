var React = require('react');
var DiscussionActions = require('../actions/DiscussionActions');
 
var DiscussionForm = React.createClass({

	getInitialState: function() {
		return {
			message: ''
		};
	},
	
	_onChange: function(event) {
		this.setState({
			message: event.target.value
		});
	},
	
	_onSubmit: function(event) {
		event.preventDefault();
		
		DiscussionActions.addComment(this.state.message);
		
		this.setState({
				message: ''
		});
	},

	render: function() {
		return (
			<form onSubmit={this._onSubmit}>
				<input type="text" 
					placeholder="Enter message here..." 
					onChange={this._onChange}
					value={this.state.message}
				/>
				<button onClick={this._onSubmit}>Comment</button>
			</form>
		);
	}
});
 
module.exports = DiscussionForm;