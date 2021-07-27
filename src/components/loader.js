import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const DataLoader = () => (

    <Segment>
    <Dimmer active>
      <Loader size='medium'>Loading</Loader>
    </Dimmer>

    <Image src='../images/paragraph.jpg' />
    <Image src='../images/paragraph.jpg' />
    <Image src='../images/paragraph.jpg' />
  </Segment>

)

export default DataLoader
