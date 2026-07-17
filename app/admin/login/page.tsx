import "../admin.css";
import { loginAction } from "@/lib/actions/auth";

export const metadata = { title: "Giriş — Dinamik Yönetim Paneli" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <h1>Dinamik Yönetim Paneli</h1>
        <p>Devam etmek için giriş yapın.</p>
        {error ? <div className="admin-error">Kullanıcı adı veya şifre hatalı.</div> : null}
        <form action={loginAction}>
          <label>
            Kullanıcı adı
            <input type="text" name="username" autoComplete="username" required autoFocus />
          </label>
          <label>
            Şifre
            <input type="password" name="password" autoComplete="current-password" required />
          </label>
          <button type="submit">Giriş yap</button>
        </form>
      </div>
    </div>
  );
}
