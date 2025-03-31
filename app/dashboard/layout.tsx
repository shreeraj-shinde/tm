import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-2 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
