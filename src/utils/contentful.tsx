import React from 'react'

import { mapValues } from 'lodash'
import { createClient } from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const createContentfulClient = () =>
  createClient({
    space: '3io89r4zv5gb',
    accessToken: 'vsp7sk6k8BIZqElpUm2agm3cN6a4H44OmRKGDSbCdX4',
    host: 'cdn.contentful.com',
  })

const parseContentfulItems = async (items: any[]) => {
  let itemsByType: { [key: string]: any } = {};

  items
    .forEach((item: any) => {
      const parsedItem: any = parseItem(item)
      const type = parsedItem.type + 's'

      itemsByType.hasOwnProperty(type) ?
        itemsByType[type].push(parsedItem)
        :
        itemsByType[type] = [parsedItem]
    })

  return itemsByType
}

const parseItem = (item: any) =>
({
  id: item.sys.id,
  type: item?.sys?.contentType?.sys?.id,
  ...mapValues(
    item.fields,
    field => Array.isArray(field) ?
      field.map(entry => parseField(entry))
      :
      parseField(field)
  )
})

const parseField = (field: any): string | any => {
  if (field?.sys?.id)
    return parseItem(field)

  switch (field?.nodeType || field?.sys?.type) {
    case 'document':
      return parseContentfulText(field)
    case 'Asset':
      return field?.fields?.file
    default:
      return field
  }
}

const parseContentfulText = (document: any) =>
  documentToReactComponents(document, {
    renderNode: {
      [BLOCKS.LIST_ITEM]: (node, children) =>
        <li className='ml-4'>
          {children}
        </li>,
    },
    renderText: text =>
      text
        .split('\n')
        .flatMap((text, i) =>
          [i > 0 && <br key={i} />, text]),
  })

const loadContentfulData = async () => {
  const client = createContentfulClient()

  return [
    await parseContentfulItems((await client.getEntries({ limit: 200, })).items),
    await parseContentfulItems((await client.getEntries({ limit: 200, locale: 'fr' })).items)
  ]
}

export {
  createContentfulClient,
  parseContentfulItems,
  loadContentfulData
}
