import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mailService } from "../services/mail.service";
import {
  faArrowLeft,
  faEnvelope,
  faEnvelopeOpen,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function MailDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);
  const [readMailsPrecentage, setReadMailsPrecentage] = useState(null);

  useEffect(() => {
    getMail();
  }, []);

  const getMail = async () => {
    const mail = await mailService.getById(id);
    setMail(mail);
  };

  const onBack = () => {
    navigate(-1);
  };

  const onDelete = async () => {
    await mailService.remove(mail.id);
    navigate(-1);
  };

  const toggleMarkedRead = () => {
    mail.isRead = !mail.isRead;
    updateMail();
  };

  const updateMail = async () => {
    await mailService.save(mail).then(() => setMail(mail));
    getMail();
  };

  const toggleFav = async () => {
    mail.isFavourite = !mail.isFavourite;
    updateMail();
  };

  return mail ? (
    <div className="mail-details-container">
      <div className="main-content">
        <ul className="actions-wrapper">
          <li className="action" onClick={() => onBack()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </li>
          <li className="action" onClick={() => toggleMarkedRead()}>
            {mail.isRead ? (
              <FontAwesomeIcon icon={faEnvelopeOpen} />
            ) : (
              <FontAwesomeIcon icon={faEnvelope} />
            )}
          </li>
          <li className="action" onClick={() => onDelete()}>
            <FontAwesomeIcon icon={faTrash} />
          </li>
          <li className="action" onClick={() => toggleFav()}>
            <FontAwesomeIcon
              icon={faStar}
              color={mail.isFavourite ? "#ffbf00" : "#000000"}
              // color={"#FFFF00"}
            />
          </li>
        </ul>
        <div className="mail-content">
          <h1>{mail.subject}</h1>
          <small>{mail.sentAt}</small>
          <p>{mail.body}</p>
        </div>
      </div>
    </div>
  ) : null;
}
