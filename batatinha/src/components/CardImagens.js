import React from "react";

const CardImagens = ({imgs, scale}) => {
    return(
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative'
        }}>
            {imgs.map((img, index) => {
                let transformStyle, width, height, zIndex, position, marginLeft, marginRight, margin_T;
                width = scale/1.4772727272727272727272727272727;
                height = scale;
                margin_T = 140

                if(index === 0) {
                  transformStyle = 'rotate(-30deg)';
                  width /= 1.5;
                  height /= 1.5;
                  zIndex = 1;
                  position = 'relative';
                  marginRight = `${0.3*scale}px`;
                } else if (index === 1) {
                  transformStyle = '';
                  zIndex = 2;
                  position = 'absolute';
                } else if (index === 2) {
                  transformStyle = 'rotate(30deg)';
                  width /= 1.5;
                  height /= 1.5;
                  zIndex = 1;
                  position = 'relative';
                  marginLeft = `${0.3*scale}px`;
                }

                return (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`Image ${index + 1}`} 
                    style={{
                        transform: transformStyle,
                        width: `${width}px`,
                        height: `${height}px`,
                        position: position,
                        zIndex: zIndex,
                        marginLeft: marginLeft,
                        marginRight: marginRight,
                        borderRadius: `${0.02*scale}px`
                    }} 
                  />
                )
            })}
        </div>
    )
}

export default CardImagens