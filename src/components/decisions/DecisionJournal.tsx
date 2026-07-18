'use client';

import { useEffect, useState } from 'react';
import { Check, NotebookPen, PenLine, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import {
  addDecision,
  addSnapshot,
  deleteDecision,
  getDecisions,
  reopenDecision,
  settleDecision,
  type DecisionEntry,
  type DecisionOption,
  type DecisionSnapshot,
} from '@/lib/decision-store';

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const NO_LEANING = '还没倾向';
const DEFAULT_CONFIDENCE = 50;
const DELETE_CONFIRM_TEXT = '删除这个决策记录？所有想法快照会一起删除。';

const FIELD_CLS =
  'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/40';
const LABEL_CLS = 'mb-1 block text-xs font-medium text-muted-foreground';
const PRIMARY_BTN_CLS =
  'inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm btn-press';
const GHOST_BTN_CLS =
  'inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground';

interface SnapshotDraft {
  leaning: string;
  confidence: number;
  reasoning: string;
  missingInfo: string;
}

interface OptionDraft {
  label: string;
  pros: string;
  cons: string;
}

function emptySnapshotDraft(): SnapshotDraft {
  return { leaning: NO_LEANING, confidence: DEFAULT_CONFIDENCE, reasoning: '', missingInfo: '' };
}

function emptyOptionDraft(): OptionDraft {
  return { label: '', pros: '', cons: '' };
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** 快照表单字段：新建决策的第一条快照与「补记一次想法」共用 */
function SnapshotFields({
  idPrefix,
  optionLabels,
  draft,
  onChange,
}: {
  idPrefix: string;
  optionLabels: string[];
  draft: SnapshotDraft;
  onChange: (next: SnapshotDraft) => void;
}) {
  const labels = Array.from(new Set(optionLabels.map((l) => l.trim()).filter((l) => l !== '')));
  const selectValue = draft.leaning === NO_LEANING || labels.includes(draft.leaning) ? draft.leaning : NO_LEANING;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-leaning`} className={LABEL_CLS}>当前倾向</label>
          <select
            id={`${idPrefix}-leaning`}
            value={selectValue}
            onChange={(e) => onChange({ ...draft, leaning: e.target.value })}
            className={FIELD_CLS}
          >
            <option value={NO_LEANING}>{NO_LEANING}</option>
            {labels.map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-confidence`} className={LABEL_CLS}>
            信心度：<span className="font-semibold text-foreground">{draft.confidence}%</span>
          </label>
          <input
            id={`${idPrefix}-confidence`}
            type="range"
            min={0}
            max={100}
            step={5}
            value={draft.confidence}
            onChange={(e) => onChange({ ...draft, confidence: Number(e.target.value) })}
            className="mt-2.5 w-full accent-primary"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-reasoning`} className={LABEL_CLS}>我此刻的想法</label>
        <textarea
          id={`${idPrefix}-reasoning`}
          rows={3}
          value={draft.reasoning}
          onChange={(e) => onChange({ ...draft, reasoning: e.target.value })}
          placeholder="现在为什么这么倾向？哪些权衡在拉扯？"
          className={`${FIELD_CLS} resize-y`}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-missing`} className={LABEL_CLS}>还缺什么信息</label>
        <input
          id={`${idPrefix}-missing`}
          type="text"
          value={draft.missingInfo}
          onChange={(e) => onChange({ ...draft, missingInfo: e.target.value })}
          placeholder="如：目标院校近三年复试线、目标岗位真实薪资"
          className={FIELD_CLS}
        />
      </div>
    </div>
  );
}

/** 想法演变时间线，最新的在最后 */
function SnapshotTimeline({ snapshots }: { snapshots: DecisionSnapshot[] }) {
  if (snapshots.length === 0) {
    return <p className="text-xs text-muted-foreground">还没有想法记录，点「补记一次想法」写下此刻的权衡</p>;
  }
  return (
    <ol className="space-y-4 border-l border-border pl-4">
      {snapshots.map((s) => (
        <li key={s.id} className="relative">
          <span aria-hidden="true" className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-primary" />
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <time dateTime={s.createdAt} className="text-muted-foreground">{formatDate(s.createdAt)}</time>
            <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">倾向：{s.leaning}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <div
              role="img"
              aria-label={`信心度 ${s.confidence}%`}
              className="h-1.5 w-28 overflow-hidden rounded-full bg-secondary"
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${s.confidence}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{s.confidence}%</span>
          </div>
          {s.reasoning !== '' && <p className="mt-1.5 text-sm leading-relaxed text-foreground">{s.reasoning}</p>}
          {s.missingInfo !== '' && <p className="mt-1 text-xs text-muted-foreground">还缺：{s.missingInfo}</p>}
        </li>
      ))}
    </ol>
  );
}

