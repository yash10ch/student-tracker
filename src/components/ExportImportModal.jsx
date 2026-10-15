import React, { useState } from 'react';
import { X, Download, Upload, FileJson, Check, AlertCircle } from 'lucide-react';

export default function ExportImportModal({ 
  isOpen, 
  onClose, 
  questions, 
  machineProjects, 
  onImportData 
}) {
  const [importStatus, setImportStatus] = useState(null);

  if (!isOpen) return null;

  // Export JSON file
  const handleExport = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      questions,
      machineProjects
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prep-pulse-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON file
  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.questions && Array.isArray(parsed.questions)) {
            onImportData(parsed.questions, parsed.machineProjects || []);
            setImportStatus({ type: 'success', message: `Successfully imported ${parsed.questions.length} questions!` });
            setTimeout(() => {
              onClose();
            }, 1200);
          } else {
            setImportStatus({ type: 'error', message: 'Invalid file format. Must contain a valid questions array.' });
          }
        } catch (err) {
          setImportStatus({ type: 'error', message: 'Error parsing JSON file. Please check file integrity.' });
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Backup & Restore Practice Data</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Option */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Export Practice Log</h3>
              <p className="text-xs text-slate-400">Download a JSON backup of your tracked questions & projects.</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/20"
          >
            Download JSON Backup
          </button>
        </div>

        {/* Import Option */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Restore from Backup</h3>
              <p className="text-xs text-slate-400">Upload a previously exported JSON backup file.</p>
            </div>
          </div>

          <label className="block w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 text-center text-xs font-semibold text-slate-300 cursor-pointer transition-all">
            <span>Select JSON File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Status Message */}
        {importStatus && (
          <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            importStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
          }`}>
            {importStatus.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{importStatus.message}</span>
          </div>
        )}

      </div>
    </div>
  );
}
