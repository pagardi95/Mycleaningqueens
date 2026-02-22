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

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // API Route for sending emails
  app.post("/api/quote", async (req, res) => {
    console.log("Received quote request:", req.body);
    const { name, email, company, buildingType, message } = req.body;

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.warn("RESEND_API_KEY is missing. Email not sent, but logging data:");
      console.log(req.body);
      return res.json({ 
        success: true, 
        message: "Simulation: Daten empfangen (API Key fehlt für echten Versand).",
        data: req.body 
      });
    }

    const resend = new Resend(resendKey);

    try {
      const { data, error } = await resend.emails.send({
        from: "mycleaningqueens <info@send.mycleaningqueens.de>", 
        to: ["info@mycleaningqueens.de"],
        subject: `Neue Anfrage von ${name} (${company || 'Privat'})`,
        html: `
          <h1>Neue Reinigungsanfrage</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Firma:</strong> ${company || 'Keine Angabe'}</p>
          <p><strong>Objekttyp:</strong> ${buildingType}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message || 'Keine Nachricht hinterlassen.'}</p>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        // Ensure we send a useful error message
        return res.status(400).json({ 
          success: false, 
          error: error.message || error,
          details: error 
        });
      }

      res.json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ 
        success: false, 
        error: err instanceof Error ? err.message : "Interner Serverfehler" 
      });
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
    // Production static serving
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
