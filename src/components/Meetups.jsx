import moment from "moment";
import React from "react";

import "./Meetups.css";

import InlineBlockList from "meetup-web-components/lib/layout/InlineBlockList";
import AvatarMember from "meetup-web-components/lib/media/AvatarMember";

const Meetup = props => {
  const date = moment(new Date(props.time)).format("h:mmA, dddd");
  const rsvpers =
    props.rsvpers.length >= 5 ? props.rsvpers.slice(0, 5) : props.rsvpers;

  return (
    <li className="list-item">
      <div className="text--secondary margin--bottom">{date} </div>
      <h3 className="text--bold">
        <a href={props.url} target="_blank">
          {props.name}
        </a>
      </h3>
      <p className="text--caption margin--bottom">{props.group}</p>
      <div className="margin--bottom">
        <InlineBlockList
          items={rsvpers.map(rsvp => {
            const thumb = rsvp.member_photo
              ? rsvp.member_photo.thumb_link
              : "https://placebear.com/50/50";

            return (
              <AvatarMember
                member={Object.assign(rsvp.member, {
                  photo: Object.assign({}, (rsvp || {}).member_photo, {
                    thumb_link: thumb
                  })
                })}
                alt={rsvp.member.name}
                key={rsvp.member.member_id}
              />
            );
          })}
        />
        <strong>{props.rsvpCount} Going</strong>
      </div>
    </li>
  );
};

const Meetups = props => {
  return (
    <ul className="list">
      {!props.meetups.length && !props.error ? (
        <p className="list-item text--error text--bold">
          We couldn't find anything matching {props.query}!
        </p>
      ) : (
        ""
      )}
      {props.meetups.map(meetup => {
        return (
          <Meetup
            name={meetup.name}
            url={meetup.event_url}
            group={meetup.group.name}
            key={meetup.created}
            time={meetup.time}
            rsvpCount={meetup.yes_rsvp_count}
            rsvpers={meetup.rsvp_sample}
          />
        );
      })}
    </ul>
  );
};

export default Meetups;
