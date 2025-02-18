import { Checkbox, Button, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Container from "@mui/material/Container";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Importar icons
// Importar material ui

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const style = {
  position: "absolute",
  top: "50%",
  left: "70%",
  transform: "translate(-10%, -130%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const names = [
  { name: "KPI de ventas" },
  { name: "KPI de Marketing" },
  { name: "dolor minus" },
  { name: "KPI atención cliente" },
  { name: "KPI financiero" },
  { name: "adipisicing elit" },
  { name: "KPI colombiano" },
  { name: "KPI Lorem" },
  { name: "KPI amet consectetur" },
];

export default function MultipleSelectChip2() {
  //Controles de modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);

  //Función que abra la modal y setea el KPI seleccionado
  const handleViewDetails = (kpi) => {
    setSelectedKPI(kpi);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={names}
        disableCloseOnSelect
        open={openAutocomplete}
        onOpen={() => setOpenAutocomplete(true)}
        onClose={() => {
          //Si la modal está abierta, evitamos que se cierre el autocomplete.
          if (openModal) return;
          setOpenAutocomplete(false);
        }}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          //Se extrae la key manualmente y el resto de props
          // eslint-disable-next-line react/prop-types
          const { key, ...restProps } = props;
          return (
            <li
              key={key}
              {...restProps}
              style={{
                // eslint-disable-next-line react/prop-types
                ...props.style,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Container>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />

                {/* Nombre del KPI */}
                {option.name}
              </Container>

              {/* Boton para ver detalles que abre la modal*/}
              <span
                onMouseDown={(e) => {
                  e.preventDefault(); //Evita que se dispare el comportamiento por defecto
                  e.stopPropagation(); //Evita que el evento se propague al Autocompletar
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  sx={{
                    marginLeft: "10px",
                    padding: "2px",
                    minWidth: "32px",
                    alignSelf: "end",
                  }}
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(option.name);
                  }}
                >
                  <RemoveRedEyeIcon />
                </Button>
              </span>
            </li>
          );
        }}
        style={{ width: 400 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selección de KPIs"
            placeholder="Selecciona los KPI"
          />
        )}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...style, width: 300, position: "relative" }}>
          <h2 id="modal-title">Text in a child modal</h2>
          <p id="modal-description">
            {selectedKPI ? `Detalles de: ${selectedKPI}` : "No hay detalles"}
          </p>
          <Fab
            color="error"
            size="medium"
            sx={{
              position: "absolute",
              top: "-30%",
              left: "100%",
              borderRadius: "50%",
            }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </Fab>
        </Box>
      </Modal>
    </div>
  );
}
