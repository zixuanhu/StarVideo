import { connect } from "react-redux";
import * as getCommentAction from "../../actions/getCommentAction";
import * as getVideoAction from "../../actions/getVideoAction";
import * as searchActions from "../../actions/searchAction";
import Player from "./Player";

export const mapStateToProps = state => {
    return {
        relatedvideos: state.videolist.videos,
        comments: state.comments.comments,
        video: state.video.video
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getComment: video_id => {
            return dispatch(getCommentAction.getComment(video_id));
        },
        getVideo: video_id => {
            return dispatch(getVideoAction.getVideo(video_id));
        },
        fetchVideos: relatedToVideoId => {
            return dispatch(
                searchActions.fetchVideos({}, {}, relatedToVideoId)
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
