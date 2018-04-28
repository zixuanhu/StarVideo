import { connect } from "react-redux";
import * as searchActions from "../../actions/searchAction";
import Gallery from "./Gallery";

export const mapStateToProps = state => {
    return {
        videos: state.videolist.videos,
        nextPageToken: state.videolist.nextPageToken,
        prePageToken: state.videolist.prePageToken
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchVideos: (keywords, pageToken) => {
            return dispatch(searchActions.fetchVideos(keywords, pageToken));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
