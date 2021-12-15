import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

export default ({ image_url, intro }: any) => {
  return (
    <div className="detail-book-intro">
      <img className="detail-image" src={image_url} />
      <div>
        <label className="detail-book-intro-label">소개:</label>
        {intro}
      </div>
    </div>
  );
};
