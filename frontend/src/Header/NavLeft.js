import React from "react";
import { Home, ContactMail, ListAlt, Info } from "@material-ui/icons";
import { CircleMenu, CircleMenuItem } from "react-circular-menu";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const NavLeft = () => {
	return (
		<div className='circular-nav-left'>
			<CircleMenu
				startAngle={-25}
				rotationAngle={180}
				itemSize={3}
				radius={5}
				menuToggleClassName='toggle-menu'
				rotationAngleInclusive={false}
			>
				<CircleMenuItem
					tooltip='Listing'
					className='menu-item'
					tooltipPlacement='right'
				>
					<Button>
						<Link exact to='/listing'>
							<ListAlt color='primary' fontSize='large' />
						</Link>
					</Button>
				</CircleMenuItem>
			</CircleMenu>
		</div>
	);
};

export default NavLeft;
