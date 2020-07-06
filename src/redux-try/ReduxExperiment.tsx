import React from 'react';

export default function ReduxExperiment(props: any) {
  return <>{props.visible && <h2>Undo / Redo with Redux</h2>}</>;
}
