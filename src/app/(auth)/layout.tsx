export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-start py-12 bg-gray-100 min-h-screen">
      {children}
    </div>
  );
}
