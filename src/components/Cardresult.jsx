import React from "react";

export default function Cardresult(props) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Nom de la course : {props.raceName}</h2>
        <h2>Jour de la course : {props.date}</h2>
        <div className="card-actions justify-end">
          <a href={props.lien} className="btn btn-primary">
            En savoir plus
          </a>
        </div>
      </div>
    </div>
  );
}
