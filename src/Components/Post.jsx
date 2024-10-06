import React, { useState } from "react";
import styled from "styled-components";
// import { IPost } from "./TimeLine";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  HeartIcon,
  DmIcon,
  MagnifyingGlassIcon,
  BellOffIcon,
  RetweetIcon,
  Coment,
} from "../Components/Common/Icon";
// Styled Components

const Wrapper = styled.div`
width: 100%;
height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px;
  padding: 20px;
  width: 660px;
  @media (max-width: 768px) {
width: 100%;
height: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  margin-left: 50px;
`;

const Photo = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover/contain;
  margin-left: 0px;
  margin-top: 8px;
  border-radius: 8px;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;

const Video = styled.video`
  width: 250px;
  height: 100%;
  border-radius: 15px;
`;

const Header = styled.div`
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;
  margin-bottom: 8px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
`;
const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const Timer = styled.span`
  font-size: 10px;
  color: #9a9a9a;
`;
const Payload = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const Icons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: start;
  align-items: center;
  margin-left: 50px;
  margin-top: 20px;
  cursor: pointer;
  color: #bababa;
`;
const DeleteButton = styled.button`
  background: #ff6347;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

const EditorColumns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const EditButton = styled.button`
  background: #7f8689;
  color: #fff;
  font-weight: 600;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
`;

const Button = styled.button`
  background: ${(props) => props.bg || "#7f8689"};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

const EditPostFormTextArea = styled.textarea`
  background: #000;
  color: #fff;
  width: 94%;
  height: 50%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border-radius: 10px;
  resize: none;
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    ::placeholder {
      opacity: 0;
    }
    outline: none;
    border: 1px solid #1d9bf0;
  }
`;
const CancelButton = styled.button`
  background: #7f8689;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
`;
const UpdateButton = styled.button`
  background: #1d9bf0;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
`;

const SetContentButton = styled.label`
  color: #fff;
  transition: color 0.3s;

  &:hover {
    color: #1d9bf0;
  }

  svg {
    width: 24px;
    cursor: pointer;
  }
`;

const SetContentInputButton = styled.input`
  display: none;
`;

const Post = ({ post, userId, photos, video, username, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [editedPhoto, setEditedPhoto] = useState(null);

  const user = auth.currentUser;

  const onChange = (e) => {
    setEditedPost(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onClickSetContent = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setEditedPhoto(files[0]);
    }
  };

  const onDelete = async () => {
    if (
      confirm("Are you sure you want to delete this post?") &&
      user?.uid === userId
    ) {
      try {
        await deleteDoc(doc(db, "contents", id));
        if (photos.length > 0) {
          const photoRef = ref(storage, `contents/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onUpdate = async () => {
    if (user?.uid !== userId) return;

    try {
      const postDoc = await getDoc(doc(db, "contents", id));
      if (!postDoc.exists()) throw new Error("Document does not exist");

      const postData = postDoc.data();
      const existingFileType = postData?.fileType || null;
      const newFileType = editedPhoto?.type.startsWith("image/")
        ? "image"
        : "video";

      if (editedPhoto) {
        if (existingFileType && existingFileType !== newFileType) {
          alert("You can only upload the same type of content");
          return;
        }

        const locationRef = ref(storage, `contents/${user.uid}/${id}`);
        const uploadTask = uploadBytesResumable(locationRef, editedPhoto);

        if (editedPhoto.size >= 5 * 1024 * 1024) {
          uploadTask.cancel();
          throw new Error("File Size is over 5MB");
        }

        const result = await uploadTask;
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc(db, "contents", id), {
          post: editedPost,
          photos: newFileType === "image" ? [...photos, url] : photos,
          video: newFileType === "video" ? url : video,
          fileType: newFileType,
        });
      } else {
        await updateDoc(doc(db, "contents", id), { post: editedPost });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Wrapper>
      <Header>
        <UserImage src="http://localhost:5173/profile.png"></UserImage>
        <Username>{username}</Username>
        <Timer>2시간전</Timer>
      </Header>
      <Column>
        {isEditing ? (
          <EditPostFormTextArea
            onChange={onChange}
            value={editedPost}
            placeholder={post}
          />
        ) : (
          <Payload>{post}</Payload> // 하나의 Payload만 남겨두기
        )}
      </Column>

      {/* Render multiple photos */}
      {photos && photos.length > 0 && (
        <Column>
          {photos.map((photoUrl, index) => (
            <Photo key={index} src={photoUrl} alt={`Post Image ${index + 1}`} />
          ))}
        </Column>
      )}

      {video && (
        <Column>
          <Video src={video} autoPlay loop />
        </Column>
      )}
      <Icons>
        <HeartIcon width={24} />2
        <Coment width={24} />2
        <DmIcon width={20} />2
        <RetweetIcon width={24} />2
      </Icons>
    </Wrapper>
  );
};

export default Post;
