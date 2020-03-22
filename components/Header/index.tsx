import React from 'react';
import styles from './styles.less';
const classNames = require('classnames');

interface HeaderProps {
	className?: string;
}

export default class Header extends React.Component<HeaderProps, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		console.log(styles.header);
		const headerClass = classNames(
			this.props.className,
			{
				header: true
			},
			styles.header
		);

		return <div className={headerClass}>Header</div>;
	}
}