function NewDecisionForm({ onSaved, onCancel }: { onSaved: () => void; onCancel: () => void }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<OptionDraft[]>([emptyOptionDraft(), emptyOptionDraft()]);
  const [snapshot, setSnapshot] = useState<SnapshotDraft>(emptySnapshotDraft());
  const [error, setError] = useState('');

  const updateOption = (index: number, patch: Partial<OptionDraft>) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  };

  const handleAddOption = () => {
    setOptions((prev) => (prev.length < MAX_OPTIONS ? [...prev, emptyOptionDraft()] : prev));
  };

  const handleRemoveOption = (index: number) => {
    setOptions((prev) => (prev.length > MIN_OPTIONS ? prev.filter((_, i) => i !== index) : prev));
  };

  const handleSave = () => {
    const trimmedQuestion = question.trim();
    if (trimmedQuestion === '') {
      setError('先写下你纠结的问题');
      return;
    }
    const validOptions: DecisionOption[] = options
      .map((o) => ({ label: o.label.trim(), pros: o.pros.trim(), cons: o.cons.trim() }))
      .filter((o) => o.label !== '');
    if (validOptions.length < MIN_OPTIONS) {
      setError(`至少填写 ${MIN_OPTIONS} 个选项的名称`);
      return;
    }

    const entry = addDecision(trimmedQuestion, validOptions);
    addSnapshot(entry.id, {
      leaning: snapshot.leaning,
      confidence: snapshot.confidence,
      reasoning: snapshot.reasoning.trim(),
      missingInfo: snapshot.missingInfo.trim(),
    });
    onSaved();
  };

  return (
    <section aria-label="记一个新决策" className="mb-6 rounded-2xl border border-border/30 bg-card p-5 spring-in">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">记一个新决策</h3>
        <button
          type="button"
          onClick={onCancel}
          aria-label="取消并关闭表单"
          className="rounded-lg p-1.5 text-muted-foreground/60 transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="new-decision-question" className={LABEL_CLS}>纠结的问题</label>
          <textarea
            id="new-decision-question"
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="如：毕业后考研还是直接就业？"
            className={`${FIELD_CLS} resize-y`}
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">摆在面前的选项（{MIN_OPTIONS}-{MAX_OPTIONS} 个）</p>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="rounded-xl border border-border/30 bg-background p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">选项 {index + 1}</span>
                  {options.length > MIN_OPTIONS && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      aria-label={`删除选项 ${index + 1}`}
                      className="rounded p-1 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => updateOption(index, { label: e.target.value })}
                    aria-label={`选项 ${index + 1} 名称`}
                    placeholder="选项名称，如：考研"
                    className={FIELD_CLS}
                  />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      type="text"
                      value={option.pros}
                      onChange={(e) => updateOption(index, { pros: e.target.value })}
                      aria-label={`选项 ${index + 1}：我看重什么`}
                      placeholder="我看重什么"
                      className={FIELD_CLS}
                    />
                    <input
                      type="text"
                      value={option.cons}
                      onChange={(e) => updateOption(index, { cons: e.target.value })}
                      aria-label={`选项 ${index + 1}：我担心什么`}
                      placeholder="我担心什么"
                      className={FIELD_CLS}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {options.length < MAX_OPTIONS && (
            <button type="button" onClick={handleAddOption} className={`mt-2 ${GHOST_BTN_CLS}`}>
              <Plus className="h-3.5 w-3.5" /> 加一个选项
            </button>
          )}
        </div>

        <div className="rounded-xl border border-border/30 bg-background p-3">
          <p className="mb-3 text-xs font-medium text-muted-foreground">此刻的想法（第一条记录）</p>
          <SnapshotFields
            idPrefix="new-snap"
            optionLabels={options.map((o) => o.label)}
            draft={snapshot}
            onChange={setSnapshot}
          />
        </div>

        {error !== '' && <p role="alert" className="text-xs text-destructive">{error}</p>}

        <div className="flex gap-2">
          <button type="button" onClick={handleSave} className={PRIMARY_BTN_CLS}>保存决策</button>
          <button type="button" onClick={onCancel} className={GHOST_BTN_CLS}>取消</button>
        </div>
      </div>
    </section>
  );
}

