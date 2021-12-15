import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

export default ({
  writer,
  publisher_name,
  publication_date,
  category,
  hit,
}: any) => {
  return (
    <div className="detail-book-info-container">
      <div>
        <ul className="detail-book-info1">
          <li className="detail-writer">{writer}</li>
          <li></li>
          <li className="detail-publisher">{publisher_name}</li>
          <li></li>
          <li className="detail-publication-date">{publication_date}</li>
        </ul>
      </div>
      <div>
        <ul className="detail-book-info2">
          <li className="detail-publication-category">{category}</li>
          <li></li>
          <li className="detail-book-hit">조회수: {hit}</li>
        </ul>
      </div>
    </div>
  );
};
