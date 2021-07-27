import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

 const NavBar = () => {
  const [activeItem, setActiveItem] = useState('home')

  const handleItemClick = ({ name }) => setActiveItem({ activeItem: name })

  

    return (
      <Segment>
        <Menu secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }

  export default NavBar

