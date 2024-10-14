// EtcModal.jsx
import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1001;
  width: 300px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.cancel ? "#ccc" : "#1d9bf0")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const EtcModal = ({ post, onSave, onCancel }) => {
  const [newContent, setNewContent] = useState(post); // 수정할 내용을 상태로 관리

  const handleSave = () => {
    onSave(newContent); // 부모 컴포넌트로 수정된 내용 전달
  };

  return (
    <ModalWrapper>
      <TextArea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <div>
        <Button onClick={handleSave}>
          게시
          </Button>
        <Button cancel onClick={onCancel}>
          취소
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default EtcModal;
