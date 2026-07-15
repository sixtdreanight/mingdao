import type { ChatMessage } from '@/types';
import { PathCard } from './PathCard';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // 将 Markdown 格式的 AI 回复中的 **text** 转为 HTML
  const formattedContent = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-brand-500 text-white'
            : 'border border-gray-200 bg-white text-gray-900'
        }`}
      >
        <div
          className="whitespace-pre-wrap text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {message.paths && message.paths.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.paths.map((path) => (
              <PathCard key={path.slug} path={path} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
