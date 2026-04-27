import { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  Boxes,
  ClipboardList,
  KeyRound,
  LogOut,
  PackageCheck,
  RefreshCw,
  Save,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";
const AUTH_TOKEN_KEY = "hydrashield-admin-auth-token";

type AdminSettings = {
  cjProductName: string;
  cjProductId: string;
  cjVariantId: string;
  supplierName: string;
  warehouse: string;
  sellingPrice: number;
  productCost: number;
  shippingCost: number;
  adCostPerOrder: number;
  packagingCost: number;
  processingDays: number;
  autoImportTracking: boolean;
  autoSyncInventory: boolean;
  lowStockAlerts: boolean;
  orderAutoConfirm: boolean;
  notes: string;
};

type AdminProfile = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  lastLoginAt: string | null;
};

type AuthMode = "login" | "register";

type AuthFormState = {
  fullName: string;
  email: string;
  password: string;
};

type CredentialFieldKey = "apiKey" | "platformToken" | "accessToken" | "refreshToken";

type CredentialFieldState = {
  key: CredentialFieldKey;
  label: string;
  configured: boolean;
  maskedValue: string;
};

type CjCredentialsState = {
  provider: string;
  apiBaseUrl: string;
  updatedAt: string | null;
  lastSyncAt: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;
  credentials: Record<CredentialFieldKey, CredentialFieldState>;
};

type CredentialFormState = Record<CredentialFieldKey, string>;

const defaultSettings: AdminSettings = {
  cjProductName: "HydraShield Daily Barrier Repair Moisturizer",
  cjProductId: "CJ-HYDRA-001",
  cjVariantId: "CJ-HYDRA-001-50ML",
  supplierName: "CJ Dropshipping Supplier",
  warehouse: "US Warehouse",
  sellingPrice: 28,
  productCost: 8.5,
  shippingCost: 4.75,
  adCostPerOrder: 6.5,
  packagingCost: 1.25,
  processingDays: 3,
  autoImportTracking: true,
  autoSyncInventory: true,
  lowStockAlerts: true,
  orderAutoConfirm: false,
  notes:
    "Use CJ US stock first for faster delivery. Keep bundle packaging instructions ready before launch and verify branded insert requirements.",
};

const emptyAuthForm: AuthFormState = {
  fullName: "",
  email: "",
  password: "",
};

const emptyCredentialForm: CredentialFormState = {
  apiKey: "",
  platformToken: "",
  accessToken: "",
  refreshToken: "",
};

const sourcingChecklist = [
  "Confirm final CJ product page and saved product ID",
  "Validate US warehouse stock and backup warehouse option",
  "Approve branded packaging or insert strategy",
  "Lock landed cost before paid traffic goes live",
  "Test one real order before launch day",
];

const sampleOrders = [
  {
    id: "#HS-1024",
    customer: "Ava Johnson",
    product: "Single Jar",
    status: "Ready to Source",
    total: "$28.00",
    tracking: "Pending",
  },
  {
    id: "#HS-1023",
    customer: "Noah Smith",
    product: "2 Jar Bundle",
    status: "Submitted to CJ",
    total: "$52.00",
    tracking: "Awaiting sync",
  },
  {
    id: "#HS-1022",
    customer: "Emma Brown",
    product: "Single Jar",
    status: "In Fulfillment",
    total: "$28.00",
    tracking: "CJUS984221",
  },
  {
    id: "#HS-1021",
    customer: "Liam Davis",
    product: "2 Jar Bundle",
    status: "Delivered",
    total: "$52.00",
    tracking: "CJUS983915",
  },
];

