const path = require("path");
const crypto = require("crypto");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

process.env.DATABASE_URL ||= "file:./dev.db";

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT || 3000);
const projectRoot = path.resolve(__dirname, "..");
const sessionCookieName = "pzg_session";
const sessionSecret = process.env.SESSION_SECRET || "puzhigu-local-session-secret";
const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf("=");
        if (index === -1) return [item, ""];
        return [item.slice(0, index), decodeURIComponent(item.slice(index + 1))];
      })
  );
}

function sign(value) {
  return crypto.createHmac("sha256", sessionSecret).update(value).digest("base64url");
}

function createSessionToken(user) {
  const payload = {
    userId: user.id,
    exp: Date.now() + sessionMaxAgeSeconds * 1000
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function readSessionToken(token) {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || signature !== sign(encoded)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!payload.userId || !payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function verifyPassword(password, passwordHash) {
  const [scheme, iterations, salt, hash] = String(passwordHash || "").split("$");
  if (scheme !== "pbkdf2" || !iterations || !salt || !hash) return false;

  const candidate = crypto
    .pbkdf2Sync(password, salt, Number(iterations), 64, "sha512")
    .toString("hex");
  if (candidate.length !== hash.length) return false;

  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash, "hex"));
}

function setSessionCookie(res, token) {
  res.cookie(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: sessionMaxAgeSeconds * 1000,
    path: "/"
  });
}

function clearSessionCookie(res) {
  res.clearCookie(sessionCookieName, {
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });
}

function publicUser(user) {
  return {
    id: user.id,
    account: user.account,
    displayName: user.displayName,
    role: user.role
  };
}

async function getSessionUser(req) {
  const cookies = parseCookies(req.headers.cookie);
  const session = readSessionToken(cookies[sessionCookieName]);
  if (!session) return null;

  return prisma.user.findFirst({
    where: {
      id: session.userId,
      isActive: true
    }
  });
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "puzhigu-ai-content-workbench",
    mode: process.env.NODE_ENV || "development"
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { account, password } = req.body || {};
  if (!account || !password) {
    return res.status(400).json({
      error: "missing_credentials",
      message: "Account and password are required"
    });
  }

  const user = await prisma.user.findUnique({ where: { account } });
  if (!user || !user.isActive || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({
      error: "invalid_credentials",
      message: "Invalid account or password"
    });
  }

  setSessionCookie(res, createSessionToken(user));
  return res.json({
    user: publicUser(user)
  });
});

app.get("/api/auth/me", async (req, res) => {
  const user = await getSessionUser(req);
  if (!user) {
    return res.json({
      authenticated: false,
      user: null
    });
  }

  return res.json({
    authenticated: true,
    user: publicUser(user)
  });
});

app.post("/api/auth/logout", (req, res) => {
  clearSessionCookie(res);
  res.json({
    ok: true
  });
});

app.use("/assets", express.static(path.join(projectRoot, "assets"), { fallthrough: false }));

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(projectRoot, "styles.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(projectRoot, "app.js"));
});

app.get(["/", "/index.html"], (req, res) => {
  res.sendFile(path.join(projectRoot, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    error: "not_found",
    message: "Route not found"
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Puzhigu AI content workbench is running at http://127.0.0.1:${port}`);
});
