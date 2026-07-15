import type { ChatMessage } from '@/types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const formattedContent = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <div className={`mb-5 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        /* User: clean rounded rect, warm gray bg */
        <div className="max-w-[75%] rounded-2xl bg-ink/6 px-4 py-2.5">
          <div
            className="whitespace-pre-wrap text-sm leading-relaxed text-ink"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
      ) : (
        /* Coach: white card with brass left accent */
        <div className="max-w-[82%]">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-brass">
              教练
            </span>
            <span className="h-px flex-1 bg-paper-line" />
          </div>
          <div className="rounded-r-xl rounded-bl-md border-l-[3px] border-brass bg-white px-4 py-3 shadow-card">
            <div
              className="whitespace-pre-wrap text-sm leading-relaxed text-ink"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 border-t border-paper-line pt-2">
                <span className="text-xs text-ink-faint">参考数据</span>
                <div className="mt-1 space-y-0.5">
                  {message.sources.slice(0, 3).map((s) => (
                    <div key={s.id} className="text-xs text-ink-muted">
                      <span className="mr-1 text-brass">→</span>
                      {s.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
