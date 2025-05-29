import { cn } from '../../lib/utils';

export default function ParkingMarkerIcon({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <svg
      width="26"
      height="32"
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M13 31.7778C13 31.7778 26 22.2444 26 11.9167C26 5.33525 20.1797 0 13 0C5.82026 0 0 5.33525 0 11.9167C0 22.2444 13 31.7778 13 31.7778Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5625 7.94434V20.6554V7.94434Z"
        fill="white"
      />
      <path
        d="M10.5625 7.94434V20.6554"
        stroke="#27BFD1"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5625 7.94434H15.4375C17.2324 7.94434 18.6875 9.36711 18.6875 11.1221C18.6875 12.8771 17.2324 14.2999 15.4375 14.2999H10.5625V7.94434Z"
        fill="white"
        stroke="#27BFD1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
