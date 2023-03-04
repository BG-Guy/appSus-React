import { utilService } from "../../services/util.service.js";
import { storageService } from "../../services/storage.service.js";

const emails = [
  {
    name: "yoni",
    id: utilService.makeId(),
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },
  {
    name: "jomi",
    id: utilService.makeId(),
    subject: "sprint",
    body: "let come stop program",
    isRead: false,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },
  {
    name: "rokie",
    id: utilService.makeId(),
    subject: "box",
    body: "let come fight program",
    isRead: false,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },
  {
    name: "brok",
    id: utilService.makeId(),
    subject: "poki",
    body: "go pokemon",
    isRead: false,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },
  {
    name: "liam",
    id: utilService.makeId(),
    subject: "bar",
    body: "today at 4?",
    isRead: false,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },
  {
    name: "tim",
    id: utilService.makeId(),
    subject: "party!",
    body: "you come?",
    isRead: false,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    sentAt: 1551133930594,
    to: "momo@momo.com",
  },
];

const MAILS_KEY = "MailsDb";
_createMails();

// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
//    }

export const mailService = {
  query,
  remove,
  save,
  getById,
  createMail,
  getMailsInMode,
  getEmptyMail,
  percentage,
};

async function query(filterBy, searchKeywords) {
  let emails = await storageService.query(MAILS_KEY).then((emails) => {
    return emails;
  });
  let filteredEmails;
  if (!filterBy) filteredEmails = emails.filter((mail) => !mail.isDeleted);
  if (filterBy === "isRead")
    filteredEmails = emails.filter((mail) => mail.isRead);
  if (filterBy === "isSent")
    filteredEmails = emails.filter((mail) => mail.isSent);
  if (filterBy === "isFavourite")
    filteredEmails = emails.filter((mail) => mail.isFavourite);
  if (filterBy === "isDeleted")
    filteredEmails = emails.filter((mail) => mail.isDeleted);

  if (searchKeywords) {
    filteredEmails = emails.filter(
      (mail) =>
        mail.subject.toLowerCase().includes(searchKeywords.toLowerCase()) ||
        mail.body.toLowerCase().includes(searchKeywords.toLowerCase())
    );
  }
  return filteredEmails;
}

async function remove(mailId) {
  return await storageService.remove(MAILS_KEY, mailId);
}

function save(mail, mails) {
  if (mail.id) return storageService.update(MAILS_KEY, mail);
  else return storageService.post(MAILS_KEY, mail, mails);
}

function getById(mailId) {
  return storageService.get(MAILS_KEY, mailId);
}

// async function toggleTrash(mailId) {
//   const selectedMail = await getById(mailId);
//   selectedMail.isDeleted = !selectedMail.isDeleted;
//   console.log(
//     "🚀 ~ file: mail.service.js:135 ~ toggleTrash ~ selectedMail",
//     selectedMail
//   );
//   save(selectedMail);
// }

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY);
  if (!mails || !mails.length) {
    mails = [];
    emails.map((mail) => {
      mails.push(createMail(mail));
    });
    utilService.saveToStorage(MAILS_KEY, mails);
  }

  console.log(
    "🚀 ~ file: mail.service.js ~ line 101 ~ _createMails ~ mails",
    mails
  );
  return mails;
}

function createMail(mail) {
  return {
    id: utilService.makeId(),
    name: "Guy Buganim",
    subject: mail.subject,
    body: mail.body,
    isRead: false,
    sentAt: new Date().toDateString().slice(3),
    to: mail.to,
    isFavourite: false,
    isDeleted: false,
    isSent: false,
    isDraft: false,
  };
}
function getEmptyMail(mail) {
  return {
    name: "Guy Buganim",
    subject: mail.subject,
    body: mail.body,
    isRead: false,
    sentAt: new Date().toDateString().slice(3),
    to: mail.to,
    isFavourite: false,
    isDeleted: false,
    isSent: true,
    isDraft: false,
  };
}

function getMailsInMode(mode) {
  return query().then((mails) => {
    switch (mode) {
      case "starred":
        return mails.filter((mail) => mail.importent);
      case "sent":
        return mails.filter((mail) => mail.sent && !mail.isDeleted);
      case "Trash":
        return mails.filter((mail) => mail.isDeleted);
      case "Draft":
        return mails.filter((mail) => mail.isDraft);
      case "inbox":
        return mails.filter(
          (mail) => !mail.isDeleted && !mail.sent && !mail.isDraft
        );
    }
  });
}

function percentage(num, per) {
  return (num / per) * 100;
}

// getModeMails(this.mode ,this.mails)
