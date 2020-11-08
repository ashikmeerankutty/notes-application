/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import unified from 'unified';
import markdown from 'remark-parse';
//@ts-ignore
import slug from 'remark-slug';
import toc from 'remark-toc';
//@ts-ignore
import github from 'remark-github';
import remark2rehype from 'remark-rehype';
//@ts-ignore
import highlight from 'rehype-highlight';
import rehype2react from 'rehype-react';
import { Theme } from 'components';
import { useTheme } from 'emotion-theming';

interface MarkdownProps {
  text: string;
}

const markdownStyles = (theme: Theme) => css`
  color: ${theme.colors.text};
  max-width: 200px;
  overflow: hidden;
`;

const processor = unified()
  .use(markdown)
  .use(slug)
  .use(toc)
  .use(github, { repository: 'rehypejs/rehype-react' })
  .use(remark2rehype)
  .use(highlight)
  .use(rehype2react, { createElement: React.createElement });

const Markdown: React.FC<MarkdownProps> = ({ text }: MarkdownProps) => {
  const theme = useTheme<Theme>();
  return <div css={markdownStyles(theme)}>{processor.processSync(text).result}</div>;
};

export default Markdown;
