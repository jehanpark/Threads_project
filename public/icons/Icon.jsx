import React from "react";
import styled from "styled-components";

// StyledSvg 스타일링
const StyledSvg = styled.svg`
  width: ${(props) => props.width || props.defaultWidth};
  height: ${(props) => props.height || props.defaultHeight};
`;

//Password-eye-close
export const EyeCloseIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "29px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Password-eye-open
export const EyeOpenIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "29px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Clap
export const ClapIcon = ({ width, fill }) => {
  const height = width ? width * 1 : "20px";

  return (
    <StyledSvg
      width={width || "20px"}
      height={height}
      defaultWidth="20px"
      defaultHeight="20px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M283.762,32.835c2.705-1.913,3.346-5.658,1.432-8.363c-1.914-2.705-5.657-3.347-8.363-1.432l-14.984,10.602
        c-2.705,1.913-3.346,5.658-1.432,8.363c1.169,1.652,3.022,2.535,4.902,2.535c1.198,0,2.408-0.358,3.461-1.104L283.762,32.835z"
        fill={fill}
      />
      <path
        d="M244.064,29.387c0.695,0.262,1.409,0.386,2.11,0.386c2.428,0,4.713-1.484,5.617-3.891l6.46-17.182
        c1.166-3.101-0.403-6.561-3.505-7.727c-3.101-1.167-6.562,0.404-7.728,3.505l-6.46,17.182
        C239.393,24.761,240.962,28.221,244.064,29.387z"
        fill={fill}
      />
      <path
        d="M291.223,55.611c-0.041,0-0.082,0-0.124,0l-18.351,0.154c-3.313,0.067-5.944,2.605-5.877,5.918
        c0.066,3.271,2.739,5.928,5.997,5.928c0.041,0,0.082,0,0.124,0l18.351-0.313c3.313-0.068,5.944-2.732,5.877-6.045
        C297.154,57.982,294.481,55.611,291.223,55.611z"
        fill={fill}
      />
      <path
        d="M254.2,147.154c-3.073-2.433-6.711-4.089-10.557-4.867c0.254-0.46,0.491-0.928,0.715-1.403l2.408-2.408
        c9.274-9.275,10.248-23.874,2.264-33.961c-3.769-4.761-9.001-7.925-14.812-9.106c0.415-0.764,0.783-1.545,1.117-2.338
        c6.316-9.149,6.213-21.445-0.782-30.283c-3.77-4.764-9.004-7.938-14.818-9.117c4.8-8.826,4.187-19.826-2.225-27.925
        c-4.848-6.125-12.109-9.639-19.923-9.639c-6.257,0-12.16,2.236-16.792,6.33c-0.701-3.979-2.363-7.822-5.012-11.169
        c-4.849-6.125-12.11-9.638-19.924-9.639l0,0c-6.79,0-13.164,2.635-17.947,7.418l-60.84,60.84l-0.232-8.12
        c-0.107-13.83-11.392-25.049-25.247-25.049c-13.604,0-24.729,10.815-25.229,24.298l-12.146,88.306l-9.983,11.604
        c-5.983,6.957-5.582,17.481,0.915,23.962L19.987,199.7c-4.574,6.881-3.773,16.266,2.206,22.23l69.667,69.557
        c3.329,3.321,7.748,5.148,12.446,5.148c3.857,0,7.668-1.295,10.729-3.645l14.544-11.168c13.991-3.305,29.416-10.813,45.874-22.33
        c14.371-10.058,29.962-23.46,46.337-39.836l34.631-34.631c5.107-5.107,7.795-12.188,7.375-19.427
        C263.376,158.371,259.879,151.649,254.2,147.154z"
        fill={fill}
      />
    </StyledSvg>
  );
};

//Camera
export const CameraIcon = ({ width, fill }) => {
  const height = width ? `${(width / 22) * 18}px` : "18px";
  return (
    <StyledSvg
      width={width || "22px"}
      height={height}
      defaultWidth="22px"
      defaultHeight="18px"
      viewBox="0 0 24 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23 17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H7L9 1H15L17 4H21C21.5304 4 22.0391 4.21071 22.4142 4.58579C22.7893 4.96086 23 5.46957 23 6V17Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Piture
export const PictureIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 15L16 10L5 21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Mic
export const MicIcon = ({ width, fill }) => {
  const height = width ? `${(width / 14) * 19}px` : "19px";

  return (
    <StyledSvg
      width={width || "14px"}
      height={height}
      defaultWidth="14px"
      defaultHeight="19px"
      viewBox="0 0 14 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19V23"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 23H16"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Hashtag
export const HashtagIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";
  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9H20"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15H20"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3L8 21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3L14 21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

// User
export const UserIcon = ({ width, fill }) => {
  const height = width ? `${(width / 16) * 23}px` : "23px";

  return (
    <StyledSvg
      width={width || "16px"}
      height={height}
      defaultWidth="16px"
      defaultHeight="23px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};
