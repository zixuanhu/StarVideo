import React from "react";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";
import Linkify from "react-linkify";
class vimeoPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video_id: this.props.match.params.video_id,
            keywords: ""
        };
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

    submitSearchChange() {
        this.props
            .fetchVimeo(this.state.keywords)
            .then(() => this.props.history.push("/vimeo"));
    }

    searchBar() {
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
                            onClick={e => this.submitSearchChange()}
                        >
                            Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }

    componentWillMount() {
        this.setState({ video_id: this.props.match.params.video_id });
        this.props.getComment(this.state.video_id);
        this.props.getVideo(this.state.video_id);
        this.props.fetchVimeo(this.state.video_id);
        window.scrollTo(0, 0);
    }

    buildComments(comment, i) {
        const author = {
            name: comment.user.name,
            img: comment.user.pictures.sizes[0].link
        };
        const content = comment.text;
        const publishDate = comment.created_on;
        const likeCount = 0;
        return (
            <div key={i} className="comment-container-item">
                <div className="comment-left">
                    <img src={author.img} alt={`img of ${author.name}`} />
                </div>
                <div className="comment-right">
                    <div>
                        <span>{author.name}</span>
                        <Moment fromNow>{publishDate}</Moment>
                    </div>
                    <div>{ReactHtmlParser(content)}</div>
                    <div>
                        <i className="fa fa-thumbs-up" aria-hidden="true" />
                        <span>{likeCount}</span>
                    </div>
                </div>
            </div>
        );
    }

    buildVideoInfo() {
        if (this.props.video.embed === undefined) return;
        // const duration = this.props.video[0].contentDetails.duration;
        const video = this.props.video;
        const name = video.namw;
        const description = video.description;
        const publishedAt = video.release_time;
        const statistics = {
            likeCount: video.metadata.connections.likes.total,
            viewCount: video.stats.plays
        };

        //debugger;
        return (
            <div className="info-container">
                <div className="video-title">
                    <h3>{name}</h3>
                </div>
                <div className="video-info">
                    <div style={{ color: "#888" }}>
                        <h4>
                            {parseInt(
                                statistics.viewCount,
                                10
                            ).toLocaleString()}&nbsp;views
                        </h4>
                    </div>
                    <hr />
                    <div>
                        <i className="fa fa-thumbs-up" aria-hidden="true" />
                        <span>
                            {parseInt(
                                statistics.likeCount,
                                10
                            ).toLocaleString()}
                        </span>
                    </div>
                    <div>
                        <span>Published on</span>
                        <Moment format="MMM DD,YYYY">{publishedAt}</Moment>
                    </div>
                </div>
                <div id="module">
                    <a
                        data-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                    />

                    <p className="collapse" id="collapseExample">
                        <Linkify>{description}</Linkify>
                    </p>
                </div>
            </div>
        );
    }

    buildVideoPlayer() {
        if (this.props.video.embed === undefined) return;
        return (
            <div className="videoplayer embed-responsive">
                {ReactHtmlParser(this.props.video.embed.html)}
            </div>
        );
    }
    MouseOver(video) {
        // this.setState({ mouseOverVideo: video });
    }

    submitChange(video) {
        const path = `vimeo${video.uri}`;

        this.props.history.push("/");
        this.props.history.push(path);

        this.componentWillMount();
    }
    buildVideoCard() {
        return this.props.relatedvideos.map((video, i) => {
            return (
                <div
                    key={i}
                    className="col-sm-6 col-md-4 playergallery-card btn"
                    onClick={e => this.submitChange(video)}
                >
                    <div onMouseOver={e => this.MouseOver(video)}>
                        <img
                            src={
                                video.pictures.sizes[
                                    video.pictures.sizes.length - 1
                                ].link
                            }
                            alt="video img"
                        />
                    </div>
                    <div>
                        <div id="h3"> {video.name} </div>
                        <br />
                        <br />
                        <div id="time">
                            <Moment fromNow>{video.created_time}</Moment>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.searchBar()}
                <div className="playerbody container">
                    {this.buildVideoPlayer()}
                    {this.buildVideoInfo()}
                    <div className="comment-container">
                        <hr />
                        {this.props.comments.map((x, i) =>
                            this.buildComments(x, i)
                        )}
                    </div>
                </div>
                <div className="relatedvideo">
                    <h3>Up next</h3> {this.buildVideoCard()}
                </div>
            </div>
        );
    }
}

export default vimeoPlayer;
