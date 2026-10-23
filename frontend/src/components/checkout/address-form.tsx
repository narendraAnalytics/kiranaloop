"use client";

import { useId, useState } from "react";
import {
  addressLabels,
  validateAddress,
  type AddressErrors,
  type AddressInput,
} from "@/lib/address";
import { servicePincodes } from "@/lib/mock-data";

const empty: AddressInput = {
  label: "Home",
  name: "",
  phone: "",
  line1: "",
  area: "",
  landmark: "",
  pincode: "",
};

type FieldProps = {
  name: keyof AddressInput;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  optional?: boolean;
  inputMode?: "numeric" | "tel" | "text";
  maxLength?: number;
  autoComplete?: string;
  className?: string;
};

function Field({
  name,
  label,
  value,
  error,
  onChange,
  optional,
  inputMode,
  maxLength,
  autoComplete,
  className = "",
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-12 w-full rounded-xl border bg-white px-4 text-base outline-none placeholder:text-muted-foreground focus:border-ink focus:ring-3 focus:ring-ink/15 aria-invalid:border-rani aria-invalid:ring-3 aria-invalid:ring-rani/15"
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-rani">
          {error}
        </p>
      )}
    </div>
  );
}

export function AddressForm({
  onSave,
  onCancel,
  submitLabel = "Save address",
}: {
  onSave: (input: AddressInput) => void;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<AddressInput>(empty);
  const [errors, setErrors] = useState<AddressErrors>({});

  function set<K extends keyof AddressInput>(key: K) {
    return (value: AddressInput[K]) => {
      setValues((v) => ({ ...v, [key]: value }));
      if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    };
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = validateAddress(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      (e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    onSave(result.data);
    setValues(empty);
    setErrors({});
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">Save as</legend>
        <div className="flex gap-2">
          {addressLabels.map((l) => (
            <label key={l} className="cursor-pointer">
              <input
                type="radio"
                name="label"
                value={l}
                checked={values.label === l}
                onChange={() => set("label")(l)}
                className="peer sr-only"
              />
              <span className="inline-flex h-10 items-center rounded-full border px-5 text-sm font-semibold peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-ink/30">
                {l}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Receiver's name" value={values.name} error={errors.name} onChange={set("name")} autoComplete="name" />
        <Field name="phone" label="Mobile number" value={values.phone} error={errors.phone} onChange={set("phone")} inputMode="tel" maxLength={10} autoComplete="tel-national" />
      </div>
      <Field name="line1" label="Flat, house or building" value={values.line1} error={errors.line1} onChange={set("line1")} autoComplete="address-line1" />
      <Field name="area" label="Street or area" value={values.area} error={errors.area} onChange={set("area")} autoComplete="address-line2" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="pincode" label="Pincode" value={values.pincode} error={errors.pincode} onChange={set("pincode")} inputMode="numeric" maxLength={6} autoComplete="postal-code" />
        <Field name="landmark" label="Landmark" optional value={values.landmark} error={errors.landmark} onChange={set("landmark")} />
      </div>
      <p className="text-sm text-muted-foreground">
        Demo pincodes we deliver to: {servicePincodes.join(", ")}.
      </p>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-12 rounded-full border-2 px-6 font-bold outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ink/30"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="h-12 rounded-full bg-ink px-8 font-bold text-white outline-none hover:bg-ink/90 focus-visible:ring-4 focus-visible:ring-ink/30"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
