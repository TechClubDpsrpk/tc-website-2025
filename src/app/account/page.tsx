"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Mail,
  Shield,
  LogOut,
  Trash2,
  Sun,
  Moon,
  Laptop,
  CheckCircle,
  AlertTriangle,
  Camera,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
  lastLoginAt?: string;
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({ name: "" });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/check", { credentials: "include" });
        if (!response.ok) return router.push("/login");
        const data = await response.json();
        if (!data?.isAuthenticated || !data?.user) return router.push("/login");
        setUser(data.user);
        setFormData({ name: data.user.name });
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showMsg("error", "Name cannot be empty");
      return;
    }
    
    setSaving(true);
    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name }),
        credentials: "include",
      });

      if (response.ok) {
        setUser(prev => prev ? { ...prev, name: formData.name } : null);
        showMsg("success", "Profile updated successfully");
      } else {
        showMsg("error", "Failed to update profile");
      }
    } catch (error) {
      showMsg("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new.length < 8) {
      showMsg("error", "New password must be at least 8 characters");
      return;
    }
    
    if (passwordData.new !== passwordData.confirm) {
      showMsg("error", "Passwords do not match");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.current,
          newPassword: passwordData.new,
        }),
        credentials: "include",
      });

      const data = await response.json();
      
      if (response.ok) {
        setPasswordData({ current: "", new: "", confirm: "" });
        showMsg("success", "Password updated successfully");
      } else {
        showMsg("error", data.error || "Failed to update password");
      }
    } catch (error) {
      showMsg("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
    } catch (error) {
      showMsg("error", "Failed to logout");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    
    setSaving(true);
    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/");
      } else {
        showMsg("error", "Failed to delete account");
      }
    } catch (error) {
      showMsg("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      showMsg("error", "Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMsg("error", "Image must be less than 5MB");
      return;
    }

    setUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/auth/upload-avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(prev => prev ? { ...prev, avatarUrl: data.avatarUrl } : null);
        showMsg("success", "Profile picture updated");
      } else {
        showMsg("error", "Failed to upload image");
      }
    } catch (error) {
      showMsg("error", "An error occurred");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResendVerification = async () => {
    setResendingEmail(true);
    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        showMsg("success", "Verification email sent. Check your inbox!");
      } else {
        showMsg("error", "Failed to send verification email");
      }
    } catch (error) {
      showMsg("error", "An error occurred");
    } finally {
      setResendingEmail(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showMsg("success", "Copied to clipboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black pt-24 px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Toast Message */}
        {message && (
          <div className={`fixed top-8 right-4 px-6 py-3 rounded-lg backdrop-blur-xl border ${
            message.type === "success"
              ? "bg-green-500/20 border-green-500/50 text-green-200"
              : "bg-red-500/20 border-red-500/50 text-red-200"
          } z-50 animate-in fade-in slide-in-from-top`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT: Profile Card */}
          <section className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#C9A227] to-gray-700 overflow-hidden flex items-center justify-center shadow-lg">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="text-gray-900 w-12 h-12" />
                    )}
                  </div>
                  <label className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-[#C9A227] border border-gray-600 flex items-center justify-center hover:scale-110 transition shadow-lg cursor-pointer">
                    <Camera size={16} className="text-black" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <p className="text-white text-xl font-bold">{user.name}</p>
                <p className="text-gray-400 text-sm mt-1 break-all">{user.email}</p>

                <div className="mt-6 w-full space-y-3 pt-6 border-t border-gray-700/50">
                  <BadgeRow
                    icon={user.emailVerified ? CheckCircle : AlertTriangle}
                    label={user.emailVerified ? "Email verified" : "Email not verified"}
                    tone={user.emailVerified ? "success" : "warn"}
                  />
                  {!user.emailVerified && (
                    <button
                      onClick={handleResendVerification}
                      disabled={resendingEmail}
                      className="w-full px-3 py-2 text-xs bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition disabled:opacity-50"
                    >
                      {resendingEmail ? "Sending..." : "Resend verification email"}
                    </button>
                  )}
                  <InfoRow label="User ID" value={user.id} mono />
                  {user.createdAt && <InfoRow label="Member since" value={new Date(user.createdAt).toLocaleDateString()} />}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: Settings */}
          <section className="lg:col-span-3 space-y-6">
            {/* Profile */}
            <Card title="Profile Settings" icon={UserIcon}>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                  />
                  <Input label="Email" value={user.email} disabled />
                </div>
                <div className="flex gap-3 pt-2">
                  <PrimaryBtn disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </PrimaryBtn>
                </div>
              </form>
            </Card>

            {/* Security */}
            <Card title="Security" icon={Shield}>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <PasswordInput
                    label="Current Password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    show={showPasswords.current}
                    onToggle={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  />
                  <PasswordInput
                    label="New Password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    show={showPasswords.new}
                    onToggle={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  />
                  <PasswordInput
                    label="Confirm Password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    show={showPasswords.confirm}
                    onToggle={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  />
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <PrimaryBtn disabled={saving}>
                    {saving ? "Updating..." : "Update Password"}
                  </PrimaryBtn>
                </div>
              </form>
            </Card>

            {/* Sessions */}
            <Card title="Sessions & Devices" icon={Laptop}>
              <ul className="space-y-3">
                <SessionRow name="Current Session" current />
              </ul>
            </Card>

            {/* Danger Zone */}
            <Card title="Danger Zone" icon={AlertTriangle} danger>
              <div className="flex flex-wrap gap-3">
                <DangerBtn onClick={handleDeleteAccount} disabled={saving}>
                  <Trash2 size={16} />
                  Delete Account
                </DangerBtn>
                <GhostBtn onClick={handleLogout}>
                  <LogOut size={16} />
                  Sign Out
                </GhostBtn>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}

// ---- UI Components ----
function Card({ title, icon: Icon, children, danger = false }: any) {
  return (
    <div className={`bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border rounded-2xl p-6 shadow-xl ${danger ? "border-red-500/30" : "border-gray-700/50"}`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={20} className={danger ? "text-red-400" : "text-[#C9A227]"} />
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <label className="block">
      <span className="text-gray-400 text-sm font-medium mb-2 block">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl bg-gray-900/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-transparent transition"
      />
    </label>
  );
}

function PasswordInput({ label, show, onToggle, ...props }: any) {
  return (
    <label className="block">
      <span className="text-gray-400 text-sm font-medium mb-2 block">{label}</span>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full rounded-xl bg-gray-900/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-transparent transition pr-12"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}

function PrimaryBtn({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="px-6 py-3 rounded-xl bg-[#C9A227] text-black font-semibold hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#C9A227]/20"
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, ...props }: any) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="px-6 py-3 rounded-xl border border-gray-700 text-gray-200 hover:bg-gray-800 transition flex items-center gap-2 font-medium"
    >
      {children}
    </button>
  );
}

function DangerBtn({ children, onClick, disabled }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 rounded-xl bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 transition flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function InfoRow({ label, value, mono = false }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={`${mono ? "font-mono text-xs" : ""} text-gray-200 truncate`}>{value}</span>
    </div>
  );
}

function BadgeRow({ icon: Icon, label, tone }: any) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm w-full justify-center ${tone === "success" ? "bg-green-500/15 text-green-300 border border-green-500/30" : "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30"}`}>
      <Icon size={16} />
      {label}
    </div>
  );
}

function SessionRow({ name, current = false }: any) {
  return (
    <li className="flex items-center justify-between border border-gray-700/50 rounded-xl px-4 py-3 bg-gray-900/30 hover:bg-gray-900/50 transition">
      <div className="text-gray-200 font-medium">
        {name} {current && <span className="text-xs text-green-400 ml-2 bg-green-500/20 px-2 py-1 rounded-full">(current)</span>}
      </div>
    </li>
  );
}