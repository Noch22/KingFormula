import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils";

export default function Racesingle(props) {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={props.image} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {props.title}
            {props.badge ? (
              <div
                className={cn([
                  "badge",
                  props.badge == "Terminée" ? "badge-neutral" : "badge-ghost",
                ])}
              >
                {props.badge}
              </div>
            ) : (
              ""
            )}
          </h2>
          <p>{props.date}</p>
          <div className="card-actions justify-end items-center">
            <div className="badge badge-outline">{props.country}</div>
            <div className="badge badge-outline">{props.city}</div>
            <Link to={props.link} className="btn btn-primary">
              En voir plus
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
