export interface TabMenuWithIconType {
  id: string;
  title: string;
  href?: string;
  icon?: React.FC<{ className?: string; onClick?: () => void }>;
}
