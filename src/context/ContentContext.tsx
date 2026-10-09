'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, SiteContentItem } from '../lib/supabase';
import { defaultContent } from '../lib/defaultContent';
import { contentEs } from '../lib/contentEs';

export type Language = 'es' | 'en';

interface ContentContextType {
  content: typeof defaultContent;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateContentKey: (id: string, text: string, title?: string) => Promise<boolean>;
  loading: boolean;
  lastSaved: string | null;
  supabaseSynced: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es'); // Default to Spanish as requested
  const [contentEn, setContentEn] = useState(defaultContent);
  const [contentEsState, setContentEsState] = useState(contentEs);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [supabaseSynced, setSupabaseSynced] = useState(false);

  // Load from Supabase on mount
  useEffect(() => {
    async function fetchSupabaseContent() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('site_content').select('*');
        if (error) {
          console.warn('Supabase fetch notice:', error.message);
          return;
        }

        if (data && data.length > 0) {
          setSupabaseSynced(true);
          // Apply any cloud modifications
          data.forEach((item: SiteContentItem) => {
            // Check if key is prefixed for spanish or general
            if (item.id === 'hero_title') {
              setContentEn((prev) => ({ ...prev, hero: { ...prev.hero, headline: item.content } }));
              setContentEsState((prev) => ({ ...prev, hero: { ...prev.hero, headline: item.content } }));
            }
            if (item.id === 'city_overview') {
              setContentEn((prev) => ({ ...prev, overview: { ...prev.overview, description: item.content } }));
              setContentEsState((prev) => ({ ...prev, overview: { ...prev.overview, description: item.content } }));
            }
          });
        }
      } catch (err) {
        console.warn('Supabase initialization fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSupabaseContent();
  }, []);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateContentKey = async (id: string, text: string, title?: string): Promise<boolean> => {
    try {
      if (language === 'es') {
        setContentEsState((prev) => {
          const updated = { ...prev };
          if (id === 'hero_title') updated.hero.headline = text;
          if (id === 'hero_subtitle') updated.hero.subheadline = text;
          if (id === 'city_overview') updated.overview.description = text;
          if (id === 'climate_info') updated.travelEssentials.climateText = text;
          if (id === 'transit_info') updated.travelEssentials.transitText = text;
          if (id === 'kamakura_desc') updated.dayTrip.description = text;

          const attr = updated.attractions.find((a) => a.id === id.replace('_desc', ''));
          if (attr) attr.description = text;

          const food = updated.gastronomy.find((g) => g.id === (id === 'monja_desc' ? 'monjayaki' : id.replace('_desc', '')));
          if (food) food.description = text;

          const trad = updated.traditions.find((t) => t.id === id.replace('_desc', ''));
          if (trad) trad.description = text;

          return updated;
        });
      } else {
        setContentEn((prev) => {
          const updated = { ...prev };
          if (id === 'hero_title') updated.hero.headline = text;
          if (id === 'hero_subtitle') updated.hero.subheadline = text;
          if (id === 'city_overview') updated.overview.description = text;
          if (id === 'climate_info') updated.travelEssentials.climateText = text;
          if (id === 'transit_info') updated.travelEssentials.transitText = text;
          if (id === 'kamakura_desc') updated.dayTrip.description = text;

          const attr = updated.attractions.find((a) => a.id === id.replace('_desc', ''));
          if (attr) attr.description = text;

          const food = updated.gastronomy.find((g) => g.id === (id === 'monja_desc' ? 'monjayaki' : id.replace('_desc', '')));
          if (food) food.description = text;

          const trad = updated.traditions.find((t) => t.id === id.replace('_desc', ''));
          if (trad) trad.description = text;

          return updated;
        });
      }

      // Persist to Supabase
      const { error } = await supabase.from('site_content').upsert(
        {
          id: `${id}_${language}`,
          section: id.split('_')[0] || 'general',
          key_name: id,
          title: title || null,
          content: text,
          extra_data: { lang: language },
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (error) {
        console.error('Error saving to Supabase:', error.message);
        return false;
      }

      setLastSaved(new Date().toLocaleTimeString());
      setSupabaseSynced(true);
      return true;
    } catch (e) {
      console.error('Exception writing to Supabase:', e);
      return false;
    }
  };

  const currentContent = language === 'es' ? contentEsState : contentEn;

  return (
    <ContentContext.Provider
      value={{
        content: currentContent,
        language,
        setLanguage,
        toggleLanguage,
        isEditMode,
        toggleEditMode,
        updateContentKey,
        loading,
        lastSaved,
        supabaseSynced,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a ContentProvider');
  }
  return context;
}
