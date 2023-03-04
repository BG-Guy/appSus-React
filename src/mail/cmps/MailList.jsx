import { MailPreview } from "./MailPreview";

export function MailList({ mails, toggleTrash, toggleFav, onRemoveMail }) {
  return (
    <section className="mail-list max-width-container">
      {mails.map((mail) => (
        <MailPreview
          toggleTrash={toggleTrash}
          onRemoveMail={onRemoveMail}
          key={mail.id}
          mail={mail}
          toggleFav={toggleFav}
        />
      ))}
    </section>
  );
}
