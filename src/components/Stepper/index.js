import React from 'react';
import { makeStyles, Step, StepLabel, Stepper, withStyles } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import StepConnector from '@material-ui/core/StepConnector';

const StepperProgress = ({steps, actualStep}) => {

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
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
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
    <Stepper className={root.root} activeStep={actualStep} alternativeLabel connector={<QontoConnector />}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default StepperProgress;