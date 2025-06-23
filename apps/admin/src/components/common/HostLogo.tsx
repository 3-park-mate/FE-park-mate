type HostLogoProps = {
  size?: 'sm' | 'md' | 'lg';
};

export default function HostLogo({ size = 'md' }: HostLogoProps) {
  const primaryClass = {
    sm: 'text-17px',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  const secondaryClass = {
    sm: 'text-base',
    md: 'text-19px',
    lg: 'text-23px',
  }[size];

  return (
    <div className="flex items-baseline gap-1">
      <span className={`text-secondary font-extrabold ${primaryClass}`}>
        파크메이트
      </span>
      <span className={`text-gray-2 font-semibold ${secondaryClass}`}>
        호스트
      </span>
    </div>
  );
}
