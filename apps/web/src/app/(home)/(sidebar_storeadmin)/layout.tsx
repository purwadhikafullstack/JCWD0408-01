import SidebarStoreAdmin from "@/components/sidebar/sidebarStoreAdmin";



export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SidebarStoreAdmin />
            {children}
        </div>
    );
}