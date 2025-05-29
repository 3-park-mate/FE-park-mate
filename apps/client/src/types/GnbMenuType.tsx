export interface GnbMenuType {
  id: string;
  main?: boolean;
  link: string;
  icon: React.FC<{ className?: string; onClick?: () => void }>;
}
