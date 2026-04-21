import { getAllProspects, saveProspect, deleteProspect } from "../../lib/storage.js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AdminClient from "./AdminClient.js";

// Server action — save prospect
async function upsertProspect(formData) {
  "use server";
  const password = formData.get("password");
  if (password !== process.env.ADMIN_PASSWORD) throw new Error("Bad password");

  const name = formData.get("name")?.trim();
  const company = formData.get("company")?.trim();
  const role = formData.get("role")?.trim();
  const industry = formData.get("industry");
  const priorities = formData.getAll("priorities");
  const contentFlags = formData.getAll("contentFlags");
  const callNotes = formData.get("callNotes")?.trim();
  const heroCustom = formData.get("heroCustom")?.trim();
  const slugInput = formData.get("slug")?.trim();

  const slug = slugInput ||
    company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  await saveProspect(slug, { name, company, role, industry, priorities, contentFlags, callNotes, heroCustom });
  revalidatePath(`/${slug}`);
  redirect(`/${slug}`);
}

// Server action — delete prospect
async function removeProspect(formData) {
  "use server";
  const password = formData.get("password");
  if (password !== process.env.ADMIN_PASSWORD) throw new Error("Bad password");
  const slug = formData.get("slug");
  await deleteProspect(slug);
  redirect("/admin");
}

export default async function AdminPage({ searchParams }) {
  const prospects = await getAllProspects();
  const editSlug = searchParams?.edit || null;

  return (
    <AdminClient
      prospects={prospects}
      upsertProspect={upsertProspect}
      removeProspect={removeProspect}
      editSlug={editSlug}
    />
  );
}
