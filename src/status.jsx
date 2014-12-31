/** @jsx React.DOM */

// This component renders the info row above the game board
//
// Even though the status row is constantly changing while playing, this is a
// totally static component. It contains no state variables, and all updates are
// controlled in the parent component

var Status = React.createClass({

    propTypes: {
        found: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        message: React.PropTypes.string.isRequired
    },

    render() {
        var found = this.props.found,
            max = this.props.max,
            texts = {
                choosetile: 'Choose a tile!',
                findmate: 'Now try to find the matching tile.',
                wrong: 'Sorry, those didn\'t match.',
                foundmate: 'Hoo-hah, you found a match!',
                foundall: 'You\'ve found all ' + max + ' pairs. Nice work!'
            };

        return (
            <p>
                ({found}/{max})&nbsp;&nbsp;
                {texts[
                    this.props.message === 'choosetile' && found === max ?
                        'foundall' :
                        this.props.message
                ]}
            </p>
        );
    }
});