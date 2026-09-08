

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from "lucide-react";

type EditorContenidoProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function EditorContenido({
  value,
  onChange,
  disabled = false,
}: EditorContenidoProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: value,
    editable: !disabled,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="border border-slate-300 bg-white p-4 text-sm text-slate-500">
        Cargando editor...
      </div>
    );
  }

  const agregarEnlace = () => {
    const url = window.prompt("Introduce la URL:");

    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="border border-slate-300 bg-white">
      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          title="Negrita"
          className={`p-2 hover:bg-slate-200 ${
            editor.isActive("bold") ? "bg-slate-200" : ""
          }`}
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          title="Cursiva"
          className={`p-2 hover:bg-slate-200 ${
            editor.isActive("italic") ? "bg-slate-200" : ""
          }`}
        >
          <Italic className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-300" />

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          disabled={disabled}
          title="Lista"
          className={`p-2 hover:bg-slate-200 ${
            editor.isActive("bulletList") ? "bg-slate-200" : ""
          }`}
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          disabled={disabled}
          title="Lista numerada"
          className={`p-2 hover:bg-slate-200 ${
            editor.isActive("orderedList") ? "bg-slate-200" : ""
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-300" />

        <button
          type="button"
          onClick={agregarEnlace}
          disabled={disabled}
          title="Agregar enlace"
          className="p-2 hover:bg-slate-200"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-300" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          title="Deshacer"
          className="p-2 hover:bg-slate-200 disabled:opacity-40"
        >
          <Undo2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          title="Rehacer"
          className="p-2 hover:bg-slate-200 disabled:opacity-40"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>

      {/* Área de escritura */}
      <EditorContent
        editor={editor}
        className="min-h-87.5 px-4 py-3 text-sm outline-none"
      />
    </div>
  );
}