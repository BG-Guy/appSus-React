import React from "react";
import { useParams } from "react-router-dom";
import ComposeMail from "../cmps/ComposeMail";

export default function ComposeMailPage() {
  const { id } = useParams;
  return (
    <div className="compose-email-page">
      <ComposeMail />
    </div>
  );
}
