import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  logoColor: "#000",
  bodyBg: "#F2F2F2",
  fontcolor: "#000",
  borderWrapper: "#F5F5F5",
  borderColor: "#fff",
  bordershadow: "0 0 15px #C9C9C9",
  selecticoncolor: "#000000",
  borderstroke: "#E9E9E9",
  mouseHoverBg: "#ECECEC",
  mouseHoverFontcolor: "#000",
  headerBg: "#fff",
  btnBgColor: "#fff", // 중복 제거
  loginInputSelectColor: "#5987DC",
};

export const darkTheme: DefaultTheme = {
  logoColor: "#fff",
  bodyBg: "#000000",
  fontcolor: "#fff",
  borderWrapper: "#252525",
  borderColor: "#181818",
  bordershadow: "0 0 15px #000",
  selecticoncolor: "#262626", // 중복된 selecticoncolor 수정
  borderstroke: "#343535",
  mouseHoverBg: "#1F1F1F",
  mouseHoverFontcolor: "#fff",
  headerBg: "#1E1E1E",
  btnBgColor: "#000", // 중복 제거
  loginInputSelectColor: "#488EE3",
};

const GlobalStyles = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	background-color: ${(props) => props.theme.bodyBg};
	color: ${(props) => props.theme.bodyColor};
	line-height: 1;
	/* background-color: #F2F2F2; */
}
ol, ul {
	list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

`;

// export { lightTheme, darkTheme };

export default GlobalStyles;
