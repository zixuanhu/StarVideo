import axios from "axios";
// 什么是ajax
export const UPDATE_VIDEO = "GET_VIDEOS";

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
