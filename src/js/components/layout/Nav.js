import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
  constructor(){
    super();
    this.state = {
      collapsed: true
    }
  }
  toggleCollaps(){
    const collapsed = !this.state.collapsed;
    this.setState({collapsed})
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active": "";
    const archivesClass = location.pathname.match(/^\/favorites/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse": "";

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={this.toggleCollaps.bind(this)}>
              <span className="sr-only">Toggel navigation</span>
              <spacn className="icon-bar"></spacn>
              <spacn className="icon-bar"></spacn>
              <spacn className="icon-bar"></spacn>
            </button>
          </div>
          <div className={"navbar-collapse"} id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={featuredClass}>
                <Link to="/" onClick={this.toggleCollaps.bind(this)}>Todos</Link>
              </li>
              <li className={archivesClass}>
                <Link to={settingsClass} onClick={this.toggleCollaps.bind(this)}>Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}