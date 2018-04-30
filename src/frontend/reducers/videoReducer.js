import * as videoUtil from "../utils/videoUtil";

const defaultState = {
    video: {}
};

const videoReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let video;
    switch (action.type) {
        case videoUtil.UPDATE_VIDEO:
            video = action.video;
            const newVideoState = Object.assign({}, state, {
                video: video
            });
            return newVideoState;
        case videoUtil.UPDATE_VIMEO:
            video = action.video;

            const newVimeoState = Object.assign({}, state, {
                video: video
            });
            return newVimeoState;
        default:
            return state;
    }
};

export default videoReducer;
