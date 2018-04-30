import React from "react";
import Moment from "react-moment";
// import isEmpty from "lodash/isEmpty";
class vimeoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldLoadVideo: true,
            keywords: "good",
            page: 1
        };
    }

    submitChange(video) {
        const path = `vimeo${video.uri}`;
        this.props.history.push(path);
    }
    componentWillMount() {
        if (this.props.vimeo.length === 0) {
            this.props.fetchVimeo("good");
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

    submitSearchChange() {
        this.setState({
            shouldLoadVideo: false
        });
        this.props.fetchVimeo(this.state.keywords).then(() =>
            this.setState({
                shouldLoadVideo: true
            })
        );
    }

    onNextPage(e) {
        e.preventDefault();
        this.setState({
            shouldLoadVideo: false
        });
        //debugger;
        this.props
            .fetchVimeo(this.state.keywords, this.state.page + 1)
            .then(() =>
                this.setState({
                    shouldLoadVideo: true,

                    page: this.state.page + 1
                })
            );
        //debugger;
    }
    onForwardPage(e) {
        if (this.state.page <= 1) {
            return;
        }
        e.preventDefault();
        this.setState({
            shouldLoadVideo: false
        });

        this.props
            .fetchVimeo(this.state.keywords, this.state.page - 1)
            .then(() =>
                this.setState({
                    shouldLoadVideo: true,

                    page: this.state.page - 1
                })
            );
    }
    //需要加入mouseover

    buildVideoCard() {
        let vimeos = [];
        for (let i = 0; i < this.props.vimeo.length; i++) {
            const video = this.props.vimeo[i];
            //debugger;
            vimeos.push(
                <div
                    key={i}
                    className="col-sm-6 col-md-4 gallery-card gallery-card-vimeo"
                    onClick={e => this.submitChange(video)}
                >
                    <div className="view zoom">
                        <img
                            className="img-fluid "
                            src={
                                video.pictures.sizes[
                                    video.pictures.sizes.length - 1
                                ].link
                            }
                            style={{ width: "100%", height: "180px" }}
                            alt="video img"
                        />
                    </div>
                    <div className="caption">
                        <h5 style={{ whiteSpace: "normal" }}>{video.name}</h5>
                        <Moment fromNow>{video.metadata.modified_time}</Moment>
                    </div>
                </div>
            );
        }
        return vimeos;
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
                        onClick={e => this.submitSearchChange()}
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
        //console.log(this.props.vimeo);
        return (
            <div className="container">
                <div>
                    {this.searchBar()}
                    <hr />
                    {this.pager()}
                    <hr />
                    <br />
                    <br />
                    {this.state.shouldLoadVideo
                        ? this.buildVideoCard()
                        : "loading..."}
                    <br />
                    <hr />
                    {this.pager()}
                </div>
            </div>
        );
    }
}

export default vimeoGallery;
