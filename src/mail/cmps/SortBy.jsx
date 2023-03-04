import {
  faCalendar,
  faEnvelope,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function SortBy({ onSortBy }) {
  return (
    <div className="sort-by-container">
      <div className="sortby-action-wrapper">
        <span className="is-read-icon">
          <FontAwesomeIcon
            onClick={() => onSortBy("isRead")}
            className="icon"
            icon={faEnvelope}
          />
        </span>
        <span className="is-fav-icon">
          <FontAwesomeIcon
            onClick={() => onSortBy("isFav")}
            className="icon"
            icon={faStar}
          />
        </span>
        <span className="date-icon">
          <FontAwesomeIcon
            onClick={() => onSortBy("sentAt")}
            className="icon"
            icon={faCalendar}
          />
        </span>
      </div>
    </div>
  );
}
