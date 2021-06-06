import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Reorder, getItemStyle, getTarefaListStyle } from "./utils";
import DragDropSubtarefas from "./subtarefas";

import { IconButton } from "@material-ui/core";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import AddIcon from '@material-ui/icons/Add';

import './styles.css';

const DragDropTarefas = ({tarefasData}) => {

  const [tarefas, setTarefas] = useState(tarefasData);

  useEffect(() => {
    setTarefas(tarefasData);
  }, [tarefasData]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "QUESTIONS") {
      // console.log(result);
      const orderedTarefas = Reorder(
        tarefas,
        result.source.index,
        result.destination.index
      );

      setTarefas(orderedTarefas);
    } else {
      const orderedSubtarefas = Reorder(
        tarefas[parseInt(result.type, 10)].subtarefas,
        result.source.index,
        result.destination.index
      );

      const newTarefas = JSON.parse(JSON.stringify(tarefas));

      newTarefas[result.type].subtarefas = orderedSubtarefas;

      setTarefas(newTarefas);
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="droppable" type="QUESTIONS">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getTarefaListStyle(snapshot.isDraggingOver)} >
            {tarefas.map((tarefa, index) => (

              <Draggable
                key={tarefa.id}
                draggableId={tarefa.id}
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
                        {tarefa.content}
                      </div>
                      <div className="dragdrop__tarefa-container">
                        <IconButton aria-label="edit" className="dragdrop__btns-actions">
                          <AddIcon className="dragdrop__btn-add"/>
                        </IconButton>
                      </div>
                    </div>
                    <DragDropSubtarefas tarefaNum={index} subtarefas={tarefa.subtarefas} />
                  </div>
                )}
              </Draggable>

            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropTarefas;
