import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BackgroundImageSlider from "./components/common/BackgroundImageSlider";
import Home from "./components/home/Home";

function App() {
  return (
    <main className="">
      <BackgroundImageSlider>
        <div className="text-info">새로운 프로젝트에서 환영합니다.</div>
        <Home />
      </BackgroundImageSlider>
    </main>
  );
}

export default App;
