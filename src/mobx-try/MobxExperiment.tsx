import React from 'react';

export default function MobxExperiment(props: any) {
  return <>{props.visible && <h2>Undo / Redo with Mobx</h2>}</>;
}
