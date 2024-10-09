import React, { useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import BorderItem from "../Components/Common/Border_de";
import {
  LockIcon,
  EyeCloseIcon,
  Thread100Icon,
  CloseIcon,
  NotHeartIcon,
  ShareIconNew,
  RightArrowIcon,
  CloseLockIcon,
  DeleteProfileIcon,
  EalthIcon,
  InfoDownIcon,
  PersonalInfoIcon,
  SupervisionIcon,
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
const SettingMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 169.77px;
  height: 48px;
  -webkit-tap-highlight-color: transparent;
`;
const SettingTitle = styled.div.attrs({ className: "common-style" })`
  font-size: 18px;
  width: 120px;
  text-align: center; /* 가운데 정렬 */
  line-height: calc(1.4 * 1.3em);
  overflow-y: visible;
  word-wrap: break-word;
  border-bottom: 1px solid #181818;
  font-weight: 600;
  margin-bottom: 12px;
  cursor: pointer;
  &:hover {
    color: dodgerblue;
    border-bottom: 1px solid dodgerblue;
  }
`;
const SettingMove = styled.a`
  display: flex;
  align-items: center;
  margin: 20px auto;
  gap: 50px; /* 간격 조절 */
`;

// 기타 개인정보 설정 묶음
const OtherSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
`;
const OutherPrivacy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 509.33px;
  height: 100%;
  padding: 0 24px;
  gap: 30px;
`;
// 기타 개인정보 설정 텍스트
const OtherPivInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 590.67px;
  height: 57.8px;
  padding: 8px 0px;
`;
const OtherTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const OtherInfo = styled.span`
  font-size: 11px;
  font-weight: 400;
  width: 462px;
  color: #999;
  margin-top: 12px;
  line-height: calc(1.4 * 1.3em);
`;

const PrivacySettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 10px auto;
  width: 509.33px;
  padding: 0 24px;
  gap: 20px;
`;
const PrivacyProfile = styled.div`
  width: 100%;
  height: 21px;
  text-align: start;
  display: flex;
  justify-content: start;
  align-items: center;
`;
const PrivacyTitle = styled.span`
  font-size: 16px;
  margin-left: 14px;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

// 계정 설정
const AccountSettings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 8px;
`;
const AccountContents = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 460.33px;
  gap: 20px;
`;
const AccountTitle = styled.span`
  font-size: 16px;
  margin-left: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

const HelpTitle = styled.span`
  font-size: 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: calc(1.4 * 1.3em);
`;

// 아이콘 정렬
const TitleAutoLayout = styled.div``;

const ContentAutoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Icon = styled.div`
  width: 20px;
  height: 20px;
  text-align: center;
`;
const IconRadius = styled.div`
  width: 20px;
  height: 20px;
  text-align: center;
  border: 2px solid #000;
  border-radius: 100%;
`;

// 줄
const Line = styled.hr`
  width: 96%;
  border: none;
  height: 1px;
  background-color: #bababa;
`;

const SettingsItem_de = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [activeTab, setActiveTab] = useState("privacy"); // 초기값을 "privacy"로 설정

  // 각 탭 클릭 시 호출되는 함수
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Wrapper>
      <BorderItem type="settingsWrapper" isSmallScreen={isSmallScreen}>
        <SettingMenu>
          <SettingMove>
            <SettingTitle
              className="common-style"
              onClick={() => handleTabClick("privacy")}
            >
              개인정보보호
            </SettingTitle>
            <SettingTitle
              className="common-style"
              onClick={() => handleTabClick("account")}
            >
              계정
            </SettingTitle>
            <SettingTitle
              className="common-style"
              onClick={() => handleTabClick("help")}
            >
              도움말
            </SettingTitle>
          </SettingMove>
        </SettingMenu>

        {/* 현재 활성화된 탭에 따라 다른 내용을 렌더링 */}
        {activeTab === "privacy" && (
          <PrivacySettings>
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
                <IconRadius>
                  <CloseIcon width={"10px"} fill={"black"} />
                </IconRadius>
                <ContentAutoLayout>
                  <PrivacyTitle>차단된 프로필</PrivacyTitle>
                  <Icon>
                    <ShareIconNew
                      width={"20px"}
                      stroke="#999"
                      strokeWidth="2"
                    />
                  </Icon>
                </ContentAutoLayout>
              </PrivacyProfile>
              <PrivacyProfile>
                <Icon>
                  <NotHeartIcon width={"20px"} fill={"black"} />
                </Icon>
                <ContentAutoLayout>
                  <PrivacyTitle>좋아요 수 및 공유 수 숨기기</PrivacyTitle>
                  <Icon>
                    <ShareIconNew
                      width={"20px"}
                      stroke="#999"
                      strokeWidth="2"
                    />
                  </Icon>
                </ContentAutoLayout>
              </PrivacyProfile>
            </OtherSettings>
          </PrivacySettings>
        )}

        {activeTab === "account" && (
          <OutherPrivacy>
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
                    <PersonalInfoIcon width={"30px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>개인정보</PrivacyTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <FamilyIcon style={{ width: "20px", height: "20px" }} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>관리 감독</PrivacyTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <SecurityIcon style={{ width: "20px", height: "20px" }} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>보안</PrivacyTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <AccountStatusIcon width="22px" fill="#000" />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>계정 상태</PrivacyTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <InfoDownIcon width={"20px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>내 정보 다운로드</PrivacyTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <Icon>
                    <NotHeartIcon width={"20px"} fill={"black"} />
                  </Icon>
                  <ContentAutoLayout>
                    <PrivacyTitle>내 정보 전송</PrivacyTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
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
                      <RightArrowIcon fill={"gray"} width={"14px"} />
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
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Meta 개인정보처리방침</HelpTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Meta 이용약관</HelpTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Threads 추가 개인정보처리방침</HelpTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>Threads 이용 약관</HelpTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>쿠키 정책</HelpTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
                <PrivacyProfile>
                  <ContentAutoLayout>
                    <HelpTitle>페디버스 가이드</HelpTitle>
                    <Icon>
                      <ShareIconNew
                        width={"20px"}
                        stroke="#999"
                        strokeWidth="2"
                      />
                    </Icon>
                  </ContentAutoLayout>
                </PrivacyProfile>
              </OtherSettings>
            </AccountSettings>
          </OutherPrivacy>
        )}
      </BorderItem>
    </Wrapper>
  );
};

export default SettingsItem_de;
