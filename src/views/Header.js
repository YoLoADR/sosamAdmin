import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../config/dev";

class Header extends Component {
  render() {
    // (1)
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1"> Hacker News</div>
          <Link to="/link-list" className="ml1 no-underline black">
            new
          </Link>
          <div className="ml1">|</div>
          <Link to="/create" className="ml1 no-underline black">
            submit
          </Link>
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                this.props.history.push(`/link-list`);
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/connexion" className="ml1 no-underline black">
              Connexion
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);

// (1) Vous récupérez d'abord le à authTokenpartir du stockage local. Si le authTokenn'est pas disponible, le bouton submit ne sera plus rendu. De cette façon, vous vous assurez que seuls les utilisateurs authentifiés peuvent créer de nouveaux liens.
