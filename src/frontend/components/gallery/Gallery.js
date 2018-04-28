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
            //debugger;
            if (!isEmpty(this.state.mouseOverVideo)) {
                if (this.state.mouseOverVideo.id.videoId === video.id.videoId) {
                    videos.push(
                        <div
                            key={i}
                            className="col-sm-6 col-md-4 gallery-card"
                            onClick={e => this.submitChange(video)}
                        >
                            <div onMouseOver={e => this.MouseOver(video)}>
                                <img
                                    src={video.snippet.thumbnails.default.url}
                                    alt="video img"
                                />
                            </div>
                            <div className="gallery-card-right">
                                <h3>{video.snippet.channelTitle}</h3>
                                <Moment fromNow>
                                    {video.snippet.publishedAt}
                                </Moment>
                            </div>
                        </div>
                    );
                    continue;
                }
            }

            videos.push(
                <div
                    key={i}
                    className="col-sm-6 col-md-4 gallery-card"
                    onClick={e => this.submitChange(video)}
                >
                    <div>
                        <img
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

    render() {
        return (
            <div className="container">
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

                <br />
                <hr />
                <div className="container">
                    <hr />
                    <br />
                    <ul className="pager">
                        <li className="previous">
                            <a onClick={e => this.onForwardPage(e)}>Previous</a>
                        </li>
                        <li className="next">
                            <a onClick={e => this.onNextPage(e)}>Next</a>
                        </li>
                    </ul>
                    <hr />
                    <br />
                    <br />
                    {this.state.shouldLoadVideo
                        ? this.buildVideoCard()
                        : "loading..."}
                </div>
            </div>
        );
    }
}

export default Gallery;
