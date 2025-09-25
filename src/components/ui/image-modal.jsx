import React from 'react';

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-4 right-0 text-white hover:text-gray-300 text-xl p-2"
        >
          ✕
        </button>
        <img
          src={imageSrc}
          alt="Enlarged view"
          className="w-full h-full object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

export { ImageModal };