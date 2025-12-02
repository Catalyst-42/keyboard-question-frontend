"use client";

import React from 'react';

type TwoColumnResponsiveProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  mobileWidth?: string;
  gridGap?: string;
  mobileContainerClass?: string;
};

export default function TwoColumnResponsive({
  left,
  right,
  mobileWidth = 'w-82',
  gridGap = 'gap-4',
  mobileContainerClass = 'overflow-x-auto pb-6',
}: TwoColumnResponsiveProps) {
  return (
    <>
      <div className={`hidden sm:grid grid-cols-2 ${gridGap}`}>
        {left}
        {right}
      </div>

      <div className={`sm:hidden flex gap-4 ${mobileContainerClass}`}>
        <div className={`${mobileWidth} shrink-0`}>{left}</div>
        <div className={`${mobileWidth} shrink-0`}>{right}</div>
      </div>
    </>
  );
}
