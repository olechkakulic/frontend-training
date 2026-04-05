import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell, Group, Text } from "@mantine/core";
import { AdsListPage } from "./pages/AdsListPage";
import { AdEditPage } from "./pages/AdEditPage";
import { AdDetailsPage } from "./pages/AdDetailsPage";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <AppShell>
      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Navigate to="/ads" replace />} />
          <Route path="/ads" element={<AdsListPage />} />
          <Route path="/ads/:id" element={<AdDetailsPage />} />
          <Route path="/ads/:id/edit" element={<AdEditPage />} />
        </Routes>
      </AppShell.Main>
      <AppShell.Footer>
        <Group justify="space-between" align="center">
          <Text size="sm" c="dimmed">
            © 2025 AI Assistant
          </Text>
          <ThemeToggle  />
        </Group>
      </AppShell.Footer>
    </AppShell>

  );
}

export default App;
