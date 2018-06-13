import React from "react";
import Moment from "react-moment";

// import isEmpty from "lodash/isEmpty";
class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldLoadVideo: true,
            keywords: ""
        };
    }

    MouseOver(video) {
        this.setState({
            mouseOverVideo: video
        });
    }

    submitChange(video) {
        const path = `/youtube/video/${video.id.videoId}`;
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

    buildVideoCard() {
        let videoCards = [];
        for (let i = 0; i < this.props.videos.length; i++) {
            const video = this.props.videos[i];
            const image = video.snippet.thumbnails.medium.url;
            debugger
            videoCards.push(
                <div
                    key={i}
                    className="col-sm-6 col-md-4 "

                    onClick={e => this.submitChange(video)}
                >
                    <div
                    >
                        <div
                            className="card "
                        >
                            <div className='homeimg-box'>
                                <img
                                    className="homeimg "
                                    src={image}
                                />
                            </div>
                            <br/>
                            {/*<div className="Plus">*/}
                            {/*<span className="homePlus">PLUS</span>*/}
                            {/*{home.room_type} · {home.property_type}*/}
                            {/*</div>*/}
                            <p className="hometitle">{video.snippet.channelTitle} </p>
                            <p className="homeprice"><Moment fromNow> {video.snippet.publishedAt}</Moment></p>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {videoCards}
            </div>
        );
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
                    <a onClick={e => this.onForwardPage(e)}> Previous </a>
                </li>
                <li className="next btn">
                    <a onClick={e => this.onNextPage(e)}> Next </a>
                </li>
            </ul>
        );
    }

    render() {
        return (
            <div className="container">
                <div>

                    {this.searchBar()}
                    <hr/>
                    {this.pager()}
                    <hr/>
                    <br/>
                    <br/>
                    <div className="container">

                        {this.state.shouldLoadVideo
                            ? this.buildVideoCard()
                            : "loading..."}
                    </div>
                    <br/>
                    <hr/>
                    {this.pager()}
                </div>
            </div>
        );
    }
}

export default Gallery;
