import Sidebar from "@/components/sidebar/sidebar";


export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    );
}