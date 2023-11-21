import { useState } from "react";
import dynamic from "next/dynamic";

import Spinner from "./Spinner";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SystemPromptEditor = ({ value, onChange }: Props) => {

  const [editorMounted, setEditorMounted] = useState(false);

  return (
    <div className="hidden flex-1 overflow-hidden border-r outline-none border-base-300 md:block h-full relative">
      {!editorMounted && (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4 text-sm text-base-content">
          <Spinner />
        </div>
      )}
      <MonacoEditor
        value={value}
        onChange={onChange}
        language="markdown"
        theme={"vs-dark"}
        options={{
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 0
          },
          wordWrap: "on",
          padding: {
            top: 16,
            bottom: 16,
          },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        editorDidMount={() => setEditorMounted(true)}
      />
    </div>
  );
};

export default SystemPromptEditor;
