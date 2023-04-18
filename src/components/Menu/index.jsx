import { Link } from 'react-router-dom';
const Menu = () => {
  return (
    <div id="menu">
      <Link to="/">去往homepage</Link>
      <Link to="/info">去往Info</Link>
      menu 组件
    </div>
  )
}

export default Menu;