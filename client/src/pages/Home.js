import React from "react";
import PictureMap from "../common/PictureMap";
import ImageMarker from "../common/ImageMarker";
import Login from "../common/Login";

export default function Home() {
  return (
    <div className="overflow-auto">
      <PictureMap />
      <Login />
    </div>
  );
}
