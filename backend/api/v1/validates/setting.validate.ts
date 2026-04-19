import { Request } from "express";

type ValidationError = {
  code: number;
  message: string;
};

export const validateSettingUpsert = (
  req: Request,
): { data?: { key: string; value: string }; error?: ValidationError } => {
  const { key, value } = req.body as {
    key?: unknown;
    value?: unknown;
  };

  if (typeof key !== "string" || !key.trim()) {
    return {
      error: {
        code: 400,
        message: "Vui lòng gửi key hợp lệ",
      },
    };
  }

  const trimmedKey = key.trim();
  const val = typeof value === "string" ? value : "";

  return {
    data: {
      key: trimmedKey,
      value: val,
    },
  };
};
