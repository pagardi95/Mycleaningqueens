import express from "express";
import { Resend } from "resend";
import path from "path";
import cors from "cors";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  // Detect production mode
  const isProd = process.env.NODE_ENV === "production";

  console.log(`[SERVER] Starting in ${isProd ? "PRODUCTION" : "DEVELOPMENT"} mode`);
  console.log(`[SERVER] Directory: ${process.cwd()}`);
  console.log(`[SERVER] NODE_ENV: ${process.env.NODE_ENV}`);

  app.use(cors());
  app.use(express.json());

  // Global Request Logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // --- API ROUTES FIRST ---
  
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: isProd ? "prod" : "dev", env: !!process.env.RESEND_API_KEY });
  });

  // API Route for sending emails (handles both with and without trailing slash)
  const handleQuote = async (req: express.Request, res: express.Response) => {
    console.log(`[API] Request received: ${req.method} ${req.url}`);
    const { name, email, company, buildingType, message } = req.body;
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.log("[API] No API Key found, simulating success.");
      return res.json({ success: true, message: "Simulation (No API Key)", data: req.body });
    }

    const resend = new Resend(resendKey);
    try {
      const { data, error } = await resend.emails.send({
        from: "mycleaningqueens <onboarding@resend.dev>", 
        to: ["info@mycleaningqueens.de"],
        subject: `Neue Anfrage von ${name}`,
        html: `
          <h3>Neue Reinigungsanfrage</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Firma:</strong> ${company || 'Keine Angabe'}</p>
          <p><strong>Typ:</strong> ${buildingType}</p>
          <p><strong>Nachricht:</strong> ${message || 'Keine'}</p>
        `,
      });

      if (error) {
        console.error("[API] Resend Error:", error);
        return res.status(400).json({ success: false, error });
      }
      res.json({ success: true, data });
    } catch (err) {
      console.error("[API] Exception:", err);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  };

  app.post("/api/quote", handleQuote);
  app.post("/api/quote/", handleQuote);
  
  // Test GET route to verify API is reachable
  app.get("/api/quote", (req, res) => {
    res.json({ message: "Use POST to send a quote request" });
  });

  // --- STATIC FILES & SPA FALLBACK ---

  if (isProd) {
    const distPath = path.resolve(process.cwd(), "dist");
    console.log(`[SERVER] Serving static files from: ${distPath}`);
    
    app.use(express.static(distPath));
    
    // SPA Fallback for production
    app.get("*", (req, res) => {
      if (req.url.startsWith("/api/")) return res.status(404).json({ error: "API not found" });
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("[SERVER] Initializing Vite middleware for development...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("[SERVER] Failed to start:", err);
  process.exit(1);
});
