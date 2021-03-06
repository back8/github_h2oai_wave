import * as Fluent from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { CardMenu } from './card_menu'
import { Markdown } from './markdown'
import { Dict, S, B } from './qd'
import { border, getTheme, padding, palette, pc, displayMixin } from './theme'
import { Command } from './toolbar'

/** Create text content. */
export interface Text {
  /** The text content. */
  content: S
  /** The font size of the text content. */
  size?: 'xl' | 'l' | 'm' | 's' | 'xs'
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** Tooltip message. */
  tooltip?: S
  /** An identifying name for this component. */
  name?: S
}

/** Create extra-large sized text content. */
export interface TextXl {
  /** The text content. */
  content: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** Tooltip message. */
  tooltip?: S
  /** Contextual menu commands for this component. */
  commands?: Command[]
  /** An identifying name for this component. */
  name?: S
}

/** Create large sized text content. */
export interface TextL {
  /** The text content. */
  content: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** Tooltip message. */
  tooltip?: S
  /** Contextual menu commands for this component. */
  commands?: Command[]
  /** An identifying name for this component. */
  name?: S
}

/** Create medium sized text content. */
export interface TextM {
  /** The text content. */
  content: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** Tooltip message. */
  tooltip?: S
  /** An identifying name for this component. */
  name?: S
}

/** Create small sized text content. */
export interface TextS {
  /** The text content. */
  content: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** Tooltip message. */
  tooltip?: S
  /** An identifying name for this component. */
  name?: S
}

/** Create extra-small sized text content. */
export interface TextXs {
  /** The text content. */
  content: S
  /** True if the component should be visible. Defaults to true. */
  visible?: B
  /** Tooltip message. */
  tooltip?: S
  /** An identifying name for this component. */
  name?: S
}

const
  theme = getTheme(),
  css = stylesheet({
    text: {
      position: 'relative',
    },
    markdown: {
      $nest: {
        a: {
          color: palette.themePrimary,
          $nest: {
            '&:hover': {
              textDecoration: 'none',
            },
          },
        },
        table: {
          width: pc(100),
          borderCollapse: 'collapse',
        },
        tr: {
          borderBottom: border(1, theme.colors.text5),
        },
        th: {
          padding: padding(11, 6),
          textAlign: 'left',
        },
        td: {
          padding: padding(11, 6),
        }
      }
    },
  }),
  textVariants: Dict<keyof Fluent.IFontStyles> = {
    xl: 'xLarge',
    l: 'large',
    m: 'medium',
    s: 'small',
    xs: 'xSmall',
  },
  toTextVariant = (s: S) => textVariants[s] || 'mediumPlus'

export const
  XText = ({ content, name, size, commands, visibility = true }: { content: S, name?: S, size?: S, commands?: Command[], visibility?: B }) => {
    const menuName = name ? `${name}-menu` : name
    return (
      <div className={css.text} style={displayMixin(visibility)}>
        <Fluent.Text data-test={name} variant={toTextVariant(size || 'm')} block>
          <div className={css.markdown}><Markdown source={content} /></div>
        </Fluent.Text>
        {!!commands?.length && <CardMenu name={menuName} commands={commands} />}
      </div>
    )
  }