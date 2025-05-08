import React from "react";
import { formatDate } from "../../utils/formatDateUtils";

export default function ItemContent({item}) {
  return (
    <div className="">
      <div className="flex items-center space-x-4 text-gray-600">
        <div className="flex items-center">
          <span>{formatDate(item.startDate)}</span>
        </div>
        <div className="flex items-center">
          <span>-</span>
        </div>
        <div className="flex items-center">
          <span>{formatDate(item.endDate)}</span>
        </div>
      </div>
      <div className="mt-4 text-gray-700">{item.content}</div>
    </div>
  );
}
