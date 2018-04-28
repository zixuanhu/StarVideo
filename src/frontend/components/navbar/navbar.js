import React from "react";
class NavBar extends React.Component {
    onRedirectHome(e) {
        e.preventDefault();
        this.props.history.push("/");
    }
    onRedirectYoutube(e) {
        e.preventDefault();
        this.props.history.push("/youtube");
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false"
                        >
                            <span className="sr-only">
                                Toggle navigation
                            </span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <a
                            className=" btn navbar-brand"
                            onClick={e =>
                                this.onRedirectHome(e)
                            }
                        >
                            StarVideo
                        </a>
                    </div>

                    <div
                        className="collapse navbar-collapse"
                        id="bs-example-navbar-collapse-1"
                    >
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a
                                    className="btn"
                                    onClick={e =>
                                        this.onRedirectYoutube(
                                            e
                                        )
                                    }
                                >
                                    Youtube
                                </a>
                            </li>
                            <li className="dropdown">
                                <a
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    About me<span className="caret" />
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="https://github.com/zixuanhu">
                                            Github
                                        </a>
                                    </li>
                                    <li>
                                        <a>LinkedIn</a>
                                    </li>
                                    <li>
                                        <a>Portfolio</a>
                                    </li>
                                    <li
                                        role="separator"
                                        className="divider"
                                    />
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
