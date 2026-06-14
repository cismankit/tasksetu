import { getSupabase, isSupabaseConfigured } from './supabase';

const BUCKET = 'documents';

export async function uploadDocument(
  userId: string,
  documentId: string,
  fileUri: string,
  mimeType: string,
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabase();
  if (!supabase) return null;

  const path = `${userId}/${documentId}/${Date.now()}`;
  const response = await fetch(fileUri);
  const blob = await response.blob();

  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: mimeType,
    upsert: false,
  });

  if (error) {
    console.warn('[TaskSetu] Document upload failed:', error.message);
    return null;
  }

  return path;
}

export async function getDocumentSignedUrl(storagePath: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(storagePath, 3600);

  if (error) return null;
  return data.signedUrl;
}
