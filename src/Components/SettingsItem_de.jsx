import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import BorderItem from "../Components/Common/Border_de";
import { ShareIconNew } from "../Components/Common/Icon";
import {
  LockIcon,
  EyeCloseIcon,
  Thread100Icon,
  CloseIcon,
  NotHeartIcon,
  RightArrowIcon,
  CloseLockIcon,
  DeleteProfileIcon,
  EalthIcon,
  InfoDownIcon,
  PersonalInfoIcon,
  FamilyIcon,
  SecurityIcon,
  AccountStatusIcon,
} from "../Components/Common/Icon";

// import { Line } from "../Components/Login/Insiteitem_de";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SettingsInner = styled.div`
  width: 558.67px; // 수정!
  height: 100%;
  padding: 20px 0;
  background: #fff;
  margin-top: 30px;
  border: 1px solid rgb(213, 213, 213);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 70px);
    margin: 0;
    border-radius: 0;
  }
`;

const SettingMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 169.77px;
  height: 48px;
  -webkit-tap-highlight-color: transparent;
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const SettingTitle = styled.div.attrs({ className: "common-style" })`
  font-size: 14px;
  width: 120px;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
  font-weight: 600;
  margin-bottom: 8px;
  cursor: pointer;
  position: relative; /* 자식 요소의 절대 위치 설정을 위한 relative */
  @media (max-width: 768px) {
    width: 80px;
  }
`;
const SettingMove = styled.div`
  display: flex;
  margin: 20px auto;
  gap: 50px; /* 간격 조절 */
  border-bottom: 2px solid transparent; /* 기본 border-bottom 설정 */
  transition: border-color 0.3s ease-in-out; /* 자연스러운 transition 추가 */
  position: relative; /* 부모 요소의 위치 설정 */
`;

// 기타 개인정보 설정 묶음
const OtherSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  gap: 20px;
`;
const OutherPrivacy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  gap: 30px;
`;
// 기타 개인정보 설정 텍스트
const OtherPivInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 8px 0px;
  padding: 0 24px;
`;
const OtherTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const OtherInfo = styled.span`
  font-size: 11px;
  font-weight: 400;
  width: 100%;
  color: #999;
  margin-top: 12px;

  line-height: calc(1.4em);
`;
// 개인정보보호
const PrivacySettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin: 8px auto;
  padding: 0 20px;
  gap: 20px;
`;
const PrivacyProfile = styled.div`
  width: 100%;
  height: 21px;
  text-align: start;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 24px;
`;
const PrivacyTitle = styled.span`
  font-size: 14px;
  margin-left: 14px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const PersonalInfoTitle = styled.span`
  font-size: 14px;
  margin-left: 4px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

// 계정 설정
const AccountSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin: 8px auto;
  /* padding: 0 24px; */
  gap: 20px;
  @media (max-width: 768px) {
    padding: 0;
  }
`;
const AccountContents = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    width: 360px;
  }
`;
const AccountTitle = styled.span`
  font-size: 14px;
  margin-left: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const HelpTitle = styled.span`
  font-size: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

// 아이콘 정렬

const ContentAutoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    padding-right: 28px;
  }
`;
const Icon = styled.div`
  height: 20px;
  text-align: end;
  /* padding: 0 10px; */
`;
const IconRadius = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px solid #000;
  border-radius: 100%;
`;

// 줄
const Line = styled.hr`
  width: 98%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 16px 0;
  border: none;
  height: 1px;
  background-color: #bababa;
`;

const ActiveBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: 2px;
  background-color: ${(props) => props.theme.activeBorder};
  transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
`;

// 아이콘 눌렀을 때 링크로 이동
const IconLink = styled.a`
  height: 20px;
  text-align: end;
  /* padding-right: 10px; */
`;

