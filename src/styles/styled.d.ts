import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    logoColor: string;
    bodyBg: string;
    fontcolor: string;
    borderWrapper: string;
    borderColor: string;
    bordershadow: string;
    selecticoncolor: string;
    borderstroke: string;
    mouseHoverBg: string;
    mouseHoverFontcolor: string;
    headerBg: string;
    btnBgColor: string;
    loginInputSelectColor: string;
    navIconColor: string;

    // 필요에 따라 추가 속성 정의
  }
}
