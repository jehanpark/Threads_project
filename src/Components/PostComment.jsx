import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  DmIcon,
  RetweetIcon,
  Coment,
} from "../Components/Common/Icon";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const PostWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.borderColor};
  border-radius: 30px;
  padding: 20px;
  width: 660px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
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
`;
const Username = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;
const Timer = styled.span`
  flex: 1;
  font-size: 10px;
  color: #9a9a9a;
`;
const Posted = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const ColumnWrapper = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 12px;
  gap: 10px;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CommentWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  background: ${(props) => props.theme.borderColor};
  padding: 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommentUsername = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.fontcolor};
`;

const CommentTimer = styled.span`
  font-size: 10px;
  color: #9a9a9a;
  flex: 1;
`;

const CommentContent = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.fontcolor};
`;

const CommentImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

const CommentVideo = styled.video`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
`;

const PostComment = ({ id }) => {
  const [post, setPost] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]); // 초기 값을 빈 배열로 설정
  const [dms, setDms] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    postContent,
    photos,
    videos,
    username,
    createdAt,
    likes: passedLikes,
    dms: passedDms,
    retweets: passedRetweets,
  } = location.state || {};

  useEffect(() => {
    setLikes(passedLikes);
    setDms(passedDms);
    setRetweets(passedRetweets);
  }, [passedLikes, passedDms, passedRetweets]);

  const renderTimeAgo = () => {
    if (!createdAt || !createdAt.seconds) return "방금 전";
    const date = new Date(createdAt.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleCommentClick = () => {
    navigate("/Comment", {
      state: {
        postId: id,
        postContent: post,
        photos,
        videos,
        username,
        createdAt: createdAt || { seconds: Date.now() / 1000 },
      },
    });
  };

  // Firestore에서 댓글 불러오기 함수
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (location.state && location.state.postId) {
          const commentsRef = collection(
            db,
            "contents",
            location.state.postId,
            "comments"
          );
          const q = query(commentsRef, orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const commentsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(commentsList); // 불러온 댓글을 상태에 저장
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [location.state.postId]); // postId가 변경될 때마다 댓글을 다시 불러옴

  return (
    <div>
      <PostWrapper>
        <Header>
          <UserImage src="http://localhost:5173/profile.png"></UserImage>
          <Username>{username}</Username>
          <Timer>{renderTimeAgo()}</Timer>
        </Header>
        <Column>
          <Posted>{postContent}</Posted>
        </Column>

        <ColumnWrapper>
          <Column>
            {photos &&
              photos.length > 0 &&
              photos.map((photoUrl, index) => (
                <Photo
                  key={index}
                  src={photoUrl}
                  alt={`Post Image ${index + 1}`}
                />
              ))}
          </Column>

          <Column>
            {videos &&
              videos.length > 0 &&
              videos.map((videoUrl, index) => (
                <Video key={index} controls autoPlay loop src={videoUrl} />
              ))}
          </Column>
        </ColumnWrapper>

        <Icons>
          <IconWrapper>
            <HeartIcon width={20} /> {likes}
          </IconWrapper>
          <IconWrapper onClick={handleCommentClick}>
            <Coment width={20} /> {comments.length}
          </IconWrapper>
          <IconWrapper>
            <DmIcon width={18} /> {dms}
          </IconWrapper>
          <IconWrapper>
            <RetweetIcon width={20} /> {retweets}
          </IconWrapper>
        </Icons>
      </PostWrapper>

      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentWrapper key={comment.id}>
              <CommentHeader>
                <UserImage src="http://localhost:5173/profile.png"></UserImage>
                <CommentUsername>{comment.username}</CommentUsername>
                <CommentTimer>
                  {formatDistanceToNow(
                    new Date(comment.createdAt.seconds * 1000),
                    {
                      addSuffix: true,
                    }
                  )}
                </CommentTimer>
              </CommentHeader>
              <CommentContent>
                {typeof comment.comment === "string"
                  ? comment.comment
                  : JSON.stringify(comment.comment)}
              </CommentContent>

              {/* 댓글에 이미지가 있을 경우 */}
              {comment.photoUrls && comment.photoUrls.length > 0 && (
                <div>
                  {comment.photoUrls.map((photoUrl, index) => (
                    <CommentImage
                      key={index}
                      src={photoUrl}
                      alt={`Comment Image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* 댓글에 비디오가 있을 경우 */}
              {comment.videoUrls && comment.videoUrls.length > 0 && (
                <div>
                  {comment.videoUrls.map((videoUrl, index) => (
                    <CommentVideo key={index} controls src={videoUrl} />
                  ))}
                </div>
              )}
            </CommentWrapper>
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
