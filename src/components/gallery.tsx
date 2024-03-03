import React, {
  useState,
  useEffect,
  useRef,
} from "react";

interface Props {
  keyword: string;
}

function Gallery({ keyword }: Props) {
  const [photos, setPhotos] = useState(
    []
  );
  const [currentPage, setCurrentPage] =
    useState(1);
  const [loading, setLoading] =
    useState(false);

  const bottom = useRef(null);

  const fetchData = async (
    page: number
  ) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${keyword}`,
        {
          headers: {
            Authorization:
              "Client-ID " +
              import.meta.env
                .VITE_ACCESS_KEY,
            "Content-Type":
              "application/json",
          },
        }
      );
      const data =
        await response.json();

      if (page > 1) {
        setPhotos((prevPhotos) => [
          ...prevPhotos,
          ...data.results,
        ]);
      } else {
        setPhotos(data.results);
      }
      setCurrentPage(page + 1);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) {
      const keywords = JSON.parse(
        localStorage.getItem(
          "keywords"
        ) || "[]"
      );
      if (!keywords.includes(keyword)) {
        keywords.push(keyword);

        localStorage.setItem(
          "keywords",
          JSON.stringify(keywords)
        );
      }
      fetchData(1);
    } else {
      setPhotos([]);
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    const handleScroll = () => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight,
      } = document.documentElement;
      if (
        scrollTop + clientHeight >=
          scrollHeight - 5 &&
        !loading
      ) {
        fetchData(currentPage);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [loading, currentPage]);

  return (
    <div>
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.thumb}
          alt={photo.description}
        />
      ))}
      {loading && <p>Loading...</p>}
      <div ref={bottom} />
    </div>
  );
}

export default Gallery;
