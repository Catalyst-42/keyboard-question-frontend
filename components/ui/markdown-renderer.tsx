'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Link from 'next/link';
import { H1, TypographyInlineCode, TypographyList, TypographyListItem } from './typography';

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

export function MarkdownRenderer({ children, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <H1>{children}</H1>,

          h2: ({ children }) => (
            <h2 className="text-lg font-semibold mb-3">{children}</h2>
          ),

          p: ({ children }) => (
            <p className="leading-relaxed whitespace-pre-wrap mb-4">{children}</p>
          ),

          ul: ({ children }) => <TypographyList>{children}</TypographyList>,
          ol: ({ children }) => <TypographyList ordered>{children}</TypographyList>,
          li: ({ children }) => <TypographyListItem>{children}</TypographyListItem>,

          code({ inline, children }: any) {
            return <TypographyInlineCode>{children}</TypographyInlineCode>;
          },

          a: ({ href, children, ...props }) => {
            if (href && href.startsWith('/')) {
              return (
                <Link href={href} {...props} className="hover:underline">
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} {...props} className="hover:underline" target="_blank">
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
