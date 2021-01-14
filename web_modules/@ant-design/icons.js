import { r as react } from '../common/index-df124c49.js';
import { _ as _objectWithoutProperties, w as warning, u as useInsertStyles, c as classnames, a as _objectSpread2, s as svgBaseProps } from '../common/utils-5b7d8646.js';

var Icon = /*#__PURE__*/react.forwardRef(function (props, ref) {
  var className = props.className,
      Component = props.component,
      viewBox = props.viewBox,
      spin = props.spin,
      rotate = props.rotate,
      tabIndex = props.tabIndex,
      onClick = props.onClick,
      children = props.children,
      restProps = _objectWithoutProperties(props, ["className", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children"]);

  warning(Boolean(Component || children), 'Should have `component` prop or `children`.');
  useInsertStyles();
  var classString = classnames('anticon', className);
  var svgClassString = classnames({
    'anticon-spin': !!spin
  });
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;

  var innerSvgProps = _objectSpread2(_objectSpread2({}, svgBaseProps), {}, {
    className: svgClassString,
    style: svgStyle,
    viewBox: viewBox
  });

  if (!viewBox) {
    delete innerSvgProps.viewBox;
  } // component > children


  var renderInnerNode = function renderInnerNode() {
    if (Component) {
      return /*#__PURE__*/react.createElement(Component, Object.assign({}, innerSvgProps), children);
    }

    if (children) {
      warning(Boolean(viewBox) || react.Children.count(children) === 1 && /*#__PURE__*/react.isValidElement(children) && react.Children.only(children).type === 'use', 'Make sure that you provide correct `viewBox`' + ' prop (default `0 0 1024 1024`) to the icon.');
      return /*#__PURE__*/react.createElement("svg", Object.assign({}, innerSvgProps, {
        viewBox: viewBox
      }), children);
    }

    return null;
  };

  var iconTabIndex = tabIndex;

  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  return /*#__PURE__*/react.createElement("span", Object.assign({
    role: "img"
  }, restProps, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), renderInnerNode());
});
Icon.displayName = 'AntdIcon';

export default Icon;
