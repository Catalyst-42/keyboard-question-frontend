export function H1({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-left gap-3">
            <h1 className="text-4xl font-bold">{children}</h1>
        </div>
    )
}

interface TypographyListItemProps {
  children: React.ReactNode;
}

export function TypographyListItem({ children }: TypographyListItemProps) {
  return (
    <li>
      {children}
    </li>
  );
}

interface TypographyListProps {
  children: React.ReactNode;
  ordered?: boolean;
}

export function TypographyList({ children, ordered = false }: TypographyListProps) {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <ListTag className="my-4 ml-4 list-(--dash) [&>li]:mt-0 [&_ul]:my-0 [&_ol]:my-0 [&_ul]:ml-4 [&_ol]:ml-4">
      {children}
    </ListTag>  );
}

export function TypographyInlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-card relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
      {children}
    </code>
  );
}

// TODO: Unused now: replace for use or remove
export function TypographyLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xl text-muted-foreground">
      {children}
    </p>
  );
}

export function TypographyLarge({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-lg font-semibold">
      {children}
    </div>
  );
}

export function TypographySmall({ children }: { children: React.ReactNode }) {
  return (
    <small className="text-sm font-medium leading-none">
      {children}
    </small>
  );
}

export function TypographyMuted({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground">
      {children}
    </p>
  );
}
