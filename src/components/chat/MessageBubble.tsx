import type { ChatMessage } from '@/types';

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

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 border-t border-gray-100 pt-2">
            <p className="mb-1 text-xs text-gray-400">参考数据来源：</p>
            {message.sources.map((atom) => (
              <div key={atom.id} className="text-xs text-gray-500">
                · {atom.title}
                {atom.sourceUrl && (
                  <a
                    href={atom.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-brand-500 hover:underline"
                  >
                    [来源]
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
