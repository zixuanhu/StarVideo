import { connect } from "react-redux";
import * as searchActions from "../../actions/searchAction";
import vimeoGallery from "./vimeoGallery";

export const mapStateToProps = state => {
    return {
        vimeo: state.vimeo.videos
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchVimeo: keywords => {
            return dispatch(searchActions.fetchVimeo(keywords));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(vimeoGallery);
