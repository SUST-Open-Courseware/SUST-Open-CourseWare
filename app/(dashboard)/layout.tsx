import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <main className="md:p-[140px] pt-[100px] h-full">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;