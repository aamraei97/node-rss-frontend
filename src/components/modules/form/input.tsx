import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";
type InputProps<T extends FieldValues> = React.ComponentProps<"input"> & {
  label: string;
  control: Control<T>;
  name: Path<T>;
};
export function FormInput<T extends FieldValues>({
  className,
  label,
  control,
  name,
  ...props
}: InputProps<T>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <div className="flex flex-col gap-2 relative pb-4">
      <label htmlFor={props.id} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            {...props}
            className={cn(
              fieldState.error && "border-red-500 focus-visible:border-red-500"
            )}
          />
        )}
      />
      {fieldState.error && (
        <p className="text-red-500 text-[13px] absolute -bottom-1.5 right-0">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
