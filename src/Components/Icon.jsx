import React from "react";
import styled from "styled-components";

// StyledSvg 스타일링
const StyledSvg = styled.svg`
  width: ${(props) => props.width || props.defaultWidth};
  height: ${(props) => props.height || props.defaultHeight};
`;

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        stroke={fill}
        viewBox="0 0 24 24"
        stroke-width="1.5"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </StyledSvg>
  );
};

//Password-eye-close
export const EyeCloseIco = ({ width, fill }) => {
  const height = width ? width * 1 : "29px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"
        fill={fill}
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
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M336 16l0 64c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64c0-8.8 7.2-16 16-16s16 7.2 16 16zm-98.7 7.1l32 48c4.9 7.4 2.9 17.3-4.4 22.2s-17.3 2.9-22.2-4.4l-32-48c-4.9-7.4-2.9-17.3 4.4-22.2s17.3-2.9 22.2 4.4zM135 119c9.4-9.4 24.6-9.4 33.9 0L292.7 242.7c10.1 10.1 27.3 2.9 27.3-11.3l0-39.4c0-17.7 14.3-32 32-32s32 14.3 32 32l0 153.6c0 57.1-30 110-78.9 139.4c-64 38.4-145.8 28.3-198.5-24.4L7 361c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l53 53c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L23 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l93 93c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1L55 185c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l117 117c6.1 6.1 16 6.1 22.1 0s6.1-16 0-22.1l-93-93c-9.4-9.4-9.4-24.6 0-33.9zM433.1 484.9c-24.2 14.5-50.9 22.1-77.7 23.1c48.1-39.6 76.6-99 76.6-162.4l0-98.1c8.2-.1 16-6.4 16-16l0-39.4c0-17.7 14.3-32 32-32s32 14.3 32 32l0 153.6c0 57.1-30 110-78.9 139.4zM424.9 18.7c7.4 4.9 9.3 14.8 4.4 22.2l-32 48c-4.9 7.4-14.8 9.3-22.2 4.4s-9.3-14.8-4.4-22.2l32-48c4.9-7.4 14.8-9.3 22.2-4.4z"
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
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        stroke={fill || "#BABABA"}
        strokeWidth="1.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        stroke={fill || "#BABABA"}
        strokeWidth="1.5"
      />
    </StyledSvg>
  );
};

