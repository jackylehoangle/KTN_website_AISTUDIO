"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmSubmitButton({ message = "Anh/chị chắc chắn muốn xóa nội dung này?" }: { message?: string }) {
  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      <Trash2 /> Xóa
    </Button>
  );
}
