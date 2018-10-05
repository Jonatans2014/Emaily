import React, { Component } from "react";
//use connect redux to connnect redux to header and allow header to get the state
// Fetch users
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from './Payments'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
        default:
        return [
            <li key="1"><Payments /></li>,
            <li key ="2" style={{margin: '0 10px'}}>
                Credits: {this.props.auth.credits}
            </li>,
            <li key ="3">
              <a href="/api/logout">Logout</a>
            </li>
        ];
    }

  }

  render() {
      /*Link Navigate to a different router rendered by  React Router */
      //ternary function
    return (
        console.log("props",this.props.auth),
      <nav>
        <div className="nav-wrapper">

            <Link
                to={this.props.auth ? '/surveys' : '/'}
                className="left brand-logo"
            >
                Emaily
            </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }

}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
