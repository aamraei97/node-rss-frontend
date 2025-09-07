export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100 gap-12">
      <div className="" />
      <div className="px-12 grid max-w-[1400px] w-full mx-auto">{children}</div>
    </div>
  );
}
