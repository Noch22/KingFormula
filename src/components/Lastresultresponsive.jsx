import React from "react";

export default function (props) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={props.avatarurl} />
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
