import React from "react";

export const Playing = () => {
  return (
    <div className={"w-full flex justify-center py-8"}>
      <div className={"w-60 h-60 rotating"} style={{
        background: `url(https://img.youtube.com/vi/kzrZdqoDzLo/0.jpg)`,
        backgroundSize: '200%',
        backgroundPosition: 'center',
        borderRadius: '50%'
      }}/>
    </div>
  )
};
