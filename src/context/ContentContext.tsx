'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, SiteContentItem } from '../lib/supabase';
import { defaultContent } from '../lib/defaultContent';

interface ContentContextType {
  content: typeof defaultContent;
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateContentKey: (id: string, text: string, title?: string) => Promise<boolean>;
  loading: boolean;
  lastSaved: string | null;
  supabaseSynced: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultContent);
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
          setContent((prev) => {
            const updated = { ...prev };

            data.forEach((item: SiteContentItem) => {
              if (item.id === 'hero_title') updated.hero.headline = item.content;
              if (item.id === 'hero_subtitle') updated.hero.subheadline = item.content;
              if (item.id === 'city_overview') updated.overview.description = item.content;
              if (item.id === 'climate_info') updated.travelEssentials.climateText = item.content;
              if (item.id === 'transit_info') updated.travelEssentials.transitText = item.content;
              if (item.id === 'sensoji_desc') {
                const sensoji = updated.attractions.find((a) => a.id === 'sensoji');
                if (sensoji) sensoji.description = item.content;
              }
              if (item.id === 'shibuya_desc') {
                const shibuya = updated.attractions.find((a) => a.id === 'shibuya');
                if (shibuya) shibuya.description = item.content;
              }
              if (item.id === 'skytree_desc') {
                const skytree = updated.attractions.find((a) => a.id === 'skytree');
                if (skytree) skytree.description = item.content;
              }
              if (item.id === 'akihabara_desc') {
                const akiba = updated.attractions.find((a) => a.id === 'akihabara');
                if (akiba) akiba.description = item.content;
              }
              if (item.id === 'meiji_desc') {
                const meiji = updated.attractions.find((a) => a.id === 'meiji');
                if (meiji) meiji.description = item.content;
              }
              if (item.id === 'sushi_desc') {
                const sushi = updated.gastronomy.find((g) => g.id === 'sushi');
                if (sushi) sushi.description = item.content;
              }
              if (item.id === 'ramen_desc') {
                const ramen = updated.gastronomy.find((g) => g.id === 'ramen');
                if (ramen) ramen.description = item.content;
              }
              if (item.id === 'monja_desc') {
                const monja = updated.gastronomy.find((g) => g.id === 'monjayaki');
                if (monja) monja.description = item.content;
              }
              if (item.id === 'hanami_desc') {
                const hanami = updated.traditions.find((t) => t.id === 'hanami');
                if (hanami) hanami.description = item.content;
              }
              if (item.id === 'sumo_desc') {
                const sumo = updated.traditions.find((t) => t.id === 'sumo');
                if (sumo) sumo.description = item.content;
              }
              if (item.id === 'kanda_desc') {
                const kanda = updated.traditions.find((t) => t.id === 'kanda');
                if (kanda) kanda.description = item.content;
              }
              if (item.id === 'kamakura_desc') {
                updated.dayTrip.description = item.content;
              }
            });

            return updated;
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

  const updateContentKey = async (id: string, text: string, title?: string): Promise<boolean> => {
    try {
      // 1. Optimistic local state update
      setContent((prev) => {
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

      // 2. Persist to Supabase
      const { error } = await supabase.from('site_content').upsert(
        {
          id,
          section: id.split('_')[0] || 'general',
          key_name: id,
          title: title || null,
          content: text,
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

  return (
    <ContentContext.Provider
      value={{
        content,
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
