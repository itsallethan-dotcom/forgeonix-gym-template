"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Avatar } from "@/components/avatar";
import { useAppData } from "@/hooks/use-app-data";

export default function ProfilePage() {
  const {
    loading,
    profile,
    profileDisplayName,
    stats,
    saveProfile,
    uploadAvatar,
    message,
    error,
    user,
  } = useAppData();

  if (loading) return <main className="min-h-screen bg-gray-950" />;

  return (
    <AppShell
      title="Profile"
      user={user}
      profileDisplayName={profileDisplayName}
      avatarUrl={profile?.avatar_url ?? null}
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Total Volume</p>
          <p className="mt-2 text-2xl font-bold">{stats.totalVolume.toLocaleString()}</p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Best Lift</p>
          <p className="mt-2 text-2xl font-bold">{stats.bestLift.toLocaleString()}</p>
        </article>
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Entries</p>
          <p className="mt-2 text-2xl font-bold">{stats.totalEntries}</p>
        </article>
      </section>

      <ProfileEditor
        key={profile?.id ?? "profile-editor"}
        profile={profile}
        profileDisplayName={profileDisplayName}
        saveProfile={saveProfile}
        uploadAvatar={uploadAvatar}
        error={error}
        message={message}
      />
    </AppShell>
  );
}

function ProfileEditor({
  profile,
  profileDisplayName,
  saveProfile,
  uploadAvatar,
  error,
  message,
}: {
  profile: { id: string; display_name: string | null; username: string | null; avatar_url: string | null } | null;
  profileDisplayName: string;
  saveProfile: (payload: { display_name: string; username: string; avatar_url: string | null }) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  error: string | null;
  message: string | null;
}) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? "");
  const [username, setUsername] = useState(profile?.username ?? "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile?.avatar_url ?? null);

  return (
    <>
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <div className="flex items-center gap-3">
          <Avatar name={profileDisplayName} avatarUrl={previewUrl ?? profile?.avatar_url ?? null} size="lg" />
          <div>
            <p className="font-semibold">{profileDisplayName}</p>
            <p className="text-sm text-slate-300">@{profile?.username ?? "username"}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <form
          className="mt-3 grid gap-3"
          onSubmit={async (event) => {
            event.preventDefault();
            await saveProfile({
              display_name: displayName.trim() || username.trim().toLowerCase(),
              username: username.trim().toLowerCase(),
              avatar_url: avatarUrl.trim() || null,
            });
          }}
        >
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Display name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
          <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2" placeholder="Avatar URL (optional)" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} />
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setSelectedFile(file);
              if (file) {
                setPreviewUrl(URL.createObjectURL(file));
              } else {
                setPreviewUrl(profile?.avatar_url ?? null);
              }
            }}
          />
          <button
            type="button"
            className="w-fit rounded-lg border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300"
            disabled={!selectedFile}
            onClick={async () => {
              if (!selectedFile) return;
              await uploadAvatar(selectedFile);
              setSelectedFile(null);
            }}
          >
            Upload Profile Photo
          </button>
          <button className="w-fit rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">Save Profile</button>
        </form>
        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
        {message ? <p className="mt-2 text-sm text-emerald-400">{message}</p> : null}
      </section>
    </>
  );
}