const statusStyles: Record<string, string> = {
  "Ready to Source": "border-primary/30 bg-primary/10 text-primary",
  "Submitted to CJ": "border-amber-300 bg-amber-100 text-amber-800",
  "In Fulfillment": "border-sky-300 bg-sky-100 text-sky-800",
  Delivered: "border-emerald-300 bg-emerald-100 text-emerald-800",
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleString() : "Not yet";

const AdminPage = () => {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [token, setToken] = useState<string>(() => localStorage.getItem(AUTH_TOKEN_KEY) ?? "");
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authForm, setAuthForm] = useState<AuthFormState>(emptyAuthForm);
  const [cjCredentials, setCjCredentials] = useState<CjCredentialsState | null>(null);
  const [credentialForm, setCredentialForm] = useState<CredentialFormState>(emptyCredentialForm);
  const [authLoading, setAuthLoading] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [credentialsSaving, setCredentialsSaving] = useState(false);
  const [connectionLoading, setConnectionLoading] = useState(false);

  const apiRequest = async (
    path: string,
    options: RequestInit = {},
    requireAuth = true,
    authTokenOverride?: string,
  ) => {
    const headers = new Headers(options.headers ?? {});

    if (options.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const activeToken = authTokenOverride ?? token;
    if (requireAuth && activeToken) {
      headers.set("Authorization", `Bearer ${activeToken}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload?.message ?? "Request failed.");
    }

    return payload;
  };

  const loadProtectedData = async (authTokenOverride?: string) => {
    const [settingsPayload, credentialsPayload] = await Promise.all([
      apiRequest("/admin/settings", {}, true, authTokenOverride),
      apiRequest("/cj/credentials", {}, true, authTokenOverride),
    ]);

    setSettings({ ...defaultSettings, ...settingsPayload.data });
    setCjCredentials(credentialsPayload.data);
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const payload = await apiRequest("/auth/bootstrap", {}, false);
        const adminExists = Boolean(payload?.data?.hasAdmin);
        setHasAdmin(adminExists);
        setAuthMode(adminExists ? "login" : "register");
      } catch {
        toast({
          title: "Backend unavailable",
          description: "Start the backend server so the admin system can load.",
        });
      } finally {
        setAuthLoading(false);
      }
    };

    void bootstrap();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      return;
    }

    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (!token) {
      setAdmin(null);
      return;
    }

    const restoreSession = async () => {
      try {
        const mePayload = await apiRequest("/auth/me");
        setAdmin(mePayload.data.admin);
        await loadProtectedData(token);
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setToken("");
        setAdmin(null);
      }
    };

    void restoreSession();
  }, [token]);

  const totalLandedCost =
    settings.productCost + settings.shippingCost + settings.adCostPerOrder + settings.packagingCost;
  const grossProfit = settings.sellingPrice - totalLandedCost;
  const marginPercent = settings.sellingPrice > 0 ? (grossProfit / settings.sellingPrice) * 100 : 0;
  const readinessChecks = [
    Boolean(settings.cjProductId),
    Boolean(settings.cjVariantId),
    settings.productCost > 0,
    settings.shippingCost > 0,
    settings.processingDays > 0,
    Boolean(settings.supplierName),
  ];
  const readinessPercent = Math.round(
    (readinessChecks.filter(Boolean).length / readinessChecks.length) * 100,
  );

  const updateNumber = (field: keyof AdminSettings, value: string) => {
    const parsed = Number(value);
    setSettings((current) => ({ ...current, [field]: Number.isFinite(parsed) ? parsed : 0 }));
  };

  const updateText = (field: keyof AdminSettings, value: string) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const updateToggle = (field: keyof AdminSettings, value: boolean) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const handleAuthSubmit = async () => {
    setAuthSubmitting(true);

    try {
      const endpoint = authMode === "register" ? "/auth/register" : "/auth/login";
      const payload = await apiRequest(
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(authForm),
        },
        false,
      );

      setToken(payload.data.token);
      setAdmin(payload.data.admin);
      setHasAdmin(true);
      setAuthForm(emptyAuthForm);
      await loadProtectedData(payload.data.token);

      toast({
        title: authMode === "register" ? "Admin account created" : "Welcome back",
        description:
          authMode === "register"
            ? "Your admin account is ready and further registration is now locked."
            : "You are logged in to HydraShield admin.",
      });
    } catch (error) {
      toast({
        title: authMode === "register" ? "Registration failed" : "Login failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } catch {
      // Session cleanup still happens locally.
    }

    localStorage.removeItem(AUTH_TOKEN_KEY);
    setToken("");
    setAdmin(null);
    setCjCredentials(null);
    setSettings(defaultSettings);
  };

  const handleSaveSettings = async () => {
    setSettingsSaving(true);

    try {
      await apiRequest("/admin/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });

      toast({
        title: "Admin settings saved",
        description: "Your CJ sourcing and operations settings were saved to MongoDB.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleSaveCredentials = async () => {
    const payload = Object.fromEntries(
      Object.entries(credentialForm).filter(([, value]) => value.trim()),
    );

    if (Object.keys(payload).length === 0) {
      toast({
        title: "No new credentials entered",
        description: "Enter a value in at least one CJ credential field before saving.",
      });
      return;
    }

    setCredentialsSaving(true);

    try {
      const response = await apiRequest("/cj/credentials", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setCjCredentials(response.data);
      setCredentialForm(emptyCredentialForm);
      toast({
        title: "CJ credentials saved",
        description: "Your CJ credentials were encrypted and stored securely.",
      });
    } catch (error) {
      toast({
        title: "Credential save failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setCredentialsSaving(false);
    }
  };

  const handleDeleteCredential = async (field: CredentialFieldKey) => {
    try {
      const response = await apiRequest(`/cj/credentials/${field}`, {
        method: "DELETE",
      });

      setCjCredentials(response.data);
      setCredentialForm((current) => ({ ...current, [field]: "" }));
      toast({
        title: "Credential removed",
        description: `${response.data.credentials[field].label} was cleared from secure storage.`,
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleExchangeToken = async () => {
    setConnectionLoading(true);

    try {
      await apiRequest("/cj/auth/token", { method: "POST" });
      const credentialsPayload = await apiRequest("/cj/credentials");
      setCjCredentials(credentialsPayload.data);
      toast({
        title: "CJ token updated",
        description: "A fresh CJ access token was created from the saved API key.",
      });
    } catch (error) {
      toast({
        title: "Token exchange failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setConnectionLoading(false);
    }
  };

  const handleRefreshConnection = async () => {
    setConnectionLoading(true);

    try {
      const payload = await apiRequest("/cj/connection");
      toast({
        title: payload?.data?.configured ? "CJ connector detected" : "CJ connector not configured",
        description: payload?.data?.configured
          ? "The backend can read your saved CJ credentials."
          : "Save your CJ credentials in the admin dashboard to complete setup.",
      });
    } catch (error) {
      toast({
        title: "Connection check failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setConnectionLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="mx-auto max-w-2xl shadow-card">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Loading admin access</CardTitle>
              <CardDescription>Checking whether HydraShield admin is ready to log in.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    );
  }

  if (!admin) {
    return (
      <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <section className="rounded-[2rem] border border-border bg-card p-5 shadow-card sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary text-primary-foreground">Admin Access</Badge>
                <Badge variant="outline" className="border-emerald-300 bg-emerald-100 text-emerald-800">
                  One owner account
                </Badge>
              </div>
              <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
                {hasAdmin ? "Log in to your HydraShield admin" : "Create the first HydraShield admin"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {hasAdmin
                  ? "An admin account already exists. Registration is locked, so please log in with that account."
                  : "This is the only time the admin registration form will work. After you create the first admin account, future registration attempts will return: Admin already exists, please log in."}
              </p>
            </section>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  {authMode === "register" ? "Create admin account" : "Admin login"}
                </CardTitle>
                <CardDescription>
                  {authMode === "register"
                    ? "Create the single owner account for this store."
                    : "Use the existing admin email and password to continue."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Tabs
                  value={authMode}
                  onValueChange={(value) => setAuthMode(value as AuthMode)}
                  className="space-y-5"
                >
                  <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-card p-2">
                    <TabsTrigger value="login" className="text-xs sm:text-sm">
                      Log in
                    </TabsTrigger>
                    <TabsTrigger
                      value="register"
                      disabled={Boolean(hasAdmin)}
                      className="text-xs sm:text-sm"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={authMode} className="space-y-4">
                    {authMode === "register" && (
                      <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Full name
                        </label>
                        <Input
                          value={authForm.fullName}
                          onChange={(event) =>
                            setAuthForm((current) => ({ ...current, fullName: event.target.value }))
                          }
                          placeholder="HydraShield owner"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={authForm.email}
                        onChange={(event) =>
                          setAuthForm((current) => ({ ...current, email: event.target.value }))
                        }
                        placeholder="owner@hydrashield.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Password
                      </label>
                      <Input
                        type="password"
                        value={authForm.password}
                        onChange={(event) =>
                          setAuthForm((current) => ({ ...current, password: event.target.value }))
                        }
                        placeholder="At least 8 characters"
                      />
                    </div>
                    <Button
                      onClick={handleAuthSubmit}
                      disabled={authSubmitting}
                      className="gradient-rose w-full text-primary-foreground"
                    >
                      <KeyRound className="h-4 w-4" />
                      {authSubmitting
                        ? "Please wait"
                        : authMode === "register"
                          ? "Create admin account"
                          : "Log in"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-8">
          <section className="rounded-[2rem] border border-border bg-card p-5 shadow-card sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary text-primary-foreground">Admin Panel</Badge>
                  <Badge variant="outline" className="border-emerald-300 bg-emerald-100 text-emerald-800">
                    Protected owner account
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary sm:text-sm">
                    HydraShield Operations
                  </p>
                  <h1 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
                    Run sourcing, pricing, credentials, and fulfillment from one place
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Your admin account is now the gatekeeper for this dashboard. CJ secrets are stored securely in the database and only exposed here as masked values so you can replace or clear them without putting them back into env files.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{admin.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {admin.email} · Last login {formatDate(admin.lastLoginAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-[430px]:flex-row lg:flex-col">
                <Button
                  onClick={handleSaveSettings}
                  disabled={settingsSaving}
                  className="gradient-rose text-xs uppercase tracking-[0.14em] text-primary-foreground sm:text-sm sm:normal-case sm:tracking-normal"
                >
                  <Save className="h-4 w-4" />
                  {settingsSaving ? "Saving" : "Save settings"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-xs uppercase tracking-[0.14em] sm:text-sm sm:normal-case sm:tracking-normal"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: BadgeDollarSign,
                label: "Selling Price",
                value: formatMoney(settings.sellingPrice),
                note: "Current storefront price",
              },
              {
                icon: Truck,
                label: "Landed Cost",
                value: formatMoney(totalLandedCost),
                note: "Product, shipping, ads, packaging",
              },
              {
                icon: ShoppingBag,
                label: "Estimated Profit",
                value: formatMoney(grossProfit),
                note: `${marginPercent.toFixed(1)}% margin`,
              },
              {
                icon: ShieldCheck,
                label: "CJ Readiness",
                value: `${readinessPercent}%`,
                note: "Launch setup completion",
              },
            ].map((card) => (
              <Card key={card.label} className="border-border shadow-card">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs uppercase tracking-[0.16em] text-primary">
                      {card.label}
                    </CardDescription>
                    <card.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="font-heading text-2xl font-semibold text-foreground">{card.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{card.note}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <Tabs defaultValue="overview" className="space-y-5">
            <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-2xl bg-card p-2">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="sourcing" className="text-xs sm:text-sm">
                CJ Sourcing
              </TabsTrigger>
              <TabsTrigger value="orders" className="text-xs sm:text-sm">
                Orders
              </TabsTrigger>
              <TabsTrigger value="operations" className="text-xs sm:text-sm">
                Operations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Launch readiness</CardTitle>
                    <CardDescription>
                      Use this checklist before connecting your first real CJ product and sending traffic.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full gradient-rose transition-all"
                        style={{ width: `${readinessPercent}%` }}
                      />
                    </div>
                    <div className="grid gap-3">
                      {sourcingChecklist.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-3"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Profit snapshot</CardTitle>
                    <CardDescription>
                      Keep this healthy before scaling paid traffic or bundle offers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      ["Selling price", formatMoney(settings.sellingPrice)],
                      ["Product cost", formatMoney(settings.productCost)],
                      ["Shipping cost", formatMoney(settings.shippingCost)],
                      ["Ad cost/order", formatMoney(settings.adCostPerOrder)],
                      ["Packaging", formatMoney(settings.packagingCost)],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between border-b border-border pb-3 text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-primary">Net margin estimate</p>
                      <p className="mt-2 font-heading text-3xl font-semibold text-foreground">
                        {marginPercent.toFixed(1)}%
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Estimated profit per order: {formatMoney(grossProfit)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sourcing" className="space-y-5">
              <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">CJ product mapping</CardTitle>
                    <CardDescription>
                      Store the identifiers and cost assumptions you will use when you connect CJ for real.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Product name
                      </label>
                      <Input
                        value={settings.cjProductName}
                        onChange={(event) => updateText("cjProductName", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        CJ product ID
                      </label>
                      <Input
                        value={settings.cjProductId}
                        onChange={(event) => updateText("cjProductId", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Variant ID
                      </label>
                      <Input
                        value={settings.cjVariantId}
                        onChange={(event) => updateText("cjVariantId", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Supplier label
                      </label>
                      <Input
                        value={settings.supplierName}
                        onChange={(event) => updateText("supplierName", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Warehouse
                      </label>
                      <Input
                        value={settings.warehouse}
                        onChange={(event) => updateText("warehouse", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Selling price
                      </label>
                      <Input
                        type="number"
                        value={settings.sellingPrice}
                        onChange={(event) => updateNumber("sellingPrice", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Product cost
                      </label>
                      <Input
                        type="number"
                        value={settings.productCost}
                        onChange={(event) => updateNumber("productCost", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Shipping cost
                      </label>
                      <Input
                        type="number"
                        value={settings.shippingCost}
                        onChange={(event) => updateNumber("shippingCost", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Packaging cost
                      </label>
                      <Input
                        type="number"
                        value={settings.packagingCost}
                        onChange={(event) => updateNumber("packagingCost", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Ad cost per order
                      </label>
                      <Input
                        type="number"
                        value={settings.adCostPerOrder}
                        onChange={(event) => updateNumber("adCostPerOrder", event.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        Processing days
                      </label>
                      <Input
                        type="number"
                        value={settings.processingDays}
                        onChange={(event) => updateNumber("processingDays", event.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-5">
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Secure CJ credentials</CardTitle>
                      <CardDescription>
                        Save, replace, or clear CJ secrets here. They are encrypted at rest and only the base URL stays in env.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-xl border border-border bg-background p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-primary">CJ API base URL</p>
                        <p className="mt-2 break-all text-sm font-medium text-foreground">
                          {cjCredentials?.apiBaseUrl ?? "Loading..."}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          This value stays in the backend env file.
                        </p>
                      </div>

                      {(Object.entries(cjCredentials?.credentials ?? {}) as Array<
                        [CredentialFieldKey, CredentialFieldState]
                      >).map(([field, state]) => (
                        <div key={field} className="rounded-2xl border border-border bg-background p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">{state.label}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {state.configured
                                  ? `Saved securely as ${state.maskedValue}`
                                  : "Not saved yet"}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => void handleDeleteCredential(field)}
                              disabled={!state.configured}
                            >
                              <Trash2 className="h-4 w-4" />
                              Clear
                            </Button>
                          </div>
                          <div className="mt-3">
                            <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                              New value
                            </label>
                            <Input
                              type="password"
                              value={credentialForm[field]}
                              onChange={(event) =>
                                setCredentialForm((current) => ({
                                  ...current,
                                  [field]: event.target.value,
                                }))
                              }
                              placeholder="Leave blank to keep the current saved value"
                            />
                          </div>
                        </div>
                      ))}

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                          onClick={handleSaveCredentials}
                          disabled={credentialsSaving}
                          className="gradient-rose text-primary-foreground"
                        >
                          <Save className="h-4 w-4" />
                          {credentialsSaving ? "Saving" : "Save credentials"}
                        </Button>
                        <Button variant="outline" onClick={handleExchangeToken} disabled={connectionLoading}>
                          <KeyRound className="h-4 w-4" />
                          Generate tokens from API key
                        </Button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-primary">Access token expiry</p>
                          <p className="mt-2 text-sm font-medium text-foreground">
                            {formatDate(cjCredentials?.accessTokenExpiresAt ?? null)}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-primary">Refresh token expiry</p>
                          <p className="mt-2 text-sm font-medium text-foreground">
                            {formatDate(cjCredentials?.refreshTokenExpiresAt ?? null)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl">Sourcing notes</CardTitle>
                      <CardDescription>
                        Keep operational notes for suppliers, packaging, backup warehouses, and launch prep.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-primary">Warehouse mode</p>
                          <p className="mt-2 text-sm font-medium text-foreground">{settings.warehouse}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Best practice is keeping a primary warehouse and one fallback option.
                          </p>
                        </div>
                        <div className="rounded-xl border border-border bg-background p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-primary">Supplier status</p>
                          <p className="mt-2 text-sm font-medium text-foreground">{settings.supplierName}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Save the supplier label you trust so later automation stays consistent.
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                          Operations notes
                        </label>
                        <Textarea
                          rows={10}
                          value={settings.notes}
                          onChange={(event) => updateText("notes", event.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-5">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Order queue</CardTitle>
                  <CardDescription>
                    A storefront-ready order dashboard you can later hook into real CJ fulfillment webhooks or APIs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Tracking</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.product}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={statusStyles[order.status] ?? "border-border bg-background text-foreground"}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>{order.tracking}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="operations" className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Automation settings</CardTitle>
                    <CardDescription>
                      These toggles give you a backend-backed shell for future CJ automation behavior.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      ["Auto import tracking", "autoImportTracking"],
                      ["Sync inventory from supplier", "autoSyncInventory"],
                      ["Low stock alerts", "lowStockAlerts"],
                      ["Auto confirm paid orders", "orderAutoConfirm"],
                    ].map(([label, field]) => (
                      <div
                        key={field}
                        className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground">
                            Storefront switch for your future CJ fulfillment workflow.
                          </p>
                        </div>
                        <Switch
                          checked={Boolean(settings[field as keyof AdminSettings])}
                          onCheckedChange={(checked) =>
                            updateToggle(field as keyof AdminSettings, checked)
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Fulfillment flow</CardTitle>
                    <CardDescription>
                      Suggested operating flow while HydraShield is sourcing through CJ dropshipping.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {[
                      {
                        icon: ClipboardList,
                        title: "Order received",
                        text: "Review storefront payment, fraud checks, and bundle logic before sending to CJ.",
                      },
                      {
                        icon: Boxes,
                        title: "Submit to supplier",
                        text: "Push the mapped CJ product and variant IDs once order details are validated.",
                      },
                      {
                        icon: PackageCheck,
                        title: "Tracking + delivery",
                        text: "Import tracking updates, notify the customer, and audit delivery timing weekly.",
                      },
                    ].map((step, index) => (
                      <div
                        key={step.title}
                        className="flex gap-4 rounded-2xl border border-border bg-background p-4"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full gradient-rose text-primary-foreground">
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-primary">Step {index + 1}</p>
                          <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">Connection tools</CardTitle>
                  <CardDescription>
                    Use these tools to verify that your saved CJ credentials are reachable and active.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="outline" onClick={handleRefreshConnection} disabled={connectionLoading}>
                    <RefreshCw className="h-4 w-4" />
                    Check CJ connection
                  </Button>
                  <Button variant="outline" onClick={handleExchangeToken} disabled={connectionLoading}>
                    <KeyRound className="h-4 w-4" />
                    Refresh access token
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
