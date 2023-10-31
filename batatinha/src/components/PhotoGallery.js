import React from 'react';

export default function PhotoGallery({ imgPaths }) {
    return (
        <div role="region" aria-label="Photo Gallery">
            {imgPaths.map((img, index) => (
                <img
                    key={img}
                    src={img}
                    alt={`Gallery Image ${index + 1}`}
                    tabIndex={`${index === 0 ? "0" : "-1"}`}
                />
            ))}
        </div>
    );
}