const SettingsItem_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [activeTab, setActiveTab] = useState("privacy");
  const [borderPosition, setBorderPosition] = useState({ left: 0, width: 0 });

  // 각 탭 클릭 시 호출되는 함수
  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    const titleElement = document.getElementById(`setting-title-${index}`);
    if (titleElement) {
      const { offsetLeft, offsetWidth } = titleElement;
      setBorderPosition({ left: offsetLeft, width: offsetWidth }); // border 위치 및 너비 업데이트
    }
  };

  useEffect(() => {
    // 초기 상태에 대한 border 위치 설정
    const titleElement = document.getElementById("setting-title-0");
    if (titleElement) {
      const { offsetLeft, offsetWidth } = titleElement;
      setBorderPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, []);
  return (
    <Wrapper>
      <SettingsInner>
        <SettingMenu>
          <SettingMove>
            <SettingTitle
              id="setting-title-0"
              onClick={() => handleTabClick("privacy", 0)}
            >
              개인정보보호
            </SettingTitle>
            <SettingTitle
              id="setting-title-1"
              onClick={() => handleTabClick("account", 1)}
            >
              계정
            </SettingTitle>
            <SettingTitle
              id="setting-title-2"
              onClick={() => handleTabClick("help", 2)}
              gi
            >
              도움말
            </SettingTitle>
            <ActiveBorder
              left={borderPosition.left}
              width={borderPosition.width}
            />
          </SettingMove>
        </SettingMenu>

        {/* 현재 활성화된 탭에 따라 다른 내용을 렌더링 */}
        {activeTab === "privacy" && (
          <PrivacySettings isSmallScreen={isSmallScreen}>
            <PrivacyProfile>
              <Icon>
                <LockIcon width={"18px"} />
              </Icon>
              <PrivacyTitle>비공개 프로필</PrivacyTitle>
            </PrivacyProfile>
            <PrivacyProfile>
              <Icon>
                <Thread100Icon width={"20px"} fill={"black"} />
              </Icon>
              <PrivacyTitle>언급</PrivacyTitle>
            </PrivacyProfile>
            <PrivacyProfile>
              <Icon>
                <EyeCloseIcon width={"24px"} />
              </Icon>
              <PrivacyTitle>숨겨진 단어</PrivacyTitle>
            </PrivacyProfile>
            <Line />
            {/* 기타 개인정보 설정  */}
            <OtherSettings>
              <OtherPivInfo>
                <OtherTitle>기타 개인정보 설정</OtherTitle>
                <OtherInfo>
                  제한과 같은 일부 설정은 Threads 및 Instagram 모두에 적용되며
                  Instagram에서 관리할 수 있습니다.
                </OtherInfo>
              </OtherPivInfo>
              <PrivacyProfile>
                <Icon>
                  <IconRadius>
                    <CloseIcon width={"10px"} fill={"black"} />
                  </IconRadius>
                </Icon>
                <ContentAutoLayout>
                  <PrivacyTitle>차단된 프로필</PrivacyTitle>
                  <IconLink
                    href="https://www.instagram.com/accounts/blocked_accounts/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShareIconNew
                      width={"14px"}
                      stroke="#999"
                      strokeWidth="2"
                    />
                  </IconLink>
                </ContentAutoLayout>
              </PrivacyProfile>
              <PrivacyProfile>
                <Icon>
                  <NotHeartIcon width={"20px"} fill={"black"} />
                </Icon>
                <ContentAutoLayout>
                  <PrivacyTitle>좋아요 수 및 공유 수 숨기기</PrivacyTitle>
                  <IconLink
                    href="https://www.instagram.com/accounts/like_count/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShareIconNew
                      width={"14px"}
                      stroke="#999"
                      strokeWidth="2"
                    />
                  </IconLink>
                </ContentAutoLayout>
              </PrivacyProfile>
            </OtherSettings>
          </PrivacySettings>
        )}

        {activeTab === "account" && (
          <OutherPrivacy isSmallScreen={isSmallScreen}>
            {/* 계정 탭의 내용 */}
            <AccountSettings>
              <AccountContents>
                <PrivacyProfile>
                  <Icon>
                    <CloseLockIcon width={"20px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <AccountTitle>웹 사이트 권한</AccountTitle>
                    <Icon>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <DeleteProfileIcon width={"22px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <AccountTitle>프로필 비활성화 또는 삭제</AccountTitle>
                    <Icon>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <EalthIcon width={"22px"} />
                  </Icon>
                  <ContentAutoLayout>
                    <AccountTitle>페비더스 공유</AccountTitle>
                    <Icon>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
              </AccountContents>
              <Line />
              <OtherSettings>
                <OtherPivInfo>
                  <OtherTitle>기타 계정 설정</OtherTitle>
                  <OtherInfo>
                    사용자 이름과 비밀번호 같은 일부 설정은 Threads 및 Instagram
                    모두에 적용되며 Instagram에서 관리할 수 있습니다.
                  </OtherInfo>
                </OtherPivInfo>
                <PrivacyProfile>
                  <Icon>
                    <IconLink>
                      <PersonalInfoIcon
                        width={"30px"}
                        height={"30px"}
                        fill={"black"}
                      />
                    </IconLink>
                  </Icon>
                  <ContentAutoLayout>
                    <PersonalInfoTitle>개인정보</PersonalInfoTitle>
                    <IconLink
                      href="https://accountscenter.instagram.com/personal_info/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <FamilyIcon style={{ width: "20px", height: "20px" }} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>관리 감독</PrivacyTitle>
                    <IconLink
                      href="https://familycenter.instagram.com/accounts/17841452333493991/?entrypoint=supervision_web&fc_session_id=b427b3a2-c47f-4a18-9bc0-27d6d0a83683&account_type=INSTAGRAM&is_home_e"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <SecurityIcon style={{ width: "20px", height: "20px" }} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>보안</PrivacyTitle>
                    <IconLink
                      href="https://accountscenter.instagram.com/password_and_security/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <AccountStatusIcon width="22px" fill="#000" />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>계정 상태</PrivacyTitle>
                    <IconLink
                      href="https://accountscenter.instagram.com/password_and_security/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <InfoDownIcon width={"20px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>내 정보 다운로드</PrivacyTitle>
                    <IconLink
                      href="https://accountscenter.instagram.com/info_and_permissions/dyi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <NotHeartIcon width={"20px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>내 정보 전송</PrivacyTitle>
                    <IconLink
                      href="https://accountscenter.instagram.com/info_and_permissions/tyi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
              </OtherSettings>
            </AccountSettings>
          </OutherPrivacy>
        )}

        {activeTab === "help" && (
          <OutherPrivacy>
            {/* 도움말 탭의 내용 */}
            <AccountSettings>
              <AccountContents>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>개인정보 보호 및 보안 도움말</HelpTitle>
                    <Icon>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>지원 요청</HelpTitle>
                    <Icon>
                      <RightArrowIcon fill={"gray"} width={"12px"} />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
              </AccountContents>
              <Line />
              <OtherSettings>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>고객센터</HelpTitle>
                    <IconLink
                      href="https://help.instagram.com/179980294969821/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Meta 개인정보처리방침</HelpTitle>
                    <IconLink
                      href="https://www.facebook.com/privacy/policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Meta 이용약관</HelpTitle>
                    <IconLink
                      href="https://help.instagram.com/581066165581870"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Threads 추가 개인정보처리방침</HelpTitle>
                    <IconLink
                      href="https://help.instagram.com/515230437301944"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Threads 이용 약관</HelpTitle>
                    <IconLink
                      href="https://help.instagram.com/769983657850450"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>쿠키 정책</HelpTitle>
                    <IconLink
                      href="https://privacycenter.instagram.com/policies/cookies/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>페디버스 가이드</HelpTitle>
                    <IconLink
                      href="https://www.facebook.com/privacy/guide/fediverse/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShareIconNew
                        width={"14px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </IconLink>
                  </ContentAutoLayout>
                </PrivacyProfile>
              </OtherSettings>
            </AccountSettings>
          </OutherPrivacy>
        )}
      </SettingsInner>
    </Wrapper>
  );
};

export default SettingsItem_de;
