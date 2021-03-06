import React, { useState } from 'react';
import { DOM } from '@/Graf/DOM';
import { ResolveExtension } from '@/GraphQL/Resolve';
import { TypeExtension, TypeSystemDefinition, TypeDefinitionDisplayMap } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
import { Menu, MenuScrollingArea, MenuSearch, MenuItem } from '@/Graf/Node/components';

interface ExtendNodeMenuProps {
  hideMenu: () => void;
}

export const ExtendNodeMenu: React.FC<ExtendNodeMenuProps> = ({ hideMenu }) => {
  const { tree, setTree, libraryTree } = useTreesState();
  const [menuSearchValue, setMenuSearchValue] = useState('');
  const allNodes = tree.nodes.concat(libraryTree.nodes);
  return (
    <Menu
      onMouseEnter={() => {
        DOM.scrollLock = true;
      }}
      onMouseLeave={() => {
        DOM.scrollLock = false;
      }}
      onScroll={(e) => e.stopPropagation()}
      hideMenu={hideMenu}
    >
      <MenuSearch value={menuSearchValue} onChange={setMenuSearchValue} onClear={() => setMenuSearchValue('')} />
      <MenuScrollingArea>
        {allNodes
          .filter(
            (a) =>
              ![
                TypeExtension.EnumTypeExtension,
                TypeExtension.InputObjectTypeExtension,
                TypeExtension.InterfaceTypeExtension,
                TypeExtension.ObjectTypeExtension,
                TypeExtension.ScalarTypeExtension,
                TypeExtension.UnionTypeExtension,
                TypeSystemDefinition.DirectiveDefinition,
              ].find((o) => a.data.type === o),
          )
          ?.sort((a, b) => (a.name > b.name ? 1 : -1))
          .filter((a) => a.name.toLowerCase().includes(menuSearchValue.toLowerCase()))
          .map((f) => (
            <MenuItem
              key={f.name}
              node={f}
              onClick={() => {
                tree.nodes.push({
                  data: {
                    type: ResolveExtension(f.data.type!),
                  },
                  description: undefined,
                  type: {
                    name: TypeDefinitionDisplayMap[ResolveExtension(f.data.type!)!],
                  },
                  name: f.name,
                  args: [],
                });
                hideMenu();
                DOM.scrollLock = false;
                setTree({ ...tree });
              }}
            />
          ))}
      </MenuScrollingArea>
    </Menu>
  );
};
