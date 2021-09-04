import { r as react } from '../common/index-210ebed7.js';
import { f as forwardRef, I as Icon } from '../common/icon-706dbfa3.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function createIcon(options) {
  var {
    viewBox = "0 0 24 24",
    d: pathDefinition,
    path,
    displayName,
    defaultProps = {}
  } = options;
  var Comp = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/react.createElement(Icon, _extends({
    ref: ref,
    viewBox: viewBox
  }, defaultProps, props), path != null ? path : /*#__PURE__*/react.createElement("path", {
    fill: "currentColor",
    d: pathDefinition
  })));

  return Comp;
}

var CopyIcon = createIcon({
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  displayName: "CopyIcon"
});

var MoonIcon = createIcon({
  d: "M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z",
  displayName: "MoonIcon"
});

var SunIcon = createIcon({
  displayName: "SunIcon",
  path: /*#__PURE__*/react.createElement("g", {
    strokeLinejoin: "round",
    strokeLinecap: "round",
    strokeWidth: "2",
    fill: "none",
    stroke: "currentColor"
  }, /*#__PURE__*/react.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M12 1v2"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M12 21v2"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M4.22 4.22l1.42 1.42"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M18.36 18.36l1.42 1.42"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M1 12h2"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M21 12h2"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M4.22 19.78l1.42-1.42"
  }), /*#__PURE__*/react.createElement("path", {
    d: "M18.36 5.64l1.42-1.42"
  }))
});

export { CopyIcon, MoonIcon, SunIcon, createIcon };
