import React, { useState, useEffect } from 'react';
import { Copy, Check, Trash2, Braces, ShieldCheck, ShieldAlert, Share2 } from 'lucide-react';
import Ajv from 'ajv';
import { trackToolAction } from '../utils/analytics';
import { useSearchParams } from 'react-router-dom';

export default function JsonFormatter() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialInput = searchParams.get('input') || '{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York",\n  "skills": ["React", "Node.js"]\n}';
  const initialSchema = searchParams.get('schema') || '{\n  "type": "object",\n  "properties": {\n    "name": { "type": "string" },\n    "age": { "type": "number" },\n    "city": { "type": "string" },\n    "skills": {\n      "type": "array",\n      "items": { "type": "string" }\n    }\n  },\n  "required": ["name", "age"]\n}';

  const [input, setInput] = useState(initialInput);
  const [schemaInput, setSchemaInput] = useState(initialSchema);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; errors?: any[] } | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showSchema, setShowSchema] = useState(!!searchParams.get('schema'));

  // Automatically format if input was provided via URL
  useEffect(() => {
    if (searchParams.get('input')) {
      formatJson();
    }
  }, []); // Run once on mount

  const formatJson = () => {
    trackToolAction('json-formatter', 'format_json');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
      if (showSchema) validateJson(parsed);
    } catch (err: any) {
      setError(`JSON Error: ${err.message}`);
      setOutput('');
      setValidationResult(null);
    }
  };

  const minifyJson = () => {
    trackToolAction('json-formatter', 'minify_json');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
      if (showSchema) validateJson(parsed);
    } catch (err: any) {
      setError(`JSON Error: ${err.message}`);
      setOutput('');
      setValidationResult(null);
    }
  };

  const validateJson = (parsedJson?: any) => {
    trackToolAction('json-formatter', 'validate_schema');
    try {
      const ajv = new Ajv({ allErrors: true });
      const schema = JSON.parse(schemaInput);
      const data = parsedJson || JSON.parse(input);
      
      const validate = ajv.compile(schema);
      const valid = validate(data);
      
      setValidationResult({
        valid: valid as boolean,
        errors: validate.errors || undefined
      });
      setError('');
      
      // If we're just validating (not formatting/minifying), update output to show formatted JSON
      if (!parsedJson) {
        setOutput(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setError(`Schema Error: ${err.message}`);
      setValidationResult(null);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    trackToolAction('json-formatter', 'copy_output');
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    trackToolAction('json-formatter', 'share_link');
    const url = new URL(window.location.href);
    url.searchParams.set('input', input);
    if (showSchema) {
      url.searchParams.set('schema', schemaInput);
    } else {
      url.searchParams.delete('schema');
    }
    navigator.clipboard.writeText(url.toString());
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={formatJson}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center"
        >
          <Braces size={18} className="mr-2" /> Format JSON
        </button>
        <button
          onClick={minifyJson}
          className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Minify JSON
        </button>
        <button
          onClick={() => setShowSchema(!showSchema)}
          className={`px-6 py-2.5 font-medium rounded-xl transition-colors flex items-center ${
            showSchema 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ShieldCheck size={18} className="mr-2" /> {showSchema ? 'Hide Schema' : 'Validate Schema'}
        </button>
        
        <div className="ml-auto flex gap-4">
          <button
            onClick={handleShare}
            className="px-6 py-2.5 bg-white border border-indigo-200 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition-colors flex items-center"
          >
            {shareCopied ? <Check size={18} className="mr-2" /> : <Share2 size={18} className="mr-2" />}
            {shareCopied ? 'Link Copied!' : 'Share'}
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); setError(''); setValidationResult(null); }}
            className="px-6 py-2.5 bg-white border border-gray-300 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors flex items-center"
          >
            <Trash2 size={18} className="mr-2" /> Clear
          </button>
        </div>
      </div>

      {showSchema && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">JSON Schema</label>
            <button
              onClick={() => validateJson()}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              <ShieldCheck size={16} className="mr-1" /> Run Validation
            </button>
          </div>
          <textarea
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            className="w-full h-48 p-4 font-mono text-sm border border-gray-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
            placeholder="Paste your JSON Schema here..."
            spellCheck="false"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[500px] p-4 font-mono text-sm border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            placeholder="Paste your JSON here..."
            spellCheck="false"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Output</label>
            {output && (
              <button
                onClick={copyToClipboard}
                className="text-sm flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {copied ? <><Check size={16} className="mr-1" /> Copied</> : <><Copy size={16} className="mr-1" /> Copy</>}
              </button>
            )}
          </div>
          <div className="relative h-[500px] flex flex-col">
            <textarea
              readOnly
              value={output}
              className={`w-full flex-grow p-4 font-mono text-sm border rounded-xl focus:outline-none bg-gray-900 text-gray-100 ${
                error ? 'border-red-500' : validationResult ? (validationResult.valid ? 'border-emerald-500' : 'border-amber-500') : 'border-gray-300'
              }`}
              placeholder="Formatted JSON will appear here..."
              spellCheck="false"
            />
            
            {/* Error Messages */}
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm shadow-lg">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {/* Validation Results */}
            {!error && validationResult && (
              <div className={`absolute bottom-4 left-4 right-4 px-4 py-3 rounded-lg text-sm shadow-lg border ${
                validationResult.valid 
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-800' 
                  : 'bg-amber-50 border-amber-400 text-amber-800'
              }`}>
                <div className="flex items-center font-bold mb-1">
                  {validationResult.valid ? (
                    <><ShieldCheck size={16} className="mr-2" /> JSON is valid against schema</>
                  ) : (
                    <><ShieldAlert size={16} className="mr-2" /> Schema Validation Failed</>
                  )}
                </div>
                {!validationResult.valid && validationResult.errors && (
                  <ul className="list-disc pl-5 mt-2 space-y-1 max-h-32 overflow-y-auto">
                    {validationResult.errors.map((err, idx) => (
                      <li key={idx} className="font-mono text-xs">
                        <span className="font-semibold">{err.instancePath || 'root'}</span>: {err.message}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
