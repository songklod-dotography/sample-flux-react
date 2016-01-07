var React = require('react');

var DiscussionComment = React.createClass({
	render: function() {
		var comment = this.props.comment;
		return (
			<li>{comment.title}</li>
		);
	}
});
 
var DiscussionList = React.createClass({
	render: function() {
	
		var DiscussionComments = this.props.comments.map(function(data, index) {
			return (
				<DiscussionComment key={data.ID} comment={data} />
			);
		});
		return (
			<ul>
				{DiscussionComments}
			</ul>
		);
	}
});
 
module.exports = DiscussionList;