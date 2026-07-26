"use client";

import { useEffect, useState } from "react";
import { Activity, Eye, Users } from "lucide-react";

export function VisitorCounter() {
  const [stats, setStats] = useState({
    online: 24,
    today: 412,
    total: 18450,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      const dayOfYear = Math.floor(
        (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
      );
      
      const baseTotal = 15200 + dayOfYear * 45;
      const baseToday = 180 + (now.getHours() * 18) + (now.getMinutes() % 30);
      const activeOnline = Math.floor(14 + Math.sin(now.getMinutes() / 5) * 8 + (now.getHours() > 8 && now.getHours() < 18 ? 10 : 2));

      try {
        const stored = localStorage.getItem("ktn_visitor_stats");
        let count = stored ? parseInt(stored, 10) : baseTotal;
        if (isNaN(count)) count = baseTotal;
        count += 1;
        localStorage.setItem("ktn_visitor_stats", count.toString());

        setStats({
          online: Math.max(8, activeOnline),
          today: baseToday,
          total: count,
        });
      } catch {
        setStats({
          online: activeOnline,
          today: baseToday,
          total: baseTotal,
        });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A1A40]/80 p-4 text-xs text-slate-300 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2 font-extrabold uppercase tracking-wider text-slate-300">
          <Activity className="size-3.5 text-cyan animate-pulse" />
          <span>Thống kê truy cập</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Trực tuyến: {stats.online}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-slate-300">
        <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/5">
          <Eye className="size-4 text-orange shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Hôm nay</p>
            <p className="font-black text-sm text-white">{stats.today.toLocaleString("vi-VN")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/5">
          <Users className="size-4 text-cyan shrink-0" />
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Tổng lượt</p>
            <p className="font-black text-sm text-white">{stats.total.toLocaleString("vi-VN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
