export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen gap-12">
      <div className="" />
      <div className="px-12 grid max-w-[1400px] w-full mx-auto pb-12">
        {children}
      </div>
    </div>
  );
}
