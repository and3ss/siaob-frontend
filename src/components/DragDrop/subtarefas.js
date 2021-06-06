import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getSubtarefaListStyle } from "./utils";

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, IconButton } from "@material-ui/core";

const DragDropSubtarefas = ({ subtarefas, tarefaNum }) => {
  return (
    <Droppable droppableId={`droppable${tarefaNum}`} type={`${tarefaNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getSubtarefaListStyle(snapshot.isDraggingOver)} >
          {subtarefas.map((subtarefa, index) => {
            return (
              <Draggable
                key={`${tarefaNum}${index}`}
                draggableId={`${tarefaNum}${index}`}
                index={index} >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )} >
                    <div className="dragdrop__tarefa-container">
                      <div className="dragdrop__tarefa-text">
                        <span {...provided.dragHandleProps}>
                          <DragIndicatorIcon  />
                        </span>
                        {subtarefa.nome}
                      </div>
                      <div className="dragdrop__tarefa-container">
                        <IconButton aria-label="edit" className="dragdrop__btns-actions">
                          <EditIcon color="secondary"/>
                        </IconButton>
                        <IconButton aria-label="delete" className="dragdrop__btns-actions">
                          <DeleteIcon color="error" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DragDropSubtarefas;
