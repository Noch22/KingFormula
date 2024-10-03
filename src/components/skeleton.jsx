import React from "react";

export default function skeleton() {
  return (
    <div className="overflow-x-auto w-5/6 place-content-center">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Constructeur</th>
            <th className="flex flex-col items-center">Vitesse moyenne</th>
            <th>Points</th>
            <th>Tours</th>
            <th className="flex flex-col items-center">
              Tour le plus rapide⚡
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Skeleton Rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className="skeleton w-12 h-6"></div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 skeleton"></div>
                  </div>
                  <div>
                    <div className="font-bold skeleton w-24 h-6"></div>
                    <div className="text-sm opacity-50 skeleton w-16 h-4"></div>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm skeleton w-20 h-6"></span>
              </td>
              <td className="flex flex-col justify-center items-center">
                <div className="skeleton w-16 h-6"></div>
              </td>
              <td>
                <div className="skeleton w-10 h-6"></div>
              </td>
              <td>
                <div className="skeleton w-8 h-6"></div>
              </td>
              <td className="flex flex-col items-center justify-center">
                <div className="skeleton w-32 h-6"></div>
              </td>
              <th>
                <div className="skeleton w-20 h-8"></div>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th>Place</th>
            <th>Nom</th>
            <th>Constructeur</th>
            <th>Vitesse moyenne</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
