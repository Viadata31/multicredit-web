

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

// Importaciones de estilo y tipografía estables
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";

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
      TextStyle,
      FontFamily,
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

  // FUNCIÓN DE ENLACE BLINDADA CONTRA PÉRDIDA DE FOCO
  const agregarEnlace = (e: React.MouseEvent) => {
    // Evita que el botón le robe el foco y la selección al texto del editor
    e.preventDefault();

    // Obtener si ya existe un link en la selección actual
    const urlPrevia = editor.getAttributes("link").href;
    
    // Abrir la ventana pidiendo la dirección
    const url = window.prompt("Introduce la URL (ej. https://ejemplo.com):", urlPrevia || "");

    // Si canceló la ventana, salir
    if (url === null) return;

    // Si aceptó pero lo dejó vacío, remover el enlace anterior
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Autocompletar protocolo seguro si el usuario lo olvidó
    const urlFormateada = url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;

    // Forzar el foco de vuelta e inyectar el hipervínculo HTML
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: urlFormateada })
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
          onClick={() => editor.chain().focus().toggleBulletList().run()}
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
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          title="Lista numerada"
          className={`p-2 hover:bg-slate-200 ${
            editor.isActive("orderedList") ? "bg-slate-200" : ""
          }`}
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* BOTÓN DE ENLACE CORREGIDO CON EVENTOS DE CAPTURA */}
        <button
          type="button"
          onClick={agregarEnlace}
          onMouseDown={(e) => e.preventDefault()} // Clave para mantener la selección azul
          disabled={disabled}
          title="Agregar enlace"
          className={`p-2 hover:bg-slate-200 ${
            editor.isActive("link") ? "bg-slate-200 text-orange-600" : ""
          }`}
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

        {/* SELECTORES DE FUENTE Y TAMAÑO DE LETRA */}
        <div className="mx-1 h-5 w-px bg-slate-300" />

        {/* Selector Desplegable de Tipo de Fuente */}
        <select
          disabled={disabled}
          value={
            editor.isActive("textStyle", { fontFamily: "Arial" }) ? "Arial" :
            editor.isActive("textStyle", { fontFamily: "Times New Roman" }) ? "Times New Roman" :
            editor.isActive("textStyle", { fontFamily: "Courier New" }) ? "Courier New" :
            editor.isActive("textStyle", { fontFamily: "Georgia" }) ? "Georgia" :
            editor.isActive("textStyle", { fontFamily: "Verdana" }) ? "Verdana" :
            "default"
          }
          onChange={(e) => {
            const fuente = e.target.value;
            if (fuente === "default") {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(fuente).run();
            }
          }}
          className="h-8 w-40 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none cursor-pointer disabled:opacity-50"
        >
          <option value="default">Calibri (Predeterminada)</option>
          <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
          <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
          <option value="Courier New" style={{ fontFamily: "Courier New" }}>Courier New</option>
          <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
          <option value="Verdana" style={{ fontFamily: "Verdana" }}>Verdana</option>
        </select>

        {/* Selector Desplegable de Tamaño de Letra */}
        <select
          disabled={disabled}
          value={
            editor.isActive("textStyle", { fontSize: "12px" }) ? "12px" :
            editor.isActive("textStyle", { fontSize: "14px" }) ? "14px" :
            editor.isActive("textStyle", { fontSize: "16px" }) ? "16px" :
            editor.isActive("textStyle", { fontSize: "18px" }) ? "18px" :
            editor.isActive("textStyle", { fontSize: "20px" }) ? "20px" :
            editor.isActive("textStyle", { fontSize: "24px" }) ? "24px" :
            editor.isActive("textStyle", { fontSize: "30px" }) ? "30px" :
            "default"
          }
          onChange={(e) => {
            const tamano = e.target.value;
            if (tamano === "default") {
              editor.chain().focus().unsetMark("textStyle").run();
            } else {
              editor.chain().focus().setMark("textStyle", { fontSize: tamano }).run();
            }
          }}
          className="h-8 w-16 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none cursor-pointer disabled:opacity-50"
        >
          <option value="default">12</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="30px">30</option>
        </select>
      </div>

      {/* Área de escritura */}
      <EditorContent
        editor={editor}
        className="min-h-87.5 px-4 py-3 text-sm outline-none [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-800 hover:[&_a]:cursor-pointer"
      />
    </div>
  );
}
