import * as searchApiUtil from "../utils/searchUtil";

const defaultState = Object.freeze({
    videos: []
});

const vimeoDataReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let videos = [];
    switch (action.type) {
        case searchApiUtil.UPDATE_VIMEO:
            videos = action.videos;
            return Object.assign({}, state, {
                videos: videos
            });
        default:
            return state;
    }
};

export default vimeoDataReducer;
