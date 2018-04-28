import React from "react";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";
import Linkify from "react-linkify";
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            video_id: this.props.match.params.video_id
        };
    }

    componentWillMount() {
        this.props.getComment(this.state.video_id);
        this.props.getVideo(this.state.video_id);
        this.props.fetchVideos(this.state.video_id);
        window.scrollTo(0, 0);
    }

    buildComments(comment, i) {
        const author = {
            name: comment.authorDisplayName,
            img: comment.authorProfileImageUrl
        };
        const content = comment.textDisplay;
        const publishDate = comment.publishedAt;
        const likeCount = comment.likeCount;
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

    buiildVideoInfo() {
        if (this.props.video.length === undefined) return;
        const duration = this.props.video[0].contentDetails.duration;
        const video = this.props.video[0].snippet;
        const name = video.localized.title;
        const description = video.localized.description;
        const publishedAt = video.publishedAt;
        const statistics = {
            likeCount: this.props.video[0].statistics.likeCount,
            viewCount: this.props.video[0].statistics.viewCount
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
                <div>
                    <p>
                        <a
                            data-toggle="collapse"
                            href="#collapseExample"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                        >
                            Description
                        </a>
                    </p>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body">
                            <Linkify>{description}</Linkify>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    buildVideoPlayer() {
        return (
            <div className="videoplayer embed-responsive">
                <iframe
                    allowFullScreen="allowFullScreen"
                    title={this.state.video_id}
                    className="embed-responsive-item video"
                    src={`https://www.youtube.com/embed/${this.state.video_id}`}
                    sandbox="allow-scripts allow-presentation allow-same-origin"
                />
            </div>
        );
    }
    MouseOver(video) {
        this.setState({ mouseOverVideo: video });
    }

    submitChange(video) {
        const path = `${video.id.videoId}`;
        this.setState({ video_id: video.id.videoId });
        this.props.history.push(path);
        this.componentWillMount();
    }
    buildVideoCard() {
        return this.props.relatedvideos.map((video, i) => {
            return (
                <div
                    key={i}
                    className="col-sm-6 col-md-4 gallery-card"
                    onClick={e => this.submitChange(video)}
                >
                    <div onMouseOver={e => this.MouseOver(video)}>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt="video img"
                        />
                    </div>
                    <div className="gallery-card-right">
                        <h3> {video.snippet.channelTitle} </h3>
                        <Moment fromNow>{video.snippet.publishedAt}</Moment>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.buildVideoPlayer()}
                {this.buiildVideoInfo()}
                <div className="comment-container">
                    <hr />
                    {this.props.comments.map((x, i) =>
                        this.buildComments(x.snippet.topLevelComment.snippet, i)
                    )}
                </div>
                {this.buildVideoCard()}
            </div>
        );
    }
}

export default Player;
