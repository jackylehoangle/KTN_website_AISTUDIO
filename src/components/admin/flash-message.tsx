export function FlashMessage({
  saved,
  deleted,
  updated,
  error,
}: {
  saved?: string;
  deleted?: string;
  updated?: string;
  error?: string;
}) {
  if (error) return <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>;
  if (saved || deleted || updated) {
    const message = saved ? "Đã lưu nội dung." : deleted ? "Đã xóa nội dung." : "Đã cập nhật trạng thái.";
    return <p role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{message}</p>;
  }
  return null;
}
