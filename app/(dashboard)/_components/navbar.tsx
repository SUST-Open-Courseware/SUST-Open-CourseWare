import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"
import { Logo } from "./logo"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="hidden md:flex p-2 mr-auto">
        <Logo />
      </div>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}