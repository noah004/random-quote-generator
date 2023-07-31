import { useEffect, useState } from "react";

function App() {
  const [quote, setQuote] = useState({});
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredTweet, setHoveredTweet] = useState(false);
  const [currentColor, setCurrentColor] = useState("grey");
  const [fadeText, setFadeText] = useState(false);
  const mouseEnteredButton = () => setHoveredButton(true);
  const mouseLeftButton = () => setHoveredButton(false);
  const mouseEnteredTweet = () => setHoveredTweet(true);
  const mouseLeftTweet = () => setHoveredTweet(false);

  useEffect(getNewQuote, []);

  function getNewQuote() {
    setFadeText(true);
    setTimeout(() => {
      fetch("https://api.quotable.io/random?maxLength=120")
        .then((response) => response.json())
        .then((data) => {
          setQuote(data);
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to fetch Zen quote.");
        });
      let r = Math.round(Math.random() * 255);
      let b = Math.round(Math.random() * 255);
      let g = Math.round(Math.random() * 255);
      let a = Math.random() * 0.5 + 0.5;

      setCurrentColor("rgba(" + r + "," + g + "," + b + "," + a + ")");
      setFadeText(false);
    }, 1000);
  }

  return (
    <div
      id="quote-box"
      className="position-absolute top-50 start-50 translate-middle overflow-scroll"
      style={{
        backgroundColor: "white",
        color: currentColor,
        transition: "color 1s",
        minHeight: "1%",
        minWidth: "10%",
      }}
    >
      <h1
        id="text"
        style={{
          opacity: fadeText ? 0 : 1,
          transition: "opacity 1s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        &quot;
        {quote.content}
        &quot;
      </h1>
      <h3
        id="author"
        style={{
          opacity: fadeText ? 0 : 1,
          transition: "opacity 1s",
          transitionTimingFunction: "ease-in-out",
        }}
      >
        - {quote.author}
      </h3>

      <div className="mt-4">
        <button
          type="button"
          className="btn"
          onClick={getNewQuote}
          id="new-quote"
          style={{
            borderWidth: 3,
            backgroundColor: fadeText
              ? "rgb(255,255,255)"
              : hoveredButton
              ? currentColor
              : "white",
            color: "black",
            borderColor: currentColor,
            transition: "background-color 0.5s, border-color 1s",
            transitionTimingFunction: "ease-in-out",
          }}
          onMouseEnter={mouseEnteredButton}
          onMouseLeave={mouseLeftButton}
        >
          New quote
        </button>
        <a
          className="ps-2"
          id="tweet-quote"
          href="https://www.twitter.com/intent/tweet"
        >
          <img
            className="btn"
            style={{
              height: "42px",
              borderWidth: 3,
              borderColor: currentColor,
              backgroundColor: fadeText
                ? "rgb(255,255,255)"
                : hoveredTweet
                ? currentColor
                : "white",
              transition: "background-color 0.5s, border-color 1s",
              transitionTimingFunction: "ease-in-out",
            }}
            onMouseEnter={mouseEnteredTweet}
            onMouseLeave={mouseLeftTweet}
            src="public/twitter.png"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
