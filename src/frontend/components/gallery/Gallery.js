import React from "react";
import Moment from "react-moment";
import isEmpty from "lodash/isEmpty";
class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldLoadVideo: true,
            keywords: ""
        };
    }
    MouseOver(video) {
        this.setState({ mouseOverVideo: video });
    }

    submitChange(video) {
        const path = `youtube/video/${video.id.videoId}`;
        this.props.history.push(path);
    }
    componentWillMount() {
        if (this.props.videos.length === 0) {
            this.props.fetchVideos("");
        }
    }

    updateKeywords(e) {
        e.preventDefault();
        this.setState({
            keywords: e.target.value
        });
    }

    keyDown(e) {
        const keycode = e.which; //取得对应的键值（数字）

        if (keycode === 13) {
            this.submitSearchChange(e);
        }
    }

    submitSearchChange(e, video) {
        this.props.fetchVideos(this.state.keywords);
        this.props.history.push("/youtube");
    }

    onNextPage(e) {
        e.preventDefault();
        this.setState({
            shouldLoadVideo: false
        });
        this.props
            .fetchVideos(this.state.keywords, this.props.nextPageToken)
            .then(() =>
                this.setState({
                    shouldLoadVideo: true,
                    mouseOverVideo: {}
                })
            );
    }
    onForwardPage(e) {
        e.preventDefault();
        this.setState({
            shouldLoadVideo: false
        });

        this.props
            .fetchVideos(this.state.keywords, this.props.prePageToken)
            .then(() =>
                this.setState({
                    shouldLoadVideo: true
                })
            );
    }
    //需要加入mouseover

    buildVideoCard() {
        let videos = [];
        for (let i = 0; i < this.props.videos.length; i++) {
            const video = this.props.videos[i];

            videos.push(
                <div
                    key={i}
                    className="col-sm-6 col-md-4 gallery-card btn thumbnail"
                    onClick={e => this.submitChange(video)}
                >
                    <div className="view zoom">
                        <img
                            className="img-fluid "
                            src={video.snippet.thumbnails.medium.url}
                            alt="video img"
                        />
                    </div>
                    <div className="gallery-card-right">
                        <h3>{video.snippet.channelTitle}</h3>
                        <Moment fromNow>{video.snippet.publishedAt}</Moment>
                    </div>
                </div>
            );
        }
        return videos;
    }
    searchBar() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control search-input"
                    onChange={e => this.updateKeywords(e)}
                    value={this.state.keywords}
                    onKeyDown={e => this.keyDown(e)}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        type="button"
                        onClick={e => this.submitSearchChange(e)}
                    >
                        Search
                    </button>
                </span>
            </div>
        );
    }
    pager() {
        return (
            <ul className="pager">
                <li className="previous btn">
                    <a onClick={e => this.onForwardPage(e)}>Previous</a>
                </li>
                <li className="next btn">
                    <a onClick={e => this.onNextPage(e)}>Next</a>
                </li>
            </ul>
        );
    }

    render() {
        return (
            <div className="container">
                <div>
                    {this.searchBar()}
                    <hr />
                    {this.pager()}
                    <hr />
                    <br />
                    <br />
                    <div className="container">
                        {this.state.shouldLoadVideo
                            ? this.buildVideoCard()
                            : "loading..."}
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default Gallery;
