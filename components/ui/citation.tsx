import React from 'react';
import { cn } from "@/lib/utils";

interface Citation {
  title: string;
  url: string;
  content: string;
  date: string;
  siteName: string;
  sourceContent: string;
}

interface CitationLinkProps {
  id: string | number;
  className?: string;
  children?: React.ReactNode;
  callType?: string;
  citations?: Record<string | number, Citation>;
}

/**
 * 引用链接组件
 * 用于显示引用内容并链接到原始来源
 * @param id - 引用ID
 * @param className - 可选的CSS类名
 * @param children - 可选的子元素
 * @param callType - 调用类型，"recommend"时显示引用标题
 * @param citations - 引用数据对象
 */
export const CitationLink: React.FC<CitationLinkProps> = ({ 
  id, 
  className,
  children,
  callType,
  citations
}) => {
  // 如果提供了citations对象，使用其中的URL和标题
  const citation = citations?.[id];
  const href = citation?.url || `#citation-${id}`;
  const displayText = callType === "recommend" ? citation?.title : (children || <sup>[{id}]</sup>);
  
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`引用: ${citation?.title || `引用 ${id}`}`}
      className={cn("text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-0.5", className)}
    >
      {displayText}
    </a>
  );
};