// import { useState } from "react";
import { faRecycle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import FavouriteIcon from "../../SVGS/FavouriteIcon";
// import SendIcon from "../../SVGS/FavouriteIcon";
// import TrashIcon from "../../SVGS/TrashIcon";
import { mailService } from "../services/mail.service";

export function MailPreview({ mail, toggleTrash, toggleFav, onRemoveMail }) {
  const onRead = () => {
    mail.isRead = true;
    mailService.save(mail);
  };

  return (
    mail && (
      <section className="mail-row">
        <section className="mail-actions">
          <div className="favourite-icon" onClick={() => toggleFav(mail)}>
            <FavouriteIcon isFavourite={mail.isFavourite} />
          </div>
        </section>
        <div
          className={mail.isRead ? "mail-info read" : "mail-info unread"}
          onClick={() => onRead()}
        >
          <Link to={`/mail-app/${mail.id}`}>
            <h4 className="mail-subject">{mail.subject}</h4>
          </Link>
          <h4 className="name">{mail.name}</h4>
          <h4 className="sent-at">{mail.sentAt}</h4>
          <div className="mail-actions">
            <span className="trash-icon" onClick={() => toggleTrash(mail)}>
              {mail.isDeleted ? (
                <FontAwesomeIcon icon={faRecycle} />
              ) : (
                <FontAwesomeIcon icon={faTrash} />
              )}
            </span>
            {mail.isDeleted && (
              <span className="trash-icon" onClick={() => onRemoveMail(mail)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            )}
          </div>
        </div>
      </section>
    )
  );
}
