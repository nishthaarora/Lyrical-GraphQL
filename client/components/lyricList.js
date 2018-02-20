import React, {Component} from 'react';
import gql from 'graphql-tag'; //helper to allow us to write query inside of files
import {graphql} from 'react-apollo';

class LyricList extends Component {
    onLike(lyricId, likes) {
        this.props.mutate({
            variables: { id: lyricId },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: lyricId,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">{content}
                   <div className="vote-box"> 
                        <i className="material-icons" 
                            onClick={() => this.onLike(id, likes)}
                        >
                            thumb_up
                        </i>
                        {likes}
                    </div>
                </li>
            );
        });
    }

    render() {
        return(
            <ul className="collection">{this.renderLyrics()}</ul>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
        id
        likes
        }
    }
`

export default graphql(mutation)(LyricList);