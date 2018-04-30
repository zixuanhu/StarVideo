import * as videoUtil from "../utils/videoUtil";

export const updateVideo = video => {
    return {
        type: videoUtil.UPDATE_VIDEO,
        video
    };
};
export const updateVimeo = video => {
    return {
        type: videoUtil.UPDATE_VIMEO,
        video
    };
};
export const getVideo = videoId => {
    return dispatch => {
        return videoUtil.getVideo(videoId).then(response => {
            const video = response.data.items;
            dispatch(updateVideo(video));
        });
    };
};

export const getVimeo = videoId => {
    return dispatch => {
        return videoUtil.getVimeo(videoId).then(response => {
            const video = response.data;
            dispatch(updateVimeo(video));
        });
    };
};
