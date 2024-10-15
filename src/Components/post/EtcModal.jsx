import React, { useState } from "react";
import styled from "styled-components";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { CameraIcon, PictureIcon } from "../Common/Icon";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AllWrapp = styled.div`
  /* position: relative;  */
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  width: 100%;
  z-index: 900;
  border: 1px solid red;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  left: 50px;
  width: 580px;
  height: 360px;
  border-radius: 12px;
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  @media (max-width: 768px) {
    height: 340px;
    margin: 10px;
  }
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  z-index: 999999;
  @media (max-width: 768px) {
    border-radius: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
    border-radius: 0px 0px 0px 0px;
  }
`;

const TextArea = styled.textarea`
  background: ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontcolor};
  border: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
  resize: none;
  padding: 0px;
  font-family: var(--pretendard-font);
  font-weight: 300;
  &::placeholder {
    color: #bababa;
    opacity: 1;
    font-size: 16px;
    transition: opacity 0.3s;
  }
  &:focus {
    &::placeholder {
      opacity: 0;
    }
    outline: none;
  }
`;
const PlusImage = styled.div`
  display: flex;
  margin: 10px 20px;
  gap: 10px;
  width: 90%;
  height: 300px;
`;

const Buttons = styled.div`
  width: 100%;
  border-top: 1px solid rgba(204, 204, 204, 0.4);
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: 10px;
  justify-content: center;
`;

const CameraButton = styled.label`
  cursor: pointer;
  fill: none;
`;
const CameraInput = styled.input`
  display: none;
`;

const PictureButton = styled.label`
  cursor: pointer;
`;
const PictureInput = styled.input`
  display: none;
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const UploadButton = styled.button`
  background: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.logoColor};
  border: 1px solid ${(props) => props.theme.borderstroke};
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.2s;
  &:hover {
    background: ${(props) => props.theme.mouseHoverBg};
    color: ${(props) => props.theme.mouseHoverFontcolor};
  }
`;

const DelButton = styled.button`
  background: ${(props) => props.theme.mouseHoverBg};
  color: ${(props) => props.theme.fontcolor};
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const EtcModal = ({
  onSave,
  post,
  photos,
  id,
  onCancel,
  setIsEtcModalOpen,
}) => {
  const [newContent, setNewContent] = useState(post); // 수정할 내용을 상태로 관리
  const [files, setFiles] = useState([]);

  const handleSave = async () => {
    try {
      let newFileUrls = [];

      // 선택된 파일이 있으면 Firebase Storage에 업로드
      if (files.length > 0) {
        for (const file of files) {
          const fileRef = ref(storage, `posts/${id}/${file.name}`);
          await uploadBytes(fileRef, file);
          const fileUrl = await getDownloadURL(fileRef);
          newFileUrls.push(fileUrl);
        }
      }

      // Firestore에 수정된 내용 및 사진 업데이트
      const postRef = doc(db, "contents", id);
      await updateDoc(postRef, {
        post: newContent,
        photos: newFileUrls.length > 0 ? newFileUrls : photos, // 새로운 사진이 있으면 업데이트
      });

      onSave(newContent); // 부모 컴포넌트로 수정된 내용을 전달
      setIsEtcModalOpen(false); // 모달 닫기
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const maxFilesCount = 3;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <AllWrapp>
      {/* 어두운 배경을 클릭하면 모달이 닫히도록 설정 */}
      <ModalOverlay onClick={() => setIsEtcModalOpen(false)}>
        {/* ModalWrapper는 ModalOverlay 안에 위치하여 화면 중앙에 배치됩니다 */}
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <TextAreaWrapper>
            <TextArea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="내용을 입력하세요 ..."
            />
          </TextAreaWrapper>
          <PlusImage>
            {files.map((file, index) => (
              <div key={index} style={{ position: "relative", margin: "5px" }}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded Preview ${index + 1}`}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    controls
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={URL.createObjectURL(file)} />
                  </video>
                ) : (
                  <audio
                    controls
                    src={URL.createObjectURL(file)}
                    style={{
                      width: "140px", // 오디오 컨트롤러의 너비를 이미지/비디오와 맞춤
                      height: "40px", // 오디오 컨트롤러의 높이 설정
                      borderRadius: "10px", // 일관성을 위해 오디오에도 경계 반경 적용
                      objectFit: "contain",
                    }}
                  >
                    Your browser does not support the audio element.
                  </audio>
                )}
                <DeleteButton onClick={() => removeFile(index)}>X</DeleteButton>
              </div>
            ))}
          </PlusImage>
          <Buttons>
            <Icons>
              <CameraButton htmlFor="camera">
                <CameraIcon width={36} />
                <CameraInput
                  onChange={handleFileChange}
                  id="camera"
                  type="file"
                  accept="video/*, image/*"
                />
              </CameraButton>
              <PictureButton htmlFor="picture">
                <PictureIcon width={24} />
                <PictureInput
                  onChange={handleFileChange}
                  id="picture"
                  type="file"
                  accept="video/*, image/*"
                />
              </PictureButton>
            </Icons>
            <EditButton>
              <UploadButton onClick={handleSave}>저장</UploadButton>
              <DelButton cancel onClick={onCancel}>
                취소
              </DelButton>
            </EditButton>
          </Buttons>
        </ModalWrapper>
      </ModalOverlay>
    </AllWrapp>
  );
};

export default EtcModal;
