import { z } from "zod";
import { servicePincodes } from "@/lib/mock-data";

export const addressLabels = ["Home", "Work", "Other"] as const;

export const addressSchema = z.object({
  label: z.enum(addressLabels),
  name: z.string().trim().min(2, "Enter the name of the person receiving the order."),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number starting with 6, 7, 8 or 9."),
  line1: z.string().trim().min(3, "Enter your flat, house or building."),
  area: z.string().trim().min(3, "Enter your street or area."),
  landmark: z.string().trim().max(80, "Keep the landmark under 80 characters."),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a 6-digit pincode.")
    .refine((v) => servicePincodes.includes(v), "We don't deliver to this pincode yet."),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type Address = AddressInput & { id: string };

export type AddressErrors = Partial<Record<keyof AddressInput, string>>;

export function validateAddress(
  input: AddressInput,
): { ok: true; data: AddressInput } | { ok: false; errors: AddressErrors } {
  const result = addressSchema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };
  const errors: AddressErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof AddressInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

export function formatAddress(a: Address): string {
  return [a.line1, a.area, a.landmark && `Near ${a.landmark}`, a.pincode].filter(Boolean).join(", ");
}
