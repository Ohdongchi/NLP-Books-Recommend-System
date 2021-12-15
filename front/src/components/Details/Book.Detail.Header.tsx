import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

export default ({title, sub_title}: any) => {

  return (
    <div className="detail-header">
      <h2 className="detail-title">{title}</h2>
      <p className="detail-sub-title">{sub_title}</p>
    </div>
  );
};
