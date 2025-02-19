import { Checkbox, Button, Box, Fab, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid2";
import "@fontsource/roboto/300.css";
import Typography from "@mui/material/Typography";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const kpis = [
  {
    nombre: "tasa de retención de clientes",
    reporte: "reporte de eficiencia",
    tipo: "relativo",
    formula: "tasa de conversión de ventas",
    meta: "ganancia de 8%",
    responsable: "andres camilo",
    descripcion: "monitorear la tasa de conversión de ventas",
    periodicidad: "semanal",
    formato: "KPI cualitativo",
    tipoCalculo: "basados en metricas abs",
  },
  {
    nombre: "margen de beneficio neto",
    reporte: "reporte de eficiencia",
    tipo: "relativo",
    formula: "tasa de conversión de ventas",
    meta: "ganancia de 8%",
    responsable: "andres camilo",
    descripcion: "monitorear la tasa de conversión de ventas",
    periodicidad: "semanal",
    formato: "KPI cualitativo",
    tipoCalculo: "basados en metricas abs",
  },
  {
    nombre: "tiempo de ciclo de produccion",
    reporte: "reporte de eficiencia",
    tipo: "relativo",
    formula: "tasa de conversión de ventas",
    meta: "ganancia de 8%",
    responsable: "andres camilo",
    descripcion: "monitorear la tasa de conversión de ventas",
    periodicidad: "semanal",
    formato: "KPI cualitativo",
    tipoCalculo: "basados en metricas abs",
  },
  {
    nombre: "índice de satisfacción del cliente",
    reporte: "reporte de eficiencia",
    tipo: "relativo",
    formula: "tasa de conversión de ventas",
    meta: "ganancia de 8%",
    responsable: "andres camilo",
    descripcion: "monitorear la tasa de conversión de ventas",
    periodicidad: "semanal",
    formato: "KPI cualitativo",
    tipoCalculo: "basados en metricas abs",
  },
];

//Funcion para poner ayuscula al principio
function capitalizeFirstLetterInArrays(obj) {
  //Se recorre cada propiedad del objeto
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      //Verificar si el valor es un arreglo
      if (Array.isArray(value)) {
        //Recorre cada elemento del arreglo
        obj[key] = value.map((item) => {
          //verificar si el elemento es un string
          if (typeof item === "string" && item.length > 0) {
            //Capitalizar la primera letra
            return item.charAt(0).toUpperCase() + item.slice(1);
          }
          return item; //Devolver el elemento sin cambios si no es un string
        });
      }
      // Si el valor es un objeto, llamar recursivamnete a la funcion
      else if (typeof value === "object" && value !== null) {
        capitalizeFirstLetterInArrays(value);
      }
      //Si el valor es un string, capitalizar la primera letra
      else if (typeof value === "string" && value.length > 0) {
        obj[key] = value.charAt(0).toUpperCase() + value.slice(1);
      }
    }
  }
  return obj; //Devuelve un objeto modificado
}

export default function MultipleSelectChip() {
  //Controles de modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [openAutocomplete, setOpenAutocomplete] = useState(false);

  //Referencia para el autocomplete
  const autocompleteRef = useRef(null);

  //Función que abra la modal y setea el KPI seleccionado
  const handleViewDetails = (kpi) => {
    const nuevoKpi = capitalizeFirstLetterInArrays(kpi);
    console.log(nuevoKpi);
    setSelectedKPI(nuevoKpi);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //Controles para estilos--------------------
  // Detecta si la pantalla es pequeña (≤ 768px de ancho)
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const getAutocompleteProsition = () => {
    if (autocompleteRef.current) {
      //Se verifica que autocompleteRef.current no sea null
      const rect = autocompleteRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY, //posición debajo del autocomplete
        left: rect.left + window.scrollX, //Misma posición horizontal
      };
    }
    return { top: 0, left: 0 };
  };

  const { top, left } = getAutocompleteProsition();

  // Estilos base
  const baseStyle = {
    position: "absolute",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #929292",
    boxShadow: 24,
    borderRadius: 3,
    pt: 2,
    px: 4,
    pb: 3,
  };

  // Estilos condicionales
  const conditionalStyle = isSmallScreen
    ? {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }
    : {
        top: `${top}px`, //Posición debajo del autocomplete
        left: `${left + 420}px`, //420px a la derecha del autocomplete
        transform: "translate(2rem, -20rem)",
      };

  // Combina los estilos
  const style = { ...baseStyle, ...conditionalStyle };

  return (
    <div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={kpis}
        disableCloseOnSelect
        open={openAutocomplete}
        onOpen={() => setOpenAutocomplete(true)}
        onClose={() => {
          //Si la modal está abierta, evitamos que se cierre el autocomplete.
          if (openModal) return;
          setOpenAutocomplete(false);
        }}
        getOptionLabel={(option) => option.nombre}
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
                {option.nombre}
              </Container>

              {/* Boton para ver detalles que abre la modal*/}
              <span
                onMouseDown={(e) => {
                  e.preventDefault(); //Evita que se dispare el comportamiento por defecto
                  e.stopPropagation(); //Evita que el evento se propague al Autocompletar
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Tooltip title="Ver detalles" placement="right-start">
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
                      handleViewDetails(option);
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                </Tooltip>
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
        ref={autocompleteRef} //Se asigna la referencia
      />

      {/* Modal que se muestra con los detalles */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        slotProps={{
          backdrop: {
            style: { backgroundColor: "transparent" },
          },
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{ ...style, width: 400, position: "relative", padding: "20px" }}
        >
          <Typography
            variant="h5"
            align="center"
            marginBottom="20px"
            gutterBottom
          >
            {selectedKPI?.nombre || "No disponible"}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                id="nombre"
                label="Nombre"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.nombre || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="reporte"
                label="Reporte"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.reporte || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="tipo"
                label="Tipo"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.tipo || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="formula"
                label="Formula"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.formula || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="meta"
                label="Meta"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.meta || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="responsable"
                label="Responsable"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.responsable || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="descripcion"
                label="Descripcion"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.descripcion || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="periodicidad"
                label="Periodicidad"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.periodicidad || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="formato"
                label="Formato KPI"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.formato || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                id="tipoCalculo"
                label="Tipo de cálculo"
                // sx={{ userSelect: "none" }}
                defaultValue={selectedKPI?.tipoCalculo || "No disponile"}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
          </Grid>
          {/* Boton opcional para cerrar el modal */}
          <Fab
            color="error"
            size="medium"
            sx={{
              position: "absolute",
              top: "-10%",
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
