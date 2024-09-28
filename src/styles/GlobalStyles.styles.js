import { createGlobalStyle } from "styled-components";

const lightTheme = {
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
  selecticoncolor: "#fff",
  btnBgColor: "#000",
  btnBgColor: "#fff",
};
const darkTheme = {
  logoColor: "#fff",
  bodyBg: "#000000",
  fontcolor: "#fff",
  borderWrapper: "#252525",
  borderColor: "#181818",
  bordershadow: "0 0 15px #000",
  selecticoncolor: "#F3F5F7",
  borderstroke: "#343535",
  mouseHoverBg: "#1F1F1F",
  mouseHoverFontcolor: "#fff",
  headerBg: "#1E1E1E",
  selecticoncolor: "#262626",
  btnBgColor: "#F3F5F7",
  btnBgColor: "#000",
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
time, mark, audio, video {
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

export { lightTheme, darkTheme };

export default GlobalStyles;
