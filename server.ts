import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Request logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // Test route
  app.get("/api/test", (req, res) => {
    res.json({ message: "API is reachable" });
  });

  // Health check
  app.get("/api/health", (req, res) => {
    console.log("Health check requested");
    res.json({ status: "ok", message: "Server is running", env: !!process.env.RESEND_API_KEY });
  });

  // API Route for sending emails
  app.post("/api/quote", async (req, res) => {
    console.log("POST /api/quote reached!");
    const { name, email, company, buildingType, message } = req.body;

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      return res.json({ 
        success: true, 
        message: "Simulation: Daten empfangen (API Key fehlt).",
        data: req.body 
      });
    }

    const resend = new Resend(resendKey);

    try {
      const { data, error } = await resend.emails.send({
        // Mit onboarding@resend.dev funktioniert der Versand sofort an Ihre 
        // Registrierungs-E-Mail, ohne dass Sie Strato-Einstellungen ändern müssen.
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
        console.error("Resend API Error Details:", JSON.stringify(error, null, 2));
        // If it's a validation error about the 'to' address with onboarding@resend.dev
        if (error.name === 'validation_error' && error.message.includes('onboarding@resend.dev')) {
          return res.status(400).json({ 
            success: false, 
            error: "Im Testmodus (onboarding@resend.dev) können E-Mails nur an die im Resend-Konto hinterlegte Adresse gesendet werden. Bitte verifizieren Sie Ihre Domain send.mycleaningqueens.de bei Strato, um an info@mycleaningqueens.de zu senden." 
          });
        }
        return res.status(400).json({ success: false, error: error });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Server Exception:", err);
      res.status(500).json({ success: false, error: "Interner Serverfehler" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files from dist folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
