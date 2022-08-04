import { memo, useEffect } from "react";

function Content({ children, className }) {
  useEffect(() => {
    console.log("content");
  });
  return <div className={className}>{children}</div>;
}

export default memo(Content);
