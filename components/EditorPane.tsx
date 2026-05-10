type EditorPaneProps = {
  value: string;
  onChange: (value: string) => void;
};

export function EditorPane({ value, onChange }: EditorPaneProps) {
  return (
    <div className="flex w-1/2 min-h-0 flex-col border-r border-zinc-200 p-4">
      <textarea
        className="h-full min-h-[200px] w-full flex-1 resize-none rounded border border-zinc-300 bg-white p-3 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        aria-label="Markdown 源码"
      />
    </div>
  );
}
