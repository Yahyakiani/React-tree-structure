import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import emptyPara from'../images/paragraph.jpg';

const DataLoader = () => (

    <Segment>
    <Dimmer active>
      <Loader size='large'>Loading</Loader>
    </Dimmer>

    <Image src={emptyPara} />
  </Segment>

)

export default DataLoader
