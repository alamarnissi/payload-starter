import type { FeatureProvider } from '@payloadcms/richtext-lexical'

import { $setBlocksType } from '@lexical/selection'
import { $findMatchingParent } from '@lexical/utils'
import {
  FormatSectionWithEntries,
  SlashMenuOption,
  getSelectedNode,
} from '@payloadcms/richtext-lexical'
import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical'

import { $createLabelNode, $isLabelNode, LabelNode } from './nodes/LabelNode'
import './index.scss'

import { LabelIcon } from './Icon'

export const LabelFeature = (): FeatureProvider => {
  return {
    feature: () => ({
      floatingSelectToolbar: {
        sections: [
          FormatSectionWithEntries([
            {
              ChildComponent: LabelIcon,
              isActive: ({ editor, selection }: {editor: any, selection: any}) => {
                if ($isRangeSelection(selection)) {
                  const selectedNode = getSelectedNode(selection as any) as any
                  const labelParent = $findMatchingParent(selectedNode, $isLabelNode)
                  return labelParent != null
                }
                return false
              },
              key: 'label',
              label: `Label`,
              onClick: ({ editor }) => {
                //setHeading(editor, headingSize)
                editor.update(() => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createLabelNode())
                  }
                })
              },
              order: 20,
            },
          ]),
        ],
      },
      nodes: [
        {
          node: LabelNode as any,
          type: LabelNode.getType(),
        },
      ],
      props: null,
      slashMenu: {
        options: [
          {
            options: [
              new SlashMenuOption(`Label`, {
                Icon: LabelIcon,
                keywords: ['label'],
                onSelect: () => {
                  const selection = $getSelection()
                  if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createLabelNode())
                  }
                },
              }),
            ],
            key: 'Basic',
            title: 'Basic',
          },
        ],
      },
    }),
    key: 'label',
  }
}
