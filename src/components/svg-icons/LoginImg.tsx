import React from 'react';

interface LoginImgProps {
    stroke: string;
}

const LoginImg: React.FC<LoginImgProps> = ({ stroke }) => (
    <svg
        id='Icons'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 32 32'
        xmlSpace='preserve'
        width={32}
        height={32}
        fill={'none'}
        stroke={stroke}
        strokeWidth={2}
    >
        <circle className='st0' cx={16} cy={16} r={14} />
        <circle className='st0' cx={16} cy={13} r={5} />
        <path
            className='st0'
            d='M5.4,25.1c1.8-4.1,5.8-7,10.6-7c4.8,0,8.9,2.9,10.6,7'
        />
    </svg>
);
export default LoginImg;
