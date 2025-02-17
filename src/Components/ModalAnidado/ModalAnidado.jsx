import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import MultipleSelectChip from "../SelectMult/MultipleSelectChip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 2,
  px: 4,
  pb: 3,
};

function ModalAnidado() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Estados para manejar los valores de los inputs
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    console.log("Datos del formulario:", { nombre, email, password });
    alert("Formulario enviado correctamente");
    // Aquí podrías enviar los datos a un servidor o API
  };

  return (
    <div>
      <Button onClick={handleOpen}>Abrir modal anidado</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Formulario de Registro
          </Typography>
          {/* Campo para el nombre */}
          <TextField
            margin="normal"
            fullWidth
            id="nombre"
            label="Nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          {/* Campo para el correo electrónico */}
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Selector multiple */}

          <MultipleSelectChip></MultipleSelectChip>

          {/* Campo para la contraseña */}
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Botón de envío */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalAnidado;
