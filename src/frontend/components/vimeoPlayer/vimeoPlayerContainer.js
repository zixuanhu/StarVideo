import { connect } from "react-redux";
import * as getCommentAction from "../../actions/getCommentAction";
import * as getVideoAction from "../../actions/getVideoAction";
import * as searchActions from "../../actions/searchAction";
import vimeoPlayer from "./vimeoPlayer";

export const mapStateToProps = state => {
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
        fetchRelatedVimeo: video_id => {
            return dispatch(searchActions.fetchRelatedVimeo(video_id));
        },
        getComment: video_id => {
            return dispatch(getCommentAction.getVimeoComment(video_id));
        },

        fetchVimeo: (keywords, page = 1) => {
            return dispatch(searchActions.fetchVimeo(keywords, page));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(vimeoPlayer);
