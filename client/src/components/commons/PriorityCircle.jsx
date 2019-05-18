import React from "react";
import { priority } from "./priority";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PriorityCircle({
  item,
  onPriorityChange,
  showLabel,
  className
}) {
  return (
    <div
      className="priority-circle clickable"
      onClick={e => {
        if (onPriorityChange) {
          onPriorityChange(item);
        }
        e.stopPropagation();
      }}
    >
      <FontAwesomeIcon
        icon="circle"
        className={`priority priority${item.priority} ${className}`}
      />
      {showLabel ? (
        <span className="priority-label">
          {Object.keys(priority).find(key => priority[key] === item.priority)}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
