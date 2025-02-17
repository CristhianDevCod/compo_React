import { Checkbox, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Container from "@mui/material/Container";

// Importar icons
// Importar material ui

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const handleViewDetails = (name) => {
  alert(`Detalles de: ${name}`);
};

export default function MultipleSelectChip({ customComponent }) {
  return (
    <div>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={names}
        disableCloseOnSelect
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

              {/* Boton para ver detalles */}
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
                  e.stopPropagation(); // Evita seleccionar la opción
                  handleViewDetails(option.name);
                }}
              >
                <RemoveRedEyeIcon />
              </Button>
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
    </div>
  );
}
