import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapMenuBar from './TiptapMenuBar';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';

export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write Something...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
    ],
  });

  return (
    <>
      <div className="border border-stone-300 rounded-md bg-white">
        <TiptapMenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
