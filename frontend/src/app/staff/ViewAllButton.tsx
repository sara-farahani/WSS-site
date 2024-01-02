import React from 'react';
import Arrow from './assets/view all arrow.svg';
import Image from 'next/image';

export default function ViewAllButton({
  text,
  width,
}: {
  text: string;
  width?: number;
}) {
  return (
    <button
      className={
        'mb-3 flex items-center justify-center rounded-md bg-[#0B3678] px-8 py-5 font-manrope text-lg font-bold text-white'
      }
    >
      <div>{text}</div>
      <Image
        src={Arrow}
        alt={'view all arrow'}
        width={width}
        height={width}
        className={'ml-3'}
      />
    </button>
  );
}