//Piture
export const PictureIcon = ({ width, fill }) => {
  const height = width ? `${(width / 512) * 512}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      defaultWidth="24px"
      defaultHeight="24px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M448 80c8.8 0 16 7.2 16 16l0 319.8-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3L48 96c0-8.8 7.2-16 16-16l384 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
        fill={fill || "#BABABA"}
      />
    </StyledSvg>
  );
};

//Mic
export const MicIcon = ({ width, fill }) => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
        stroke={fill || "#BABABA"}
        strokeWidth="1.5"
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
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        stroke={fill || "#BABABA"}
        strokeWidth="1.5"
      />
    </StyledSvg>
  );
};

//Heart
export const HeartIcon = ({ width, fill }) => {
  const height = width ? `${(width / 20) * 17.444}px` : "17.444px";

  return (
    <StyledSvg
      width={width || "20px"}
      height={height}
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.4578 2.54219C18.9691 2.05327 18.3889 1.66542 17.7503 1.40081C17.1117 1.1362 16.4272 1 15.7359 1C15.0446 1 14.3601 1.1362 13.7215 1.40081C13.0829 1.66542 12.5026 2.05327 12.0139 2.54219L10.9997 3.55639L9.98554 2.54219C8.99842 1.55507 7.6596 1.00051 6.26361 1.00051C4.86761 1.00051 3.52879 1.55507 2.54168 2.54219C1.55456 3.52931 1 4.86812 1 6.26412C1 7.66012 1.55456 8.99894 2.54168 9.98605L3.55588 11.0003L10.9997 18.4441L18.4436 11.0003L19.4578 9.98605C19.9467 9.49737 20.3346 8.91714 20.5992 8.27851C20.8638 7.63989 21 6.95539 21 6.26412C21 5.57285 20.8638 4.88835 20.5992 4.24973C20.3346 3.6111 19.9467 3.03088 19.4578 2.54219Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//DM
export const DmIcon = ({ width, fill }) => {
  const height = width ? `${(width / 22) * 22}px` : "20px";

  return (
    <StyledSvg
      width={width || "20px"}
      height={height}
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 1L10 12M21 1L14 21L10 12M21 1L1 8L10 12"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Speech Bubble
export const SpeechBubbleIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "19.458px"}
      height={width ? `${(width / 19.458) * 18}px` : "18px"}
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4577 9.50003C20.4614 10.8199 20.1281 12.1219 19.4848 13.3C18.7221 14.7118 17.5496 15.8992 16.0986 16.7293C14.6476 17.5594 12.9754 17.9994 11.2693 18C9.84259 18.0035 8.43513 17.6951 7.16161 17.1L1 19L3.05387 13.3C2.41061 12.1219 2.07726 10.8199 2.08098 9.50003C2.08164 7.92179 2.55728 6.37488 3.45461 5.03258C4.35194 3.69028 5.63553 2.6056 7.16161 1.90003C8.43513 1.30496 9.84259 0.996587 11.2693 1.00003H11.8098C14.063 1.11502 16.1911 1.99479 17.7868 3.47089C19.3824 4.94699 20.3334 6.91568 20.4577 9.00003V9.50003Z"
        stroke={fill || "#BABABA"}
        strokeWidth="2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//Plus
export const PlusIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "14px"}
      height={width ? `${(width / 24) * 24}px` : "14px"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12H19"
        stroke={fill || "#BABABA"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

//MagnifyingGlassIcon
export const MagnifyingGlassIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        stroke={fill || "#545454"}
      />
    </StyledSvg>
  );
};

//BellOffIcon
export const BellOffIcon = ({ width, fill }) => {
  const height = width ? `${(width / 24) * 24}px` : "24px";

  return (
    <StyledSvg
      width={width || "24px"}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
        stroke={fill || "#1D1D1D"}
      />
    </StyledSvg>
  );
};

//Star
export const StarIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "10px"}
      height={width ? `${(width / 10) * 10}px` : "10px"}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_609_3283)">
        <path
          d="M5.00065 0.833374L6.28815 3.44171L9.16732 3.86254L7.08398 5.89171L7.57565 8.75837L5.00065 7.40421L2.42565 8.75837L2.91732 5.89171L0.833984 3.86254L3.71315 3.44171L5.00065 0.833374Z"
          fill={fill || "white"}
        />
      </g>
      <defs>
        <clipPath id="clip0_609_3283">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </StyledSvg>
  );
};

//RetweetIcon
export const RetweetIcon = ({ width, fill }) => {
  return (
    <StyledSvg
      width={width || "26.64px"}
      height={width ? `${(width / 26.64) * 15.98}px` : "15.98px"}
      viewBox="0 0 28 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.10773 0.189636C6.40124 0.189636 5.7237 0.470285 5.22414 0.969843C4.72458 1.4694 4.44393 2.14695 4.44393 2.85343V10.8448H0.448242L5.77583 16.1724L11.1034 10.8448H7.10773V2.85343H16.431L19.0948 0.189636H7.10773ZM20.4267 5.51722H16.431L21.7586 0.189636L27.0862 5.51722H23.0905V13.5086C23.0905 14.2151 22.8098 14.8926 22.3103 15.3922C21.8107 15.8917 21.1332 16.1724 20.4267 16.1724H8.43962L11.1034 13.5086H20.4267V5.51722Z"
        fill={fill || "#BABABA"}
      />
    </StyledSvg>
  );
};
