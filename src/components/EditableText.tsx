'use client';

import React, { useState } from 'react';
import { Edit2, Check, X, CloudUpload } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

interface EditableTextProps {
  id: string;
  defaultText: string;
  title?: string;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span';
}

export default function EditableText({
  id,
  defaultText,
  title,
  className = '',
  as = 'p',
}: EditableTextProps) {
  const { isEditMode, updateContentKey } = useSiteContent();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Sync state if defaultText changes
  React.useEffect(() => {
    setText(defaultText);
  }, [defaultText]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateContentKey(id, text, title);
    setIsSaving(false);
    if (success) {
      setFeedback('Saved to Supabase! ✓');
      setTimeout(() => {
        setFeedback(null);
        setIsEditing(false);
      }, 1200);
    } else {
      setFeedback('Failed to save to Supabase');
      setTimeout(() => setFeedback(null), 2500);
    }
  };

  const handleCancel = () => {
    setText(defaultText);
    setIsEditing(false);
  };

  const Component = as;

  if (!isEditMode) {
    return <Component className={className}>{defaultText}</Component>;
  }

  return (
    <div className="relative group inline-block w-full">
      {!isEditing ? (
        <div className="relative border border-dashed border-cyan-400/40 rounded-lg p-1.5 transition hover:bg-cyan-500/10">
          <Component className={className}>{defaultText}</Component>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition px-2 py-0.5 rounded bg-cyan-500 text-black font-bold text-[10px] flex items-center gap-1 shadow-lg z-10"
            title="Edit this text in Supabase"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit in Supabase</span>
          </button>
        </div>
      ) : (
        <div className="bg-neutral-900 border-2 border-cyan-400 rounded-xl p-3 shadow-[0_0_25px_rgba(0,240,255,0.3)] z-50 my-2 space-y-2">
          <div className="flex justify-between items-center text-xs text-cyan-400 font-mono">
            <span>Editing ID: {id}</span>
            <span className="text-neutral-400">Live Supabase Sync</span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={Math.max(3, Math.min(8, Math.ceil(text.length / 60)))}
            className="w-full bg-black/80 text-white rounded-lg p-2.5 text-xs sm:text-sm border border-neutral-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-sans"
          />

          <div className="flex justify-between items-center pt-1">
            <span className="text-[11px] font-medium text-emerald-400">{feedback}</span>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1 transition"
              >
                <X className="w-3 h-3" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3.5 py-1 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1 shadow-md transition disabled:opacity-50"
              >
                {isSaving ? (
                  <CloudUpload className="w-3.5 h-3.5 animate-bounce" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save to Supabase'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