function DecisionCard({ decision, onChanged }: { decision: DecisionEntry; onChanged: () => void }) {
  const [showSnapshotForm, setShowSnapshotForm] = useState(false);
  const [showSettle, setShowSettle] = useState(false);
  const [snapshotDraft, setSnapshotDraft] = useState<SnapshotDraft>(emptySnapshotDraft());
  const [settleChoice, setSettleChoice] = useState('');

  const optionLabels = decision.options.map((o) => o.label);
  const latest = decision.snapshots[decision.snapshots.length - 1];

  const openSnapshotForm = () => {
    setSnapshotDraft({
      leaning: latest !== undefined ? latest.leaning : NO_LEANING,
      confidence: latest !== undefined ? latest.confidence : DEFAULT_CONFIDENCE,
      reasoning: '',
      missingInfo: '',
    });
    setShowSettle(false);
    setShowSnapshotForm(true);
  };

  const openSettle = () => {
    const fallback = optionLabels.length > 0 ? optionLabels[0] : '';
    setSettleChoice(latest !== undefined && optionLabels.includes(latest.leaning) ? latest.leaning : fallback);
    setShowSnapshotForm(false);
    setShowSettle(true);
  };

  const handleSaveSnapshot = () => {
    addSnapshot(decision.id, {
      leaning: snapshotDraft.leaning,
      confidence: snapshotDraft.confidence,
      reasoning: snapshotDraft.reasoning.trim(),
      missingInfo: snapshotDraft.missingInfo.trim(),
    });
    setShowSnapshotForm(false);
    onChanged();
  };

  const handleSettle = () => {
    if (settleChoice === '') return;
    settleDecision(decision.id, settleChoice);
    onChanged();
  };

  const handleDelete = () => {
    if (window.confirm(DELETE_CONFIRM_TEXT)) {
      deleteDecision(decision.id);
      onChanged();
    }
  };

  return (
    <article className="space-y-4 rounded-2xl border border-border/30 bg-card p-5">
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-foreground">{decision.question}</h3>
        <button
          type="button"
          onClick={handleDelete}
          aria-label={`删除决策：${decision.question}`}
          className="shrink-0 rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        {decision.options.map((option, index) => (
          <div key={`${option.label}-${index}`} className="rounded-xl border border-border/30 bg-background px-3 py-2.5">
            <p className="text-sm font-medium text-foreground">{option.label}</p>
            {option.pros !== '' && <p className="mt-1 text-xs text-muted-foreground">看重：{option.pros}</p>}
            {option.cons !== '' && <p className="mt-0.5 text-xs text-muted-foreground">担心：{option.cons}</p>}
          </div>
        ))}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">想法时间线</p>
        <SnapshotTimeline snapshots={decision.snapshots} />
      </div>

      {showSnapshotForm && (
        <div className="space-y-3 rounded-xl border border-border/30 bg-background p-3 spring-in">
          <p className="text-xs font-medium text-muted-foreground">补记一次想法</p>
          <SnapshotFields
            idPrefix={`snap-${decision.id}`}
            optionLabels={optionLabels}
            draft={snapshotDraft}
            onChange={setSnapshotDraft}
          />
          <div className="flex gap-2">
            <button type="button" onClick={handleSaveSnapshot} className={PRIMARY_BTN_CLS}>保存这次想法</button>
            <button type="button" onClick={() => setShowSnapshotForm(false)} className={GHOST_BTN_CLS}>取消</button>
          </div>
        </div>
      )}

      {showSettle && (
        <div className="space-y-2 rounded-xl border border-border/30 bg-background p-3 spring-in">
          <label htmlFor={`settle-${decision.id}`} className={LABEL_CLS}>你最终选择了哪个？</label>
          <div className="flex flex-wrap items-center gap-2">
            <select
              id={`settle-${decision.id}`}
              value={settleChoice}
              onChange={(e) => setSettleChoice(e.target.value)}
              className={`${FIELD_CLS} sm:w-auto`}
            >
              {decision.options.map((option, index) => (
                <option key={`${option.label}-${index}`} value={option.label}>{option.label}</option>
              ))}
            </select>
            <button type="button" onClick={handleSettle} className={PRIMARY_BTN_CLS}>确认</button>
            <button type="button" onClick={() => setShowSettle(false)} className={GHOST_BTN_CLS}>取消</button>
          </div>
        </div>
      )}

      {!showSnapshotForm && !showSettle && (
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={openSnapshotForm}
            className="inline-flex items-center gap-1.5 rounded-xl bg-secondary px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80 btn-press"
          >
            <PenLine className="h-3.5 w-3.5" /> 补记一次想法
          </button>
          <button
            type="button"
            onClick={openSettle}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary btn-press"
          >
            <Check className="h-3.5 w-3.5" /> 已想清楚
          </button>
        </div>
      )}
    </article>
  );
}

