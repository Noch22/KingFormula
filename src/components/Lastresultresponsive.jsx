import React from "react";

export default function (props) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="avatar">
        <div className="w-16 rounded-full">
          <img src={props.avatarurl} />
        </div>
      </div>
      <div className="card-body">
        <div className="flex flex-row items-center gap-2">
          <h2 className="card-title">
            <b>{props.place}.</b> {props.name}
          </h2>
          <div className="text-sm opacity-50">
            {props.nationality} {props.flag}
          </div>
        </div>
        <div>
          <h3>Constructeur : {props.constructeur}</h3>
          <h3>
            Vitesse moyenne : {props.vitesse}{" "}
            {props.isFastest && (
              <span className="indicator-item badge badge-secondary ml-2">
                plus rapide⚡
              </span>
            )}
          </h3>
          <h3>Points : {props.points} </h3>
          <h3>Tours : {props.tours} </h3>
          <h3>
            Tour le plus rapide : {props.besttour}{" "}
            {props.fastestLap && (
              <span className="indicator-item badge badge-primary ml-2">
                meilleur tour🚀
              </span>
            )}{" "}
          </h3>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
