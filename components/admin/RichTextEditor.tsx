'use client'

import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo2,
  Redo2,
  Code2,
  type LucideIcon,
} from 'lucide-react'
import { useEffect } from 'react'

/**
 * Enterprise rich-text editor built on TipTap / ProseMirror. Emits HTML so the
 * value drops straight into MongoDB and renders with dangerouslySetInnerHTML.
 */
export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write the long-form content here…',
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const editor = useEditor({
    immediatelyRender: false, // avoid SSR hydration mismatch in Next.js
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noreferrer', target: '_blank' },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'admin-richtext',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html === '<p></p>' ? '' : html)
    },
  })

  // Keep the editor in sync when the form resets or loads a different item.
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    const next = value || ''
    if (next !== current && next !== '' ) {
      editor.commands.setContent(next, { emitUpdate: false })
    } else if (next === '' && current !== '<p></p>') {
      editor.commands.clearContent(false)
    }
  }, [value, editor])

  if (!editor) {
    return (
      <div
        style={{
          borderRadius: 10,
          border: '1px solid rgba(10,34,128,0.20)',
          padding: '12px',
          minHeight: 160,
          background: '#fff',
          color: '#9ca3af',
          fontSize: 14,
        }}
      >
        Loading editor…
      </div>
    )
  }

  return (
    <div
      style={{
        borderRadius: 10,
        border: '1px solid rgba(10,34,128,0.20)',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <div
        className="flex flex-wrap items-center gap-1"
        style={{
          padding: '8px 10px',
          borderBottom: '1px solid rgba(10,34,128,0.12)',
          background: '#FAFBFF',
        }}
      >
        <ToolBtn editor={editor} Icon={Bold} title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} />
        <ToolBtn editor={editor} Icon={Italic} title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} />
        <ToolBtn editor={editor} Icon={Strikethrough} title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} />
        <Divider />
        <ToolBtn editor={editor} Icon={Heading2} title="Heading" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} />
        <ToolBtn editor={editor} Icon={Heading3} title="Subheading" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} />
        <Divider />
        <ToolBtn editor={editor} Icon={List} title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} />
        <ToolBtn editor={editor} Icon={ListOrdered} title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} />
        <ToolBtn editor={editor} Icon={Quote} title="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} />
        <ToolBtn editor={editor} Icon={Code2} title="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} />
        <Divider />
        <ToolBtn editor={editor} Icon={LinkIcon} title="Add link" onClick={() => setLink(editor)} active={editor.isActive('link')} />
        <Divider />
        <ToolBtn editor={editor} Icon={Undo2} title="Undo" onClick={() => editor.chain().focus().undo().run()} active={false} />
        <ToolBtn editor={editor} Icon={Redo2} title="Redo" onClick={() => editor.chain().focus().redo().run()} active={false} />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

function setLink(editor: Editor) {
  const prev = editor.getAttributes('link').href as string | undefined
  const url = window.prompt('Link URL (leave empty to remove)', prev ?? 'https://')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function Divider() {
  return (
    <span
      aria-hidden="true"
      style={{ width: 1, height: 20, background: 'rgba(10,34,128,0.14)', margin: '0 2px' }}
    />
  )
}

function ToolBtn({
  Icon,
  title,
  onClick,
  active,
}: {
  editor: Editor
  Icon: LucideIcon
  title: string
  onClick: () => void
  active: boolean
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
      className="inline-flex items-center justify-center"
      style={{
        width: 30,
        height: 30,
        borderRadius: 7,
        border: active ? '1px solid #1A38E8' : '1px solid transparent',
        background: active ? 'rgba(26,56,232,0.10)' : 'transparent',
        color: active ? '#1A38E8' : '#0A2280',
        cursor: 'pointer',
      }}
    >
      <Icon size={15} strokeWidth={1.9} />
    </button>
  )
}
