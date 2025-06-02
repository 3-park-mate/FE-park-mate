export interface GnbMenuType {
  main?: boolean;
  link: string;
  icon: React.FC<{ className?: string; onClick?: () => void }>;
}
