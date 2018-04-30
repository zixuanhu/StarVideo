import * as commentUtil from "../utils/commentUtil";

const defaultState = {
    comments: []
};

const openPlayerReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let comments;
    switch (action.type) {
        case commentUtil.UPDATE_Comment:
            comments = action.video;
            const newCommmentState = Object.assign({}, state, {
                comments: comments
            });
            return newCommmentState;
        case commentUtil.UPDATE_vimeoComment:
            comments = action.video;
            const newVimeoCommmentState = Object.assign({}, state, {
                comments: comments
            });

            return newVimeoCommmentState;
        default:
            return state;
    }
};

export default openPlayerReducer;
