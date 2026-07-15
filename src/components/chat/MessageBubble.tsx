import type { ChatMessage } from '@/types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const formattedContent = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <div className={`mb-5 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={
          isUser
            ? // User: clean, right-aligned, warm gray bg
              'max-w-[80%] rounded-2xl rounded-br-md bg-ink/5 px-4 py-3'
            : // Coach: white card with amber left-border accent — the signature element
              'max-w-[85%] rounded-r-2xl rounded-bl-md border-l-[3px] border-amber bg-white px-4 py-3 shadow-sm'
        }
      >
        {/* Coach label */}
        {!isUser && (
          <p className="mb-1 text-xs font-medium tracking-wide text-amber">
            教练
          </p>
        )}

        <div
          className={`whitespace-pre-wrap text-sm leading-relaxed ${
            isUser ? 'text-ink' : 'text-ink'
          }`}
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {/* Source citations */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 border-t border-amber-light/80 pt-2">
            <p className="mb-1 text-xs text-ink-faint">参考数据</p>
            {message.sources.slice(0, 3).map((atom) => (
              <div key={atom.id} className="text-xs text-ink-muted">
                <span className="text-amber">·</span> {atom.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
