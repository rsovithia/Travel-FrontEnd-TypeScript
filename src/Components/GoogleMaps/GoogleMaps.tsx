import React, { useEffect } from "react";

const GoogleMap: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  useEffect(() => {
    const iframeData = document.getElementById("iframeId") as HTMLIFrameElement;
    iframeData.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=14&output=embed&markers=${lat},${lon}`;
  }, [lat, lon]);

  return (
    <div>
      <iframe
        id="iframeId"
        height="500px"
        width="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GoogleMap;
