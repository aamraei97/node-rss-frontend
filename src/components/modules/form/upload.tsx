import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// import { isImage } from "@/utils/functions";
import { UploadIcon } from "lucide-react";
import { useRef } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";
import { toast } from "sonner";
type UploadProps<T extends FieldValues> = React.ComponentProps<"input"> & {
  label: string;
  control: Control<T>;
  name: Path<T>;
  accept?: string;
};
export function FormUpload<T extends FieldValues>({
  className,
  label,
  control,
  name,
  accept,
  ...props
}: UploadProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { field, fieldState } = useController({ control, name });
  let isImageBasedOnExtension = false;
  if (field.value) {
    if (field.value?.type) {
      // isImageBasedOnExtension = isImage(field.value.name);
    } else {
      // isImageBasedOnExtension = isImage(field.value);
    }
  }
  let selectedFileName = null;
  if (field.value) {
    if (field.value?.type) {
      selectedFileName = field.value.name;
    } else {
      selectedFileName = field.value.split("/").pop();
    }
  }

  return (
    <div className="flex flex-col gap-2 relative pb-4">
      <label htmlFor={props.id} className="text-sm font-medium">
        {label}
      </label>
      <div
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-11 w-full min-w-0 rounded-md border bg-transparent px-1 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "flex items-center gap-2 justify-between",
          className
        )}
      >
        <div className="pr-2 text-black/40 flex items-center gap-2 line-clamp-1">
          {field.value && isImageBasedOnExtension && (
            <img
              src={
                field.value?.type
                  ? URL.createObjectURL(field.value)
                  : field.value
              }
              alt="upload"
              className="w-8 h-8 object-cover rounded-sm border border-gray-200"
            />
          )}
          <span className="line-clamp-1 ltr">
            {selectedFileName ? selectedFileName : "فایلی انتخاب نشده است"}
          </span>
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            console.log({ file });

            // if selected file is not of type accept, show error
            if (file && accept && !accept.startsWith(file.type.split("/")[0])) {
              toast.error("فایل انتخابی معتبر نیست");
              field.onChange(undefined);
              e.preventDefault();
              return;
            }

            if (file) {
              field.onChange(file);
            }
          }}
          accept={accept}
        />
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          <UploadIcon />
          انتخاب فایل
        </Button>
      </div>
      {fieldState.error && (
        <p className="text-red-500 text-sm absolute -bottom-2.5 right-0">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
