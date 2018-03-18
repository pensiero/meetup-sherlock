import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import "./Favorite.css";

import Icon from 'meetup-web-components/lib/media/Icon';
import withToggleControl from 'meetup-web-components/lib/utils/components/WithToggleControl';

/**
 * @class Favorite
 */
class Favorite extends Component {

  // add/remove the favorite
  toggleFavorite = () => {

    let apiUrl = 'http://localhost:8080/api/v1/favorites';

    // delete/put API
    axios({
      method: this.props.isActive ? 'delete' : 'put',
      url: apiUrl,
      data: { meetup_id: this.props.meetupId },
    }).catch(error => {
      console.error(error);
    });

    // toggle active status
    this.props.toggleActive();
  };

  render() {

    const iconShape = this.props.isActive ? 'heart' : 'heart-outline';
    const iconColor = this.props.isActive ? '#d32d4a' : '#353e48';

    return (
      <div
        className={classNames({
          'align--center': true,
          'favorite': true,
          'active': this.props.isActive,
        })}
        onClick={this.toggleFavorite}
      >
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Icon shape={iconShape} color={iconColor} size="m" />
        </div>
        <p className="text--small">Favorite</p>
      </div>
    );
  }
}

export default withToggleControl(Favorite);
