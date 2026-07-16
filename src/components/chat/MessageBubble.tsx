import type { ChatMessage, KnowledgeAtom } from '@/types';

interface MessageBubbleProps { message: ChatMessage }

function SourceLink({ atom }: { atom: KnowledgeAtom }) {
  const hasUrl = atom.sourceUrl && atom.sourceUrl.startsWith('http');
  const trustBadge = atom.trustLevel === 'official'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : atom.trustLevel === 'ai-inferred'
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-slate-50 text-slate-600 border-slate-200';

  if (hasUrl) {
    return (
      <a
        href={atom.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-md border border-border/40 bg-background px-2 py-1 text-xs text-primary transition-colors hover:bg-secondary"
      >
        <span className="truncate">{atom.title}</span>
        <span className={`shrink-0 rounded border px-1 py-px text-[9px] font-medium ${trustBadge}`}>
          {atom.trustLevel === 'official' ? '官方' : atom.trustLevel === 'ai-inferred' ? 'AI推断' : '社区'}
        </span>
        <span className="shrink-0 text-muted-foreground">↗</span>
      </a>
    );
  }

  // 无真实链接的来源 — 不显示
  return null;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const html = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\n/g, '<br/>');

  // 只展示有真实链接的来源
  const realSources = (message.sources || []).filter(s => s.sourceUrl && s.sourceUrl.startsWith('http'));

  return (
    <div className={`mb-5 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="max-w-[75%] rounded-2xl bg-secondary px-4 py-2.5">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-secondary-foreground" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      ) : (
        <div className="max-w-[82%]">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-primary">助手</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="rounded-r-xl rounded-bl-md border-l-[3px] border-primary bg-card px-4 py-3 shadow-sm">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: html }} />
            {realSources.length > 0 && (
              <div className="mt-3 border-t border-border pt-2">
                <span className="text-xs text-muted-foreground">参考来源</span>
                <div className="mt-1.5 space-y-1">
                  {realSources.slice(0, 5).map(s => (
                    <SourceLink key={s.id} atom={s} />
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
