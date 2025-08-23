import { useState } from "react";

export const ProductImages = ({ images, nameAlt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return <div>Нет изображений</div>;
  }

  return (
    <div>
      {images.length > 1 && (
        <div>
          <button
            onClick={prevImage}
            className=""
            aria-label="Предыдущее изображение"
          >
            Назад
          </button>
          <img
            src={images[currentImageIndex]}
            alt={nameAlt}
            width={50}
            height={75}
          />
          <button
            onClick={nextImage}
            className=""
            aria-label="Следующее изображение"
          >
            Вперед
          </button>
        </div>
      )}
      {images.length === 1 && (
        <img src={images[0]} alt={nameAlt} width={50} height={75} />
      )}
    </div>
  );
};
