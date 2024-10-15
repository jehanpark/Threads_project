import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
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
  EtcIcon,
  Coment,
} from "./Common/Icon";

import { createSearchParams, useNavigate } from "react-router-dom";
// Styled Components

import { formatDistanceToNow } from "date-fns";
import PostSetModal from "./post/PostSetModal";
import EditModal from "./EditModal";
import AudioMessage from "./AudioMessage";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  padding: 20px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 12px;
  gap: 10px;
  cursor: pointer;
`;

const Photo = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover/contain;
  margin-left: 0px;
  border-radius: 8px;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;

const Video = styled.video`
  display: flex;
  width: 220px;
  height: 160px;
  border-radius: 15px;
  object-fit: cover;
  @media (max-width: 768px) {
    margin-right: 8px;
    width: 120px;
    height: 120px;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
  cursor: pointer;
`;

const Timer = styled.span`
  flex: 1;
  font-size: 10px;
  color: #9a9a9a;
`;

const Etc = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Payload = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin-left: 0px;
  margin-bottom: 5px;
`;

const Icons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: start;
  align-items: center;
  margin-left: 50px;
  margin-top: 10px;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
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
  background: #fff;
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

const Post = ({
  post,
  userId,
  photos,
  videos,
  username,
  id,
  createdAt,
  email,
  audioURL,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [editedPhoto, setEditedPhoto] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0); // 댓글 수 상태 추가
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [isLiked, setIsLiked] = useState(false);
  const [dms, setDms] = useState(Math.floor(Math.random() * 50));
  const [isDms, setIsDms] = useState(false);
  const [retweets, setRetweets] = useState(2);
  const [isRetweets, setIsRetweets] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const navigate = useNavigate();

  // const user = auth.currentUser;

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전"; // createdAt가 유효하지 않을 때 처리
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const openModal = (postId) => {
    setOpenModalId(postId); // 특정 포스트의 ID로 모달 열기
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  const handleClickOutside = (e) => {
    if (openModalId && !e.target.closest(".modal-content")) {
      closeModal();
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("ID is not available for this post");
      return; // id가 유효하지 않으면 바로 return
    }

    const fetchPostAndCommentsData = async () => {
      try {
        // 1. Firestore에서 포스트 데이터를 가져오기
        const postRef = doc(db, "contents", id);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
          // 문서가 없으면 랜덤으로 생성된 값을 저장
          await setDoc(postRef, {
            likes: likes,
            dms: dms,
            retweets: retweets,
          });
        } else {
          // 문서가 존재할 경우 Firebase에 있는 값을 상태로 설정
          const postData = postSnap.data();
          setLikes(postData.likes || likes);
          setDms(postData.dms || dms);
          setRetweets(postData.retweets || retweets);
        }

        // 2. Firestore에서 댓글 수 가져오기
        const commentsCollectionRef = collection(
          db,
          "contents",
          id,
          "comments"
        );
        const commentsSnapshot = await getDocs(commentsCollectionRef);
        setCommentsCount(commentsSnapshot.size); // 댓글 개수를 상태로 설정
      } catch (error) {
        console.error("Error fetching post and comments data:", error);
      }
    };

    fetchPostAndCommentsData();
  }, [id, likes, dms, retweets]); // 의존성 배열에 필요한 상태 추가

  // 모달 외부 클릭 감지 이벤트 등록
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModalId]);

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

  const handleSave = async (newContent) => {
    setPostContent(newContent);

    // Firebase에 업데이트
    try {
      await updateDoc(doc(db, "contents", id), {
        post: newContent,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const onClickSetContent = (e) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setEditedPhoto(files[0]);
    }
  };
  const onDelete = async () => {
    if (confirm("정말 이 글을 삭제하시겠습니까?") && user?.uid === userId) {
      try {
        await deleteDoc(doc(db, "contents", id));
        if (photos.length > 0) {
          const photoRef = ref(storage, `contents/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("삭제할 권한이 없습니다.");
    }
  };

  const onUpdate = async () => {
    try {
      if (user?.uid !== userId) return;

      const postDoc = await getDoc(doc(db, "contents", id));
      if (!postDoc.exists()) throw new Error("Documents does not exist");

      if (editedPhoto) {
        const newFileType = editedPhoto.type.startsWith("image/")
          ? "image"
          : "video";

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
          photo: newFileType === "image" ? url : "",
          video: newFileType === "video" ? url : "",
          fileType: newFileType,
        });
      } else {
        await updateDoc(doc(db, "contents", id), { post: editedPost });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditing(false); // 수정 완료 후 입력창 닫기
    }
  };

  const handleLike = async () => {
    const postRef = doc(db, "contents", id);

    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
      await updateDoc(postRef, { likes: likes - 1 });
    } else {
      setLikes((prevLikes) => prevLikes + 1);
      await updateDoc(postRef, { likes: likes + 1 });
    }

    setIsLiked((prevLiked) => !prevLiked);
  };

  const handleCommentClick = () => {
    navigate("/Comment/${id}", {
      state: {
        postId: id,
        postContent: post,
        photos,
        videos,
        username,
        createdAt: createdAt || { seconds: Date.now() / 1000 },
        likes,
        dms,
        retweets,
      },
    });
  };

  const PostCommentClick = () => {
    navigate("/PostComment/${id}", {
      state: {
        postId: id,
        postContent: post,
        photos,
        videos,
        username,
        createdAt: createdAt || { seconds: Date.now() / 1000 },
        likes,
        dms,
        retweets,
      },
    });
  };

  // DM 상태가 변경될 때 Firebase에 업데이트
  const handleDmClick = async () => {
    const postRef = doc(db, "contents", id);

    if (isDms) {
      setDms((prevDms) => prevDms - 1);
      await updateDoc(postRef, { dms: dms - 1 });
    } else {
      setDms((prevDms) => prevDms + 1);
      await updateDoc(postRef, { dms: dms + 1 });
    }

    setIsDms((prevDms) => !prevDms);
  };

  // Retweets 상태가 변경될 때 Firebase에 업데이트
  const handleRetweetClick = async () => {
    const postRef = doc(db, "contents", id);

    if (isRetweets) {
      setRetweets((prevRet) => prevRet - 1);
      await updateDoc(postRef, { retweets: retweets - 1 }); // Firebase에 업데이트
    } else {
      setRetweets((prevRet) => prevRet + 1);
      await updateDoc(postRef, { retweets: retweets + 1 }); // Firebase에 업데이트
    }

    setIsRetweets((prevRet) => !prevRet);
  };
  return (
    <Wrapper>
      <Header>
        <UserImage
          onClick={() => {
            navigate({
              pathname: "/profile",
              search: `${createSearchParams({
                email: email,
              })}`,
            });
          }}
          src="http://localhost:5173/profile.png"
        ></UserImage>
        <Username
          onClick={() => {
            navigate({
              pathname: "/profile",
              search: `${createSearchParams({
                email: email,
              })}`,
            });
          }}
        >
          {username}
        </Username>
        <Timer>{renderTimeAgo()}</Timer>
        <Etc onClick={() => openModal(id)}>
          <EtcIcon width={20} fill="gray" />
        </Etc>

        {openModalId === id && (
          <div className="modal-content">
            <PostSetModal
              onClose={closeModal}
              onDelete={onDelete}
              onEdit={handleEdit}
              isAuthor={user?.uid === userId}
            />
          </div>
        )}
      </Header>

      <Column onClick={PostCommentClick}>
        {isEditing ? (
          <EditPostFormTextArea
            onChange={(e) => setEditedPost(e.target.value)}
            value={editedPost}
            placeholder={post}
          />
        ) : (
          <Payload>{post}</Payload> // 하나의 Payload만 남겨두기
        )}
      </Column>
      {/* AudioMessage 컴포넌트를 audioURL이 있을 때만 렌더링 */}
      <ColumnWrapper onClick={PostCommentClick}>
        {/* Render multiple photos */}
        {photos && photos.length > 0 && (
          <Column>
            {photos.map((photoUrl, index) => (
              <Photo
                key={index}
                src={photoUrl}
                alt={`Post Image ${index + 1}`}
              />
            ))}
          </Column>
        )}

        {videos && videos.length > 0 && (
          <Column>
            {videos.map((videoUrl, index) => (
              <Video key={index} controls autoPlay loop src={videoUrl} />
            ))}
          </Column>
        )}
      </ColumnWrapper>
      <AudioMessage audioURL={audioURL} />

      <Icons>
        <IconWrapper onClick={handleLike}>
          <HeartIcon width={20} /> {likes}
        </IconWrapper>
        <IconWrapper onClick={handleCommentClick}>
          <Coment width={20} /> {commentsCount}
        </IconWrapper>
        <IconWrapper onClick={handleDmClick}>
          <DmIcon width={18} /> {dms}
        </IconWrapper>
        <IconWrapper onClick={handleRetweetClick}>
          <RetweetIcon width={20} /> {retweets}
        </IconWrapper>
      </Icons>
    </Wrapper>
  );
};

export default Post;
