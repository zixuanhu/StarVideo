import axios from "axios";
export const UPDATE_Comment = "UPDATE_Comment";
export const UPDATE_vimeoComment = "UPDATE_vimeoComment";

export const getComment = videoId => {
    const params = {
        part: "snippet, replies",
        videoId: videoId,
        key: "AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg"
    };
    const url = `https://www.googleapis.com/youtube/v3/commentThreads`;
    return axios.get(url, { params }).then(response => {
        return response;
    });
};

export const getVimeoComment = videoId => {
    axios.defaults.headers.common["Authorization"] =
        "bearer 7a9fd5a833dd4d05a1832ce02f577b07";
    const url = `https://api.vimeo.com/videos/${videoId}/comments`;

    return axios.get(url).then(response => {
        return response;
    });
};

//export const getCommentId=video_id
