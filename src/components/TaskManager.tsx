import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Fab,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Training at the Gym", completed: true },
    { id: 2, name: "Play Paddle with friends", completed: false },
    { id: 3, name: "Burger BBQ with family", completed: false },
  ]);

  const [editTask, setEditTask] = useState<Task | null>(null);
  const [taskName, setTaskName] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleToggleCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setTaskName(task.name);
  };

  const openNewTaskDialog = () => {
    setEditTask(null);
    setTaskName("");
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editTask.id ? { ...task, name: taskName } : task
        )
      );
    } else {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: taskName, completed: false },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (editTask) {
      setTasks(tasks.filter((task) => task.id !== editTask.id));
      setDialogOpen(false);
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Stack direction="row" overflow="hidden">
        <Box
          sx={{
            width: "320px",
            backgroundColor: "#F3F3F3",
            borderRight: "10px #F3F3F3",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              backgroundColor: "#3556AB",
              padding: "20px",
              color: "white",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar src="public/image-avatar.svg" alt="John" />
              <Stack direction="column">
                <Typography fontSize={12} gutterBottom>
                  Hello, John
                </Typography>
                <Typography fontSize={16} color="grey" fontStyle="italic">
                  What are your plans <br /> for today?
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Go Pro Section */}
          <Paper
            sx={{
              backgroundColor: "#D4E157",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              marginBottom: "16px",
            }}
          >
            <img src="public/cup-avatar.svg" alt="John" />
            <Typography fontSize={14} color="#071D55">
              Go Pro Upgrade Now
            </Typography>
            <Typography
              fontSize={14}
              sx={{ bgcolor: "#071D55", color: "#D4E157", padding: 2 }}
            >
              $1
            </Typography>
          </Paper>

          {/* Task List */}
          <List sx={{ padding: 2 }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  border: "1px solid #DDD",
                  borderRadius: "8px",
                  marginBottom: "8px",
                  backgroundColor: "white",
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task.id)}
                    sx={{
                      color: task.completed ? "#4CAF50" : "#999",
                      "&.Mui-checked": {
                        color: "#4CAF50",
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.name}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: 14,
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#999" : "#000",
                    },
                  }}
                />
                <Button
                  onClick={() => handleEditTask(task)}
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
              </ListItem>
            ))}
          </List>

          {/* Add Task Button */}
          <Fab
            color="primary"
            onClick={openNewTaskDialog}
            sx={{
              position: "absolute",
              bottom: 20,
              left: 250,
              backgroundColor: "#123EB1",
            }}
          >
            <AddIcon />
          </Fab>
        </Box>

        {/* Add Task Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
        >
          <DialogTitle sx={{ backgroundColor: "#3B5998", color: "white" }}>
            Add Task
          </DialogTitle>
          <DialogContent>
            <Box my={2}>
              <Typography variant="body1">Task Name</Typography>
              <TextField
                fullWidth
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                sx={{ marginTop: "8px" }}
              />
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-between", padding: "16px" }}
          >
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ backgroundColor: "#3B5998", width: "100px" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Main Content - Placeholder for Edit Area */}
        <Box height="944px" width="635px">
          <Box
            sx={{
              backgroundColor: "#3556AB",
              padding: "20px",
              color: "white",
              width: "635px",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Edit Task
            </Typography>
          </Box>
          <Box mx={5} my={3}>
            <Stack direction="column">
              <Typography>Task Name</Typography>
              <TextField
                autoFocus
                margin="dense"
                value={taskName}
                fullWidth
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={3} my={40}>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="error"
                sx={{ width: "100px" }}
              >
                Delete
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  backgroundColor: "#3B5998",
                  width: "400px",
                }}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default TaskManager;
