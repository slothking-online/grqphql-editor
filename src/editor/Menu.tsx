import React from 'react';
import * as Icons from './icons';
import * as styles from './style/Menu';
import cx from 'classnames';
import { cypressGet, GraphQLEditorCypress } from '../cypress_constants';
export type ActivePane = 'code' | 'diagram' | 'code-diagram' | 'hierarchy';
export interface MenuProps {
  activePane: ActivePane;
  setActivePane: (pane: ActivePane) => void;
}

export const Menu = ({ setActivePane, activePane }: MenuProps) => {
  return (
    <div className={styles.HiderPanel}>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'diagram', 'name')}
        className={cx(styles.Hider, {
          active: activePane === 'diagram',
        })}
        onClick={() => setActivePane('diagram')}
        title="Diagram View"
      >
        <Icons.Eye size={18} />
      </div>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'codeDiagram', 'name')}
        className={cx(styles.Hider, {
          active: activePane === 'code-diagram',
        })}
        onClick={() => setActivePane('code-diagram')}
        title="Code and Diagram View"
      >
        <Icons.Code size={18} />
      </div>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'code', 'name')}
        className={cx(styles.Hider, {
          active: activePane === 'code',
        })}
        onClick={() => setActivePane('code')}
        title="Code View"
      >
        <Icons.FullScreen size={18} />
      </div>
      <div
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'menu', 'children', 'hierarchy')}
        className={cx(styles.Hider, {
          active: activePane === 'hierarchy',
        })}
        onClick={() => setActivePane('hierarchy')}
        title="Hierarchy View"
      >
        <Icons.Layers size={18} />
      </div>
    </div>
  );
};
