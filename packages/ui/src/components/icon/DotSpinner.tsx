import React from 'react';
import type { SVGProps } from 'react';

export default function DotSpinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={4} cy={12} r={3} fill="primary">
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.313s"
          dur="0.938s"
          values="1;0.2"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={3} fill="primary" opacity={0.4}>
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.188s"
          dur="0.938s"
          values="1;0.2"
        ></animate>
      </circle>
      <circle cx={20} cy={12} r={3} fill="primary" opacity={0.3}>
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.375s"
          dur="0.938s"
          values="1;0.2"
        ></animate>
      </circle>
    </svg>
  );
}
