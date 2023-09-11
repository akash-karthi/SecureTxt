import React from "react";

export default function Alerts(props) {
  return (
    <div style={{ height: "30px" }} className="mb-5">
      {props.type != "" && (
        <div
          className={`alert alert-${props.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.msg}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}
