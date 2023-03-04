import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faSearch,
  faSquarePen,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

export default function NoteFilter({ onSetFilterBy, filterBy }) {
  const activeStyle = { opacity: 1 };
  const searchRef = useRef(null);
  const { noteType, searchVal } = filterBy;
  const handleFilter = (noteType) => {
    let searchVal = searchRef.current.value;
    onSetFilterBy({ noteType, searchVal });
    console.log(
      "🚀 ~ file: NoteFilter.jsx:18 ~ handleFilter ~ { noteType, searchVal }:",
      { noteType, searchVal }
    );
  };

  return (
    <div className="note-filter-container">
      <div className="input-field-wrapper">
        <input
          type="text"
          placeholder="Search"
          ref={searchRef}
          className="keywords-filter"
          onChange={() => handleFilter()}
        />
        <button className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="filter-by-block">
        <span className="filter-by-title">Filter By Note Type: </span>
        <div className="label-filter">
          <span className="note-image-icon">
            <FontAwesomeIcon
              style={noteType === "noteImg" && activeStyle}
              onClick={() => handleFilter("noteImg")}
              icon={faImage}
            />
          </span>
          <span className="note-text-icon">
            <FontAwesomeIcon
              style={noteType === "noteText" && activeStyle}
              onClick={() => handleFilter("noteText")}
              icon={faSquarePen}
            />
          </span>
          <span className="note-video-icon">
            <FontAwesomeIcon
              style={noteType === "noteVideo" && activeStyle}
              onClick={() => handleFilter("noteVideo")}
              className="active"
              icon={faYoutube}
            />
          </span>
          <span className="note-todos-icon">
            <FontAwesomeIcon
              style={noteType === "noteTodos" && activeStyle}
              onClick={() => handleFilter("noteTodos")}
              icon={faCheckCircle}
            />
          </span>
          <span
            style={!noteType ? activeStyle : {}}
            className="all-notes-icon"
            onClick={() => handleFilter("")}
          >
            <small>ALL</small>
          </span>
        </div>
      </div>
    </div>
  );
}
