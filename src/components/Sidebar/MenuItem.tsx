import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface MenuItemProps {
  title: string;
  icon:
    | 'ni ni-tv-2 text-primary'
    | 'ni ni-shop text-primary'
    | 'ni ni-cart text-primary'
    | 'ni ni-settings-gear-65 text-primary'
    | 'ic-menu-overview'
    | 'ic-menu-transaction'
    | 'ic-menu-card'
    | 'ic-menu-logout'
    | 'ic-menu-messages'
    | 'ic-menu-reward'
    | 'ic-menu-setting';
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { title, icon, active, href = '/', onClick } = props;
  const classItem = cx({
    'nav-link': true,
    active,
  });

  return (
    <li className="nav-item" onClick={onClick}>
      {onClick ? (
        <a className={classItem}>
          <i className={icon}></i>
          <span className="nav-link-text">{title}</span>
        </a>
      ) : (
        <Link href={href} passHref>
          <a className={classItem}>
            <i className={icon}></i>
            <span className="nav-link-text">{title}</span>
          </a>
        </Link>
      )}
    </li>
  );
}
