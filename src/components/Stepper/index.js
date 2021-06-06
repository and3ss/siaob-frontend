import React from 'react';
import { makeStyles, Step, StepLabel, Stepper, withStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import StepConnector from '@material-ui/core/StepConnector';
import { useTheme } from '@material-ui/core/styles';

const StepperProgress = ({tarefas, tarefaAtual}) => {

  const theme = useTheme();

  const rootStyles = makeStyles({
    root: {
      marginTop: '1rem',
      marginBottom: '1rem',
    }
  });
  const root = rootStyles();

  const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: theme.palette.primary[500],
      },
    },
    completed: {
      '& $line': {
        borderColor: theme.palette.primary[500],
      },
    },
    line: {
      borderColor: theme.palette.primary[100],
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: theme.palette.primary[500],
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      zIndex: 1,
      fontSize: 18,
    },
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div  className={`${classes.root} ${classes.active}`}>
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
  }

  return (
    <Stepper className={root.root} activeStep={tarefaAtual-1} connector={<QontoConnector />}>
      {tarefas.map((tarefa) => (
        <Step key={tarefa.id}>
          <StepLabel StepIconComponent={QontoStepIcon}>{tarefa.nome}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default StepperProgress;