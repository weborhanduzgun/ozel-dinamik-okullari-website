import "../admin.css";
import { logoutAction } from "@/lib/actions/auth";
import { AdminNav } from "../AdminNav";

export const metadata = { title: "Dinamik Yönetim Paneli" };

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Dinamik Yönetim</div>
        <AdminNav />
        <form className="admin-logout-form" action={logoutAction}>
          <button type="submit">Çıkış yap</button>
        </form>
      </aside>
      <main className="admin-content">{children}</main>
    </div>
  );
}
