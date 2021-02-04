import {Button, Card, Skeleton, Row, Col} from "../../web_modules/antd.js";
import React, {useEffect, useState, useRef} from "../../web_modules/react.js";
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
  const textArea = useRef(null);
  function copy(e) {
    textArea.current?.select();
    document.execCommand("copy");
    e.currentTarget.focus();
  }
  return /* @__PURE__ */ React.createElement(Card, {
    loading: !loaded
  }, /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, useSkeleton ? /* @__PURE__ */ React.createElement(Skeleton, null) : code)), /* @__PURE__ */ React.createElement(Row, {
    justify: "end"
  }, /* @__PURE__ */ React.createElement(Col, {
    span: 1
  }, /* @__PURE__ */ React.createElement(Button, {
    ghost: true,
    type: "primary",
    onClick: copy
  }, "Copy"))), /* @__PURE__ */ React.createElement("textarea", {
    ref: textArea,
    style: {
      height: "0",
      position: "absolute",
      zIndex: -1,
      opacity: ".01"
    },
    value: code
  }));
}
export default CodeBlock;
