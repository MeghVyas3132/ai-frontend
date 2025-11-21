"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <SwaggerUI url="/openapi.json" docExpansion="none" defaultModelExpandDepth={1} />
    </div>
  );
}