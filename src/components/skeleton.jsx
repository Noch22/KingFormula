import React from "react";

export default function skeleton() {
  return (
    <div className="overflow-x-auto w-5/6 place-content-center">
      <div className="flex flex-row- justify-between items-center m-5 bg-base-200 p-3 rounded">
        <div>
          <h1 className="text-xl font-medium">
            <div className="skeleton w-56 h-10"></div>
          </h1>
          <p className="text-sm opacity-70">Informations de la course</p>
        </div>
        <div className="flex gap-5 flex-row">
          <div>
            <p className="text-sm opacity-70">Circuit</p>
            <div className="skeleton w-32 h-8"></div>
          </div>
          <div>
            <p className="text-sm opacity-70">Ville</p>
            <div className="skeleton w-20 h-8"></div>
          </div>
          <div>
            <p className="text-sm opacity-70">Date</p>
            <div className="skeleton w-20 h-8"></div>
          </div>
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <div className="skeleton w-20 h-8"></div>
            </th>
            <th>
              <div className="skeleton w-20 h-8"></div>
            </th>
            <th>
              <div className="skeleton w-20 h-8"></div>
            </th>
            <th className="flex flex-col items-center">
              <div className="skeleton w-20 h-8"></div>
            </th>
            <th>
              <div className="skeleton w-20 h-8"></div>
            </th>
            <th>
              <div className="skeleton w-20 h-8"></div>
            </th>
            <th className="flex flex-col items-center">
              <div className="skeleton w-20 h-8"></div>
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
      </table>
    </div>
  );
}
