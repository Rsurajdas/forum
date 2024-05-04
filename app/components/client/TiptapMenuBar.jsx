import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconItalic,
  IconList,
  IconListNumbers,
  IconPilcrow,
  IconStrikethrough,
} from '@tabler/icons-react';

export default function TiptapMenuBar({ editor }) {
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="flex border-b border-gray-300 p-1 flex-wrap gap-1">
        <div className="flex gap-x-1 border-r border-gray-300 pr-1">
          <button
            className="hover:bg-stone-300 p-1 rounded-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <IconArrowBackUp color="#444" />
          </button>
          <button
            className="hover:bg-indigo-100 p-1 rounded-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <IconArrowForwardUp color="#444" />
          </button>
        </div>
        <div className="flex pl-1 gap-x-1 border-r border-gray-300 pr-1">
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('paragraph') ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <IconPilcrow color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
              }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <IconH1 color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
              }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <IconH2 color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
              }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <IconH3 color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
              }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <IconH4 color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
              }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <IconH5 color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
              }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <IconH6 color="#444" />
          </button>
        </div>
        <div className="flex pl-1 gap-x-1 border-r border-gray-300 pr-1">
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('bold') ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <IconBold color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('italic') ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <IconItalic color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('strike') ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          >
            <IconStrikethrough color="#444" />
          </button>
        </div>
        <div className="flex pl-1 gap-x-1 border-r border-gray-300 pr-1">
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('bulletList') ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <IconList color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive('orderedList') ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <IconListNumbers color="#444" />
          </button>
        </div>
        <div className="flex pl-1 gap-x-1 border-r border-gray-300 pr-1">
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          >
            <IconAlignLeft color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          >
            <IconAlignCenter color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          >
            <IconAlignRight color="#444" />
          </button>
          <button
            className={`hover:bg-indigo-100 p-1 rounded-sm font-bold ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
              }`}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          >
            <IconAlignJustified color="#444" />
          </button>
        </div>
      </div>
    </>
  );
}
