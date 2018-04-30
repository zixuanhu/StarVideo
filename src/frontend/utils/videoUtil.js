import axios from "axios";
// 什么是ajax
export const UPDATE_VIDEO = "GET_VIDEOS";
export const UPDATE_VIMEO = "GET_VIMEO";

export const getVideo = video_id => {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = {
        id: video_id,
        part: "snippet,contentDetails,statistics",
        key: "AIzaSyDrpMSpOKrlS3g8FnOQfur2YXGVZJtjTAg"
    };
    return axios.get(url, { params }).then(response => {
        return response;
    });
};

export const getVimeo = video_id => {
    axios.defaults.headers.common["Authorization"] =
        "bearer 7a9fd5a833dd4d05a1832ce02f577b07";
    const url = `https://api.vimeo.com/videos/ ${video_id}`;

    return axios.get(url).then(response => {
        return response;
    });
};
