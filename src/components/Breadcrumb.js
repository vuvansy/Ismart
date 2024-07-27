import React from "react";

export default function Breadcrumb(props) {
    return (
        <div className="secion" id="breadcrumb-wp">
            <div className="secion-detail">
                <ul className="list-item clearfix">
                    <li>
                        <a href="" title="">
                            Trang chủ
                        </a>
                    </li>
                    <li>
                        <a href="" title="">
                            {props.children}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
