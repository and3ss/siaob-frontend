
import { useTheme } from '@material-ui/core/styles';

// a little function to help us with reordering the result
export const Reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const StyleTheme = () => {
  const theme = useTheme();
  return {
    primary: theme.palette.primary.main,
    lightPrimary: 'white',
    darkPrimary: theme.palette.primary.light,
    secondary: theme.palette.text.secondary,
    lightSecondary: theme.palette.secondary.light
  }
}

const grid = 3;
export const getItemStyle = (isDragging, draggableStyle) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: "left",

    // change background colour if dragging
    background: isDragging ? StyleTheme().darkPrimary : StyleTheme().lightPrimary,

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

export const getTarefaListStyle = isDraggingOver => ({
  background: isDraggingOver ? StyleTheme().darkPrimary : StyleTheme().primary,
  padding: '1rem',
});

export const getSubtarefaListStyle = isDraggingOver => ({
  background: isDraggingOver ? StyleTheme().darkPrimary : StyleTheme().primary,
  padding: '0.5rem',
});
