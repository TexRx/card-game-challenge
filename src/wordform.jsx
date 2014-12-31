/** @jsx React.DOM */

var Wordform = React.createClass({

    // we use the handler function name onWordsEntered instead of gameStarted
    // so that we can decouple the handler function in this component from the
    // parent component. Wordform doesn't care about the game starting; it just
    // needs to notify its parent when the user has entered valid words
    propTypes: {
        onWordsEntered: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return { error: "" };
    },

    setError(msg) {
        this.setState( { error: msg } );

        setTimeout(
            () => this.setState( { error: ""} ),
            2000
        );
    },

    submitWords(e) {
        var node = this.refs['wordfield'].getDOMNode(),
            words = (node.value || '').trim().replace(/\W+/g, ' ').split(' ');

        if ( words.length <= 2 ) {
            this.setError('You must enter at least 3 words to play the game!');
        } else if ( words.length !== _.unique(words).length) {
            this.setError('Words must be unique!');
        } else if ( words.filter( w => w.length > 8 ).length ) {
            this.setError('Words should not be longer than 8 characters!');
        } else {
            this.props.onWordsEntered(words);
            node.value = "";
        }

        return false;
    },

    render() {
        return (
            <form onSubmit={this.submitWords}>
                <p>Enter at least 3 words separated by spaces.</p>
                <input type="text" ref="wordfield" />
                <button type="submit">Start Game!</button>
                <p className="error" ref="errormsg">{this.state.error}</p>
            </form>
        );
    }
});