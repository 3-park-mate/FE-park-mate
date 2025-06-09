import { cn } from '../../lib/utils';

export default function DCComboIcon({
  size = 20,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-black', className)}
    >
      <path
        d="M10 0.75C13.4518 0.75 16.25 3.54822 16.25 7C16.25 8.66591 15.5988 10.1779 14.5361 11.2988C14.386 11.4572 14.313 11.6735 14.335 11.8906C14.3569 12.1076 14.4717 12.3046 14.6504 12.4297C15.6188 13.1072 16.25 14.2298 16.25 15.5C16.25 17.5711 14.5711 19.25 12.5 19.25H7.5C5.42893 19.25 3.75 17.5711 3.75 15.5C3.75 14.2299 4.38091 13.1073 5.34961 12.4277C5.52809 12.3025 5.64317 12.1056 5.66504 11.8887C5.68407 11.6988 5.62993 11.5096 5.51562 11.3594L5.46289 11.2969C4.40099 10.1779 3.75 8.66599 3.75 7C3.75 3.54822 6.54822 0.75 10 0.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.5"
        cy="15.5"
        r="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="7.5"
        cy="15.5"
        r="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="13"
        cy="8.5"
        r="0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="9.5"
        r="1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="7"
        cy="8.5"
        r="0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.5"
        cy="5.5"
        r="1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="7.5"
        cy="5.5"
        r="1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
