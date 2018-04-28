import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Nav from "./frontend/components/navbar/navbar";
import GalleryContainer from "./frontend/components/gallery/GalleryContainer";
import PlayerContainer from "./frontend/components/player/PlayerContainer";

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={Nav} />
                    <Route exact path="/youtube" component={GalleryContainer} />
                    <Route
                        exact
                        path="/youtube/video/:video_id"
                        component={PlayerContainer}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
