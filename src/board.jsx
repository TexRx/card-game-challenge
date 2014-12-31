/** @jsx React.DOM */


/*
 * In general passing components around, calling methods on them, and accessing
 * another component's properties are an anti-pattern. Each component should
 * get what it needs to render from its properties, and most if not all of the
 * logic should be contained in the board class.
 */
var Board = React.createClass({

    // declaring propTypes is an easy way to check for programming errors and
    // to see at a glance which props a component requires
    //
    // With a handler function name like onGameFinished, we are "decoupling"
    // the functions from their parents
    propTypes: {
        max: React.PropTypes.number.isRequired,
        onGameFinished: React.PropTypes.func.isRequired,
        words: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },

    getInitialState() {
        return {
            correctIndexes: [],
            firstFlipIndex: null,
            found: 0,
            isWaiting: false,
            message: 'choosetile',
            wrongIndexes: []
        };
    },

    onTileClicked(index) {
        if ( this.state.isWaiting ) {
            return;
        }

        var correctIndexes = this.state.correctIndexes;
        var firstFlipIndex = this.state.firstFlipIndex;
        var words = this.props.words;

        // turn up lone tile
        if ( firstFlipIndex === null ) {
            this.setState({
                firstFlipIndex: index,
                message: 'findmate'
            });
            return;
        }

        // click second tile
        if( words[index] === words[firstFlipIndex] ) {
            this.setState({
                correctIndexes: correctIndexes.concat( [index, firstFlipIndex] ),
                firstFlipIndex: null,
                found: this.state.found + 1,
                isWaiting: true,
                message: 'foundmate'
            });
        } else {
            this.setState({
                firstFlipIndex: null,
                isWaiting: true,
                message: 'wrong',
                wrongIndexes: [index, firstFlipIndex]
            });
        }

        setTimeout(
            () => {
                if ( !this.isMounted() ) {
                    return;
                }

                this.setState({
                    isWaiting: false,
                    message: 'choosetile',
                    wrongIndexes: []
                });
            },
            2000
        );
    },

    render() {
        return (
            <div>
                <button onClick={this.props.onGameFinished}>
                    End game
                </button>
                <Status
                    found={this.state.found}
                    max={this.props.max}
                    message={this.state.message}
                />
                {this.props.words.map( ( word, index ) => {
                    var isFirstFlip = index === this.state.firstFlipIndex;
                    var isCorrect = _.contains(this.state.correctIndexes, index);
                    var isWrong = _.contains(this.wrongIndexes, index);

                    return (
                        <Tile
                            word={word}
                            key={index}
                            index={index}
                            isFlipped={isFirstFlip || isCorrect || isWrong}
                            isCorrect={isCorrect}
                            isWrong={isWrong}
                            onClick={this.onTileClicked}
                        />
                    );
                })}
            </div>
        );
    }
});