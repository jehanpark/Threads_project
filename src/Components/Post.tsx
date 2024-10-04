import React, { useState } from "react";
import styled from "styled-components";
import { IPost } from "./TimeLine";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  getDownloadURL,
  StorageError,
  StorageErrorCode,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: 20px;
`;

const Column = styled.div`
  display: flex;
`;

const Photo = styled.img`
  width: 200px;
  height: 100%;
  border-radius: 15px;
`;

const Video = styled.video`
  width: 250px;
  height: 100%;
  border-radius: 15px;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const Payload = styled.p`
  font-size: 18px;
  margin: 10px 0;
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

const Post = ({ username, post, photos = [], video, userId, id }: IPost) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);

  const user = auth.currentUser;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPost(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const onClickSetContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) setEditedPhoto(files[0]);
  };

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this post?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, `contents`, id));
      if (photos.length > 0) {
        const photoRef = ref(storage, `contents/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onUpdate = async () => {
    try {
      if (user?.uid !== userId) return;

      const postDoc = await getDoc(doc(db, "contents", id));
      if (!postDoc.exists()) throw new Error("Documents does not exist");
      const postData = postDoc.data();

      if (postData) {
        if (postData.photos) postData.fileType = "image";
        if (postData.video) postData.fileType = "video";
      }

      const existingFileType = postData?.fileType || null;

      if (editedPhoto) {
        const newFileType = editedPhoto.type.startsWith("image/")
          ? "image"
          : "video";

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

        const result = await uploadBytes(locationRef, editedPhoto);
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
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditing(false);
    }
  };

  // const navigate = useNavigate();
  // const onUserCurrent = (e) => {
  //   console.log(e.target.innerHTML);
  //   navigate(`/Profile/${e.target.innerHTML}`);
  // };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <EditPostFormTextArea
            onChange={onChange}
            value={editedPost}
            placeholder={post}
          />
        ) : (
          <Payload>{post}</Payload>
        )}

        <EditorColumns>
          {user?.uid === userId ? (
            <>
              {isEditing ? (
                <>
                  <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                  <UpdateButton onClick={onUpdate}>Update</UpdateButton>
                  <SetContentButton htmlFor="edit-content">
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <SetContentInputButton
                      id="edit-content"
                      type="file"
                      accept="video/*, image/*"
                      onChange={onClickSetContent}
                    />
                  </SetContentButton>
                </>
              ) : (
                <EditButton onClick={handleEdit}>Edit</EditButton>
              )}

              <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            </>
          ) : null}
        </EditorColumns>
      </Column>

      {/* 여러 장의 사진을 배열로 렌더링 */}
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
    </Wrapper>
  );
};

export default Post;
