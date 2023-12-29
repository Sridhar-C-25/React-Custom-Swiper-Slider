import { useState, useRef, useEffect } from "react";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";

const App = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);

  // Refs
  const contentRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const nameRef = useRef("");

  const sliderContent = [
    {
      img: img1,
      name: "Wanda Maximoff",
    },
    {
      img: img2,
      name: "The Hulk",
    },
    {
      img: img3,
      name: "Iron Man",
    },
    {
      img: img4,
      name: "Black Panther",
    },
  ];

  const Slide = (type) => {
    let local;
    if (type === "next") {
      local = active + 1;
      sliderContent.length - 1 < local ? setActive(0) : setActive(local);
    }
    if (type === "prev") {
      local = active - 1;
      local < 0 ? setActive(sliderContent.length - 1) : setActive(local);
    }
    setPrev(active);
  };

  useEffect(() => {
    contentRef.current.style.bottom = "-100%";
    prevRef.current.style.left = "-10%";
    nextRef.current.style.right = "-10%";
    setTimeout(() => {
      nameRef.current.innerText = sliderContent[active].name;
      contentRef.current.style.bottom = "0%";
      prevRef.current.style.left = "0%";
      nextRef.current.style.right = "0%";
    }, 1000);
  }, [active]);

  return (
    <div>
      <div className="rounded-xl relative shadow-lg overflow-hidden">
        <div className="w-[600px] h-[400px] relative">
          {sliderContent.map((slide, i) => {
            return (
              <img
                src={slide.img}
                key={i}
                alt="slideImg"
                className={`h-full w-full absolute object-cover inset-0 duration-[2.5s] ease-out transition-[clip-path] ${
                  i === active ? "clip-visible" : "clip-hidden"
                }`}
              />
            );
          })}
          <img
            src={sliderContent[prev].img}
            alt="previmg"
            className="w-full h-full  object-cover"
          />
        </div>
        <div>
          <button id="back" ref={prevRef} onClick={() => Slide("prev")}>
            <ion-icon name="chevron-back-outline" size="large"></ion-icon>
          </button>
          <button
            id="forward"
            ref={nextRef}
            className="right-0"
            onClick={() => Slide("next")}
          >
            <ion-icon name="chevron-forward-outline" size="large"></ion-icon>
          </button>
        </div>
        <div className="content" ref={contentRef}>
          <h1 ref={nameRef}>{sliderContent[0].name}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            porro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
