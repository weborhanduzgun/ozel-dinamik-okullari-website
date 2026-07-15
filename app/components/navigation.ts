export type NavigationItem = {
  label: string;
  href?: string;
  children?: Array<{
    label: string;
    href: string;
  }>;
};
