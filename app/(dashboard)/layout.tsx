import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <div className="h-[80px] fixed w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex pt-[80px] h-full w-60 flex-col fixed z-50">
        <Sidebar />
      </div>
      <main className="md:pl-60  pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;