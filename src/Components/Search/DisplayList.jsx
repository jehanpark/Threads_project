import React from "react";
import Display from "./Display";

const DisplayList = ({ displays }) => {
  if (!displays || displays.length === 0) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      {displays.map((contents) => (
        <Display
          key={contents.id}
          id={contents.id}
          post={contents.post}
          photos={contents.photos}
          videos={contents.videos}
          username={contents.username}
          userId={contents.userId}
          profileimg={contents.profileImg}
          bio={contents.bio}
          followers={contents.followers}
          createdAt={contents.createdAt}
        />
      ))}
    </div>
  );
};

export default DisplayList;
