import { kv } from "@vercel/kv";

const KEY = "prospects";

export async function getAllProspects() {
  try {
    const data = await kv.get(KEY);
    return data || {};
  } catch {
    return {};
  }
}

export async function getProspect(slug) {
  try {
    const all = await getAllProspects();
    return all[slug] || null;
  } catch {
    return null;
  }
}

export async function saveProspect(slug, data) {
  const all = await getAllProspects();
  all[slug] = { ...data, slug, updatedAt: new Date().toISOString() };
  await kv.set(KEY, all);
  return all[slug];
}

export async function deleteProspect(slug) {
  const all = await getAllProspects();
  delete all[slug];
  await kv.set(KEY, all);
}
