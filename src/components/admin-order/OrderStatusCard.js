import React from "react";

export default function Statistical({ bgColor, headerText, count, bodyText }) {
    return (
        <div className="col">
            <div
                className={`card text-white ${bgColor} mb-3`}
                style={{ maxWidth: "18rem" }}
            >
                <div className="card-header">{headerText}</div>
                <div className="card-body">
                    <h5 className="card-title">{count}</h5>
                    <p className="card-text">{bodyText}</p>
                </div>
            </div>
        </div>
    );
}
