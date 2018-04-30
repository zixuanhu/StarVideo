import { connect } from "react-redux";
import * as getCommentAction from "../../actions/getCommentAction";
import * as getVideoAction from "../../actions/getVideoAction";
import * as searchActions from "../../actions/searchAction";
import vimeoPlayer from "./vimeoPlayer";

export const mapStateToProps = state => {
    debugger;
    return {
        video: state.video.video,
        relatedvideos: state.vimeo.videos,
        comments: state.comments.comments
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        getVideo: video_id => {
            return dispatch(getVideoAction.getVimeo(video_id));
        },
        fetchVimeo: video_id => {
            debugger;
            return dispatch(searchActions.fetchRelatedVimeo(video_id));
        },
        getComment: video_id => {
            return dispatch(getCommentAction.getVimeoComment(video_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(vimeoPlayer);
