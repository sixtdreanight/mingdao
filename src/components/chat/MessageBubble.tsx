import type { ChatMessage } from '@/types';

interface MessageBubbleProps { message: ChatMessage }

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const html = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-espresso">$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <div className={`mb-5 flex fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="max-w-[75%] rounded-2xl bg-espresso/[0.06] px-4 py-2.5">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-espresso-muted"
            dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ) : (
        <div className="max-w-[82%]">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-terracotta">教练</span>
            <span className="h-px flex-1 bg-cream-line" />
          </div>
          <div className="rounded-r-xl rounded-bl-md border-l-[3px] border-terracotta bg-white px-4 py-3 shadow-card">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-espresso"
              dangerouslySetInnerHTML={{ __html: html }} />
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 border-t border-cream-line pt-2">
                <span className="text-xs text-espresso-light">参考数据</span>
                <div className="mt-1 space-y-0.5">
                  {message.sources.slice(0, 3).map((s) => (
                    <div key={s.id} className="text-xs text-espresso-muted">
                      <span className="mr-1 text-terracotta">→</span>{s.title}
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
