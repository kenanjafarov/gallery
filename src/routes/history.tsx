import {
  useEffect,
  useState,
} from "react";
import Gallery from "../components/gallery";

function History() {
  const [history, setHistory] =
    useState<string[]>([]);

  const [
    selectedKeyword,
    setSelectedKeyword,
  ] = useState<string>("");

  useEffect(() => {
    const keywords = JSON.parse(
      localStorage.getItem(
        "keywords"
      ) || "[]"
    );

    setHistory(keywords);
  }, []);
  return (
    <>
      <div className="history-container">
        {history.map((item) => (
          <button
            key={item}
            className={
              selectedKeyword === item
                ? "history active"
                : "history"
            }
            onClick={() =>
              setSelectedKeyword(item)
            }
          >
            {item}
          </button>
        ))}
      </div>

      <Gallery
        keyword={selectedKeyword}
      />
    </>
  );
}

export default History;
