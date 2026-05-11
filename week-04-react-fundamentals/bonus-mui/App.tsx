// MUI starter — drop into a fresh Vite + React + TS app's src/App.tsx
// pnpm add @mui/material @emotion/react @emotion/styled @mui/icons-material

import { useMemo, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

type Todo = { id: string; text: string; done: boolean };

export default function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#635bff' }, // theme tokens — never hardcode in components
        },
      }),
    [mode],
  );

  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline applies MUI's normalize + body bg from theme */}
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MUI Todos
          </Typography>
          <IconButton color="inherit" onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            setTodos((t) => [...t, { id: crypto.randomUUID(), text, done: false }]);
            setText('');
          }}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              size="small"
              label="New todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Stack>
        </Box>

        <List>
          {todos.map((t) => (
            <ListItem
              key={t.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => setTodos((list) => list.filter((x) => x.id !== t.id))}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                checked={t.done}
                onChange={() =>
                  setTodos((list) => list.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
                }
              />
              <ListItemText
                primary={t.text}
                sx={{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? 0.5 : 1 }}
              />
            </ListItem>
          ))}
        </List>

        {todos.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
            No todos yet.
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}
