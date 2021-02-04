import Icon from '@ant-design/icons';
import React from 'react';

const StringSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M3 7A2 2 0 0 0 1 9V17H3V13H5V17H7V9A2 2 0 0 0 5 7H3M3 9H5V11H3M15 10.5V9A2 2 0 0 0 13 7H9V17H13A2 2 0 0 0 15 15V13.5A1.54 1.54 0 0 0 13.5 12A1.54 1.54 0 0 0 15 10.5M13 15H11V13H13V15M13 11H11V9H13M19 7A2 2 0 0 0 17 9V15A2 2 0 0 0 19 17H21A2 2 0 0 0 23 15V14H21V15H19V9H21V10H23V9A2 2 0 0 0 21 7Z"
    />
  </svg>
);

const IntergerSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M4,17V9H2V7H6V17H4M22,15C22,16.11 21.1,17 20,17H16V15H20V13H18V11H20V9H16V7H20A2,2 0 0,1 22,9V10.5A1.5,1.5 0 0,1 20.5,12A1.5,1.5 0 0,1 22,13.5V15M14,15V17H8V13C8,11.89 8.9,11 10,11H12V9H8V7H12A2,2 0 0,1 14,9V11C14,12.11 13.1,13 12,13H10V15H14Z"
    />
  </svg>
);

const BooleanSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z"
    />
  </svg>
);

const UserSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
    />
  </svg>
);

const ChannelSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z"
    />
  </svg>
);

const RoleSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19,17H11V16C11,14.67 13.67,14 15,14C16.33,14 19,14.67 19,16M15,9A2,2 0 0,1 17,11A2,2 0 0,1 15,13A2,2 0 0,1 13,11C13,9.89 13.9,9 15,9M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
    />
  </svg>
);

const SubCommandGroupSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M4 4C2.89 4 2 4.89 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V8C22 6.89 21.1 6 20 6H12L10 4H4M12 9H15V11H12V9M16 9H19V11H16V9M12 12H15V14H12V12M16 12H19V14H16V12M12 15H15V17H12V15M16 15H19V17H16V15Z"
    />
  </svg>
);

const SubCommandSVG = () => (
  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M3,3H9V7H3V3M15,10H21V14H15V10M15,17H21V21H15V17M13,13H7V18H13V20H7L5,20V9H7V11H13V13Z"
    />
  </svg>
);

const icons: { [key: string]: JSX.Element } = {
  String: <Icon component={StringSVG} />,
  Integer: <Icon component={IntergerSVG} />,
  Boolean: <Icon component={BooleanSVG} />,
  User: <Icon component={UserSVG} />,
  Channel: <Icon component={ChannelSVG} />,
  Role: <Icon component={RoleSVG} />,
  SubCommandGroup: <Icon component={SubCommandGroupSVG} />,
  SubCommand: <Icon component={SubCommandSVG} />,
};

export default icons;
