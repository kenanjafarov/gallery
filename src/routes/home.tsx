import {
  useEffect,
  useState,
} from "react";
import Gallery from "../components/gallery";

function Home() {
  const [value, setValue] =
    useState("");

  const [
    debouncedValue,
    setDebouncedValue,
  ] = useState("");

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedValue(value),
      250
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return (
    <div>
      <input
        type="text"
        placeholder="ძებნა"
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
        }
      />

      <Gallery
        keyword={debouncedValue}
      />
    </div>
  );
}

export default Home;
