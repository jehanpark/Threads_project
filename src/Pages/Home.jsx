import Nav from "../Components/Nav";
import Intro from "../Components/Intro";
import PostForm from "../Components/PostForm";
import TimeLine from "../Components/TimeLine";

const Home = () => {
  return (
    <div>
      <PostForm />
      <TimeLine />
      <Intro />
    </div>
  );
};

export default Home;
