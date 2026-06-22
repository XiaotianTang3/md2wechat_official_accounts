"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ChangeEvent,
} from "react";

type EditorPaneProps = {
  value: string;
  onChange: (value: string) => void;
};

export type EditorPaneHandle = {
  /**
   * 在当前光标处插入文本，保留选区位置；textarea 失焦时使用 blur 时保存的回退值。
   * 用于工具栏按钮（插入图片等）往编辑器里塞 markdown。
   */
  insertAtCursor: (text: string) => void;
};

type SavedSelection = {
  start: number;
  end: number;
  scrollTop: number;
};

export const EditorPane = forwardRef<EditorPaneHandle, EditorPaneProps>(
  function EditorPane({ value, onChange }, ref) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // 点工具栏按钮 → textarea 失焦 → selection 会被部分浏览器折叠/丢失。
    // blur 时存下选区 + scrollTop，insertAtCursor 失焦场景下用回退值。
    const savedSelectionRef = useRef<SavedSelection | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        insertAtCursor: (text: string) => {
          const ta = textareaRef.current;
          if (!ta) {
            onChange(value + text);
            return;
          }

          const isFocused = document.activeElement === ta;
          const saved = savedSelectionRef.current;
          let start: number;
          let end: number;
          let scrollTop: number;
          if (isFocused) {
            start = ta.selectionStart ?? value.length;
            end = ta.selectionEnd ?? value.length;
            scrollTop = ta.scrollTop;
          } else if (saved) {
            start = saved.start;
            end = saved.end;
            scrollTop = saved.scrollTop;
          } else {
            start = value.length;
            end = value.length;
            scrollTop = 0;
          }

          const next = value.slice(0, start) + text + value.slice(end);
          onChange(next);

          // Restore cursor + scroll position on next paint.
          // setSelectionRange 必须在 textarea 拿到新 value 之后才有效。
          requestAnimationFrame(() => {
            ta.focus();
            const pos = start + text.length;
            ta.setSelectionRange(pos, pos);
            ta.scrollTop = scrollTop;
          });
        },
      }),
      [value, onChange],
    );

    function handleBlur() {
      const ta = textareaRef.current;
      if (!ta) return;
      savedSelectionRef.current = {
        start: ta.selectionStart ?? 0,
        end: ta.selectionEnd ?? 0,
        scrollTop: ta.scrollTop,
      };
    }

    return (
      <div className="flex w-1/2 min-h-0 flex-col border-r border-zinc-200 p-4">
        <textarea
          ref={textareaRef}
          className="h-full min-h-[200px] w-full flex-1 resize-none rounded border border-zinc-300 bg-white p-3 font-mono text-sm text-zinc-900 outline-none focus:border-zinc-400"
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
          onBlur={handleBlur}
          spellCheck={false}
          aria-label="Markdown 源码"
        />
      </div>
    );
  },
);
