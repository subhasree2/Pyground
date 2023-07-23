"use client";
"use strict";
import { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import Editor from "@monaco-editor/react";
import Navbar from "./Navbar";
import Output from "./Output";

export default function Home() {
  const [code, setCode] = useState(`print("Hello World!")`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  console.log(process.env);

  const myCustomTheme = {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A9955", fontStyle: "italic" },
      { token: "keyword", foreground: "D73A49", fontStyle: "bold" },
      { token: "string", foreground: "E5C07B" },
    ],
    colors: {
      "editor.background": "#1E1E1E",
      "editor.lineHighlightBackground": "#44475A",
    },
  };

  useEffect(() => {
    monaco.editor.defineTheme("myCustomTheme", myCustomTheme);
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <Navbar 
        setOutput={setOutput}
        input={input}
        code={code} 
      />
      <div className="mt-10 p-2 editor">
        <Editor
          height={`95vh`}
          width={`100%`}
          language="python"
          defaultLanguage="python"
          theme="myCustomTheme"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>
      <div className="container flex">
        <div className="input">
          <div>Input :</div>
          <textarea className="text-lg p-1" placeholder="" name="" id="" cols="30" rows="10" value={input}
            onChange={(e) => setInput(e.target.value)} />
        </div>

        <Output output={output} />
      </div>
    </main>
  );
} 