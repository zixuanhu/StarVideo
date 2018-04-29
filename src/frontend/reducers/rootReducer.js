import { combineReducers } from "redux";
import videolist from "./youtubeDataReducer";
import comments from "./commentReducer";
import video from "./videoReducer";
import vimeo from "./vimeoReducer";

const RootReducer = combineReducers({
    videolist,
    comments,
    video,
    vimeo
});

export default RootReducer;
