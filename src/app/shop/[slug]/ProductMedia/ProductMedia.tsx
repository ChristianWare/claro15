import styles from "./ProductMedia.module.css";
import WixImage from "@/components/WixImage";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className={styles.container}>
      {selectedImage?.url ? (
        <div className={styles.imgContainer}>
          <WixImage
            mediaIdentifier={selectedImage.url}
            alt={selectedImage.altText}
            // width={550}
            // height={550}
              scaleToFill={false}
            className={styles.img}
          />
        </div>
      ) : selectedVideo?.url ? (
        <div>
          <video autoPlay loop>
            <source
              src={selectedVideo.url}
              type={`video/${selectedVideo.format}`}
            />
          </video>
        </div>
      ) : null}
      {media.length > 1 && (
        <div className={styles.mediaPreviewContainer}>
          {media.map((mediaItem) => (
            <MediaPreview
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectedMedia?._id}
              onSelect={() => setSelectedMedia(mediaItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
  const thumbnailUrl = mediaItem.thumbnail?.url;
  const resolvedThumbnailUrl =
    stillFrameMediaId && thumbnailUrl
      ? thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imageUrl && !resolvedThumbnailUrl) return null;

  return (
    <div
      className={`bg-secondary relative cursor-pointer ${
        isSelected ? "outline-primary outline outline-1" : ""
      }`}
    >
      <WixImage
        mediaIdentifier={imageUrl || resolvedThumbnailUrl}
        alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
        width={100}
        height={100}
        onMouseEnter={onSelect}
        className={styles.imgii}
      />
      {resolvedThumbnailUrl && (
        <span className='absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40'>
          <span className='size-5 text-white/60'>▶️</span>
        </span>
      )}
    </div>
  );
}
