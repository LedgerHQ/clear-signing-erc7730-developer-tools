"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type Metadata } from "~/types";

const JsonFileImport = () => {
  const [data, setData] = useState<Metadata | null>(null);
  const [errorData, setErrorData] = useState<string | null>(null);

  const readFileOnUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    const fileReader = new FileReader();
    fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
      const fileContent = event?.target?.result;
      if (typeof fileContent === "string") {
        const parsedData = JSON.parse(fileContent) as { metadata: Metadata };

        if (parsedData?.metadata) {
          const metadata: Metadata = parsedData.metadata;
          setData(metadata);
          setErrorData(null);
        } else {
          setData(null);
          setErrorData("Metadata object not found in the JSON.");
        }
      } else {
        setData(null);
        setErrorData("Invalid file content");
      }
    };

    fileReader.readAsText(uploadedFile);
  };

  return (
    <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <h3 className="text-2xl font-bold">Upload your JSON metadata file</h3>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="jsonFile">JSON File</Label>
        <Input
          id="jsonFile"
          type="file"
          accept=".json"
          onChange={readFileOnUpload}
        />
      </div>

      {errorData && <div className="text-red-500">{errorData}</div>}

      {data && (
        <pre className="max-h-60 overflow-auto rounded-md bg-gray-200 p-2">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      {data && (
        <>
          <Label>Owner</Label>
          <div>{data.owner}</div>
        </>
      )}
    </div>
  );
};

export default JsonFileImport;
