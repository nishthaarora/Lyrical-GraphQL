import React, {Component} from 'react';
import gql from 'graphql-tag'; //helper to allow us to write query inside of files
import {graphql} from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: { 
                content: this.state.content, 
                songId: this.props.songId
            }
        }).then(() => this.setState({content: ''}))
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>add a lyric</label>
                <input onChange={(e) => this.setState({content: e.target.value})} 
                    value={this.state.content}/>
            </form>
        )
    }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      title
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate);