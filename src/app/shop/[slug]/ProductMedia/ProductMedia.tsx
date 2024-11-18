import styles from "./ProductMedia.module.css";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Arrow from "../../../../../public/icons/leftArrow.svg";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState<
    products.MediaItem | undefined
  >(media?.[0]);

  // Reset selected media when the `media` prop changes
  useEffect(() => {
    if (media?.length) {
      setSelectedMedia(media[0]);
    }
  }, [media]);

  if (!media?.length) return null;

  const handleNext = () => {
    if (!selectedMedia || !media?.length) return;
    const currentIndex = media.findIndex(
      (item) => item._id === selectedMedia._id
    );
    const nextIndex = (currentIndex + 1) % media.length;
    setSelectedMedia(media[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedMedia || !media?.length) return;
    const currentIndex = media.findIndex(
      (item) => item._id === selectedMedia._id
    );
    const previousIndex = (currentIndex - 1 + media.length) % media.length;
    setSelectedMedia(media[previousIndex]);
  };

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className={styles.container}>
      {/* Display the selected media (image or video) */}
      <div className={styles.imgContainer}>
        {selectedImage?.url ? (
          <WixImage
            mediaIdentifier={selectedImage.url}
            alt={selectedImage.altText || "Product Image"}
            scaleToFill={false}
            className={styles.img}
          />
        ) : selectedVideo?.url ? (
          <video autoPlay loop controls className={styles.video}>
            <source
              src={selectedVideo.url}
              type={`video/${selectedVideo.format}`}
            />
          </video>
        ) : null}

        {/* Overlay circles representing remaining images */}
        <div className={styles.circleContainer}>
          {media.map((_, index) => (
            <span
              key={index}
              className={`${styles.circle} ${
                media[index]._id === selectedMedia?._id
                  ? styles.activeCircle
                  : ""
              }`}
            />
          ))}
        </div>

        {/* Left and Right Navigation Arrows */}
        <button
          className={`${styles.arrowButton} ${styles.leftArrow}`}
          onClick={handlePrevious}
        >
          <Arrow className={styles.arrow} />
        </button>
        <button
          className={`${styles.arrowButton} ${styles.rightArrow}`}
          onClick={handleNext}
        >
          <Arrow className={`${styles.arrow} ${styles.arrowReverse}`} />
        </button>
      </div>
    </div>
  );
}
