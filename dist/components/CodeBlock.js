import {Card, Skeleton} from "../../web_modules/antd.js";
import React, {useEffect, useState} from "../../web_modules/react.js";
function CodeBlock({code}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [loaded]);
  const [useSkeleton, setUseSkeleton] = useState(code === "{}");
  useEffect(() => {
    if (code !== "{}") {
      setUseSkeleton(false);
    } else {
      setUseSkeleton(true);
    }
  }, [code]);
  return /* @__PURE__ */ React.createElement(Card, {
    loading: !loaded
  }, /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, useSkeleton ? /* @__PURE__ */ React.createElement(Skeleton, null) : code)));
}
export default CodeBlock;
