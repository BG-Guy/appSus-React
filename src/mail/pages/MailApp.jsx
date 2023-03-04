import React, { useEffect } from "react";
import { mailService } from "../services/mail.service";
import { MailList } from "../cmps/MailList";
// import { MailFilter } from "../cmps/MailFilter";
import { useState } from "react";
import Sidebar from "../cmps/Sidebar";
import SearchIcon from "../../SVGS/SearchIcon";
import ComposeEmail from "../cmps/ComposeMail";
import { utilService } from "../../services/util.service";
import SortBy from "../cmps/SortBy";

export default function MailApp() {
  const [mails, setMails] = useState(null);
  const [readMailsPrecentage, setReadMailsPrecentage] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [searchKeywords, setSearchKeywords] = useState(null);
  const [isComposeShown, UseComposeIsShown] = useState(false);
  const loadMails = async () => {
    await mailService.query(filterBy, searchKeywords).then((mails) => {
      if (sortBy) onSortMails(mails);
      let readMailsPrecentage =
        (mails.filter((mail) => mail.isRead).length / mails.length) * 100;

      setReadMailsPrecentage(readMailsPrecentage.toFixed(2));
      setMails(mails);
      return mails;
    });
  };

  const onSetFilterBy = async (filterBy) => {
    setFilterBy(filterBy);
  };

  const onSortMails = (mails) => {
    if (sortBy === "isRead") mails.sort((a, b) => b.isRead - a.isRead);
    if (sortBy === "isFav") mails.sort((a, b) => b.isFavourite - a.isFavourite);
    if (sortBy === "sentAt") mails.sort((a, b) => b.sentAt - a.sentAt);
    return mails;
  };

  const onSortBy = async (label) => {
    setSortBy(label);
    // await mailService.save(mails).then((mails) => setMails(mails));
  };

  const toggleCompose = () => {
    UseComposeIsShown(!isComposeShown);
  };

  // Function to favourite an email and update the mails state
  const toggleFav = async (mail) => {
    mail.isFavourite = !mail.isFavourite;
    await mailService.save(mail).then((mails) => setMails(mails));
    await loadMails();
  };

  const toggleTrash = async (mail) => {
    mail.isDeleted = !mail.isDeleted;
    await mailService.save(mail).then((mails) => setMails(mails));
    await loadMails();
  };

  const onRemoveMail = async (mail) => {
    await mailService.remove(mail.id);
    loadMails();
  };

  const onSendMail = (composeInfo) => {
    const newMail = mailService.getEmptyMail(composeInfo);
    mailService.save(newMail, mails);
    loadMails();
    toggleCompose();
  };

  const handleChange = async ({ target }) => {
    setSearchKeywords(target.value);
    await mailService.query(filterBy, searchKeywords).then((mails) => {
      setMails(mails);
    });
  };

  useEffect(() => {
    loadMails();
  }, [filterBy, searchKeywords, sortBy]);

  return mails ? (
    <div className="mails-page">
      <div className="header">
        <div className="logo">
          <span>Emails</span>
        </div>
        <div className="search-bar-container">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            className="search-bar"
            placeholder="Search Mail"
          />
        </div>
      </div>
      <Sidebar
        toggleCompose={toggleCompose}
        readMailsPrecentage={readMailsPrecentage}
        onSetFilterBy={onSetFilterBy}
      />
      {isComposeShown && (
        <ComposeEmail onSendMail={onSendMail} toggleCompose={toggleCompose} />
      )}
      <div className="mail-list">
        <SortBy onSortBy={onSortBy} />

        <MailList
          mails={mails}
          toggleTrash={toggleTrash}
          toggleFav={toggleFav}
          onRemoveMail={onRemoveMail}
        />
      </div>
    </div>
  ) : (
    <h1>Loading Mails...</h1>
  );
}
