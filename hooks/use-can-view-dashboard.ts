"use client";

import { useEffect, useState } from "react";

/** Optional session check for demo CTAs; fails closed if Supabase is unavailable. */
export function useCanViewDashboard() {
  const [canView, setCanView] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const supabaseClientModule = await import("@/lib/supabase/client");
        const { data } = await supabaseClientModule.supabase.auth.getSession();
        setCanView(Boolean(data.session?.user));
      } catch {
        setCanView(false);
      }
    };
    void check();
  }, []);

  return canView;
}