function SettledCard({ decision, onChanged }: { decision: DecisionEntry; onChanged: () => void }) {
  const handleReopen = () => {
    reopenDecision(decision.id);
    onChanged();
  };

  const handleDelete = () => {
    if (window.confirm(DELETE_CONFIRM_TEXT)) {
      deleteDecision(decision.id);
      onChanged();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/30 bg-card px-4 py-3 opacity-70 transition-opacity hover:opacity-100">
      <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">已决定</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-foreground">{decision.question}</p>
        {decision.settledChoice !== undefined && (
          <p className="text-xs text-muted-foreground">选择了：{decision.settledChoice}</p>
        )}
      </div>
      <button type="button" onClick={handleReopen} className={GHOST_BTN_CLS}>
        <RotateCcw className="h-3 w-3" /> 重新打开
      </button>
      <button
        type="button"
        onClick={handleDelete}
        aria-label={`删除决策：${decision.question}`}
        className="rounded-lg p-1.5 text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-destructive"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center py-16 text-center spring-in">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-secondary">
        <NotebookPen className="h-10 w-10 text-muted-foreground/30" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">还没有决策记录</h3>
      <p className="mb-1 max-w-md text-sm leading-relaxed text-muted-foreground">
        纠结的时候，把此刻的权衡写下来：倾向哪边、有几分把握、还缺什么信息。
      </p>
      <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        过段时间回看，你会看到自己的想法是怎么一步步变化的——看清自己怎么想，比急着要一个答案更重要。
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm btn-press"
      >
        <Plus className="h-4 w-4" /> 记一个新决策
      </button>
    </div>
  );
}

export function DecisionJournal() {
  const [decisions, setDecisions] = useState<DecisionEntry[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setDecisions(getDecisions());
  }, []);

  const refresh = () => setDecisions(getDecisions());

  const openDecisions = decisions.filter((d) => d.status === 'open');
  const settledDecisions = decisions.filter((d) => d.status === 'settled');
  const isEmpty = decisions.length === 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">决策日志</h2>
            <p className="mt-1 text-sm text-muted-foreground">记下你此刻的权衡，过段时间回看想法怎么变了</p>
          </div>
          {!showForm && !isEmpty && (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm btn-press"
            >
              <Plus className="h-4 w-4" /> 记一个新决策
            </button>
          )}
        </header>

        {showForm && (
          <NewDecisionForm
            onSaved={() => { setShowForm(false); refresh(); }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {isEmpty && !showForm ? (
          <EmptyState onCreate={() => setShowForm(true)} />
        ) : (
          <>
            <section aria-label="进行中的决策" className="space-y-4">
              {openDecisions.map((d) => (
                <DecisionCard key={d.id} decision={d} onChanged={refresh} />
              ))}
              {openDecisions.length === 0 && !isEmpty && (
                <p className="py-4 text-center text-sm text-muted-foreground">手头的纠结都已想清楚了</p>
              )}
            </section>

            {settledDecisions.length > 0 && (
              <section aria-label="已决定的决策" className="mt-8 border-t border-border/30 pt-4">
                <p className="mb-3 text-xs text-muted-foreground">已决定（{settledDecisions.length}）</p>
                <div className="space-y-2">
                  {settledDecisions.map((d) => (
                    <SettledCard key={d.id} decision={d} onChanged={refresh} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
