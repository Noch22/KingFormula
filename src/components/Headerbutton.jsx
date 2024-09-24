import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils";

export default function Headerbutton(props) {
  return (
    <Link
      to={props.lien}
      className={cn([
        "btn",
        props.active ? "btn-active" : "btn-ghost",
        "text-left",
      ])}
    >
      {props.nom}
    </Link>
  );
}
