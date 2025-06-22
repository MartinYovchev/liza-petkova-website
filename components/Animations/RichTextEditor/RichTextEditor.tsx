'use client';
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styles from './RichTextEditor.module.scss';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  disabled = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${styles.button} ${
            editor?.isActive('bold') ? styles.active : ''
          }`}
          type='button'
          disabled={disabled}
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${styles.button} ${
            editor?.isActive('italic') ? styles.active : ''
          }`}
          type='button'
          disabled={disabled}
        >
          Italic
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${styles.button} ${
            editor?.isActive('bulletList') ? styles.active : ''
          }`}
          type='button'
          disabled={disabled}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`${styles.button} ${
            editor?.isActive('orderedList') ? styles.active : ''
          }`}
          type='button'
          disabled={disabled}
        >
          Numbered List
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${styles.button} ${
            editor?.isActive('heading', { level: 2 }) ? styles.active : ''
          }`}
          type='button'
          disabled={disabled}
        >
          Heading
        </button>
      </div>
      <EditorContent
        editor={editor}
        className={styles.content}
        placeholder={placeholder}
      />
    </div>
  );
}
