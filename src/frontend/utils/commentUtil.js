import axios from "axios";
export const UPDATE_Comment = "UPDATE_Comment";
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

//export const getCommentId=video_id
