import * as commentUtil from "../utils/commentUtil";

export const updateComment = video => {
    return {
        type: commentUtil.UPDATE_Comment,
        video
    };
};

export const updateVimeoComment = video => {
    return {
        type: commentUtil.UPDATE_vimeoComment,
        video
    };
};
export const getComment = videoId => {
    return dispatch => {
        return commentUtil.getComment(videoId).then(response => {
            const comment = response.data.items;
            dispatch(updateComment(comment));
        });
    };
};

export const getVimeoComment = videoId => {
    return dispatch => {
        return commentUtil.getVimeoComment(videoId).then(response => {
            const comment = response.data.data;
            dispatch(updateVimeoComment(comment));
        });
    };
};